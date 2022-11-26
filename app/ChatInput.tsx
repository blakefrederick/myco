'use client'

import { FormEvent, useState, useRef, KeyboardEvent } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from 'typings'
import useSWR from 'swr'
import fetcher from 'utils/fetchMessages'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

function ChatInput() {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [keywordFetching, setKeywordFetching] = useState(false)
  const [twitterSuccess, setTwitterSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  console.log('session ChatInput ', session)

  // Optimistic fetch data pattern:
  // 1. Update immediately in the client, assuming the fetch request will succeed
  // 2. If the value returned from fetch matches our optimistic guess, then great
  // 3. Otherwise, rollback

  const handleChatKey = (e: KeyboardEvent<HTMLInputElement>) => {
    // After retrieving a tweet, only allow submit or delete
    if (twitterSuccess) {
      if (e.key === 'Backspace') {
        setInput('')
        setTwitterSuccess(false)
      } else if (e.key === 'Enter') {
        // be silent
      } else {
        e.preventDefault()
        // Jiggle the input field or something to indicate op not allowed
      }
    }
  }

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input || !session) return

    const messageToSend = input
    setInput(' ')

    // Type like to get your most recent like
    if (input === 'like') {
      setKeywordFetching(true)
      const likedTweet = await fetch('/api/twitter/like', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((e) => {
          console.error(e)
        })

      if (likedTweet) setTwitterSuccess(true)

      setKeywordFetching(false)
      setTimeout(function () {
        inputRef?.current?.focus()
      }, 300)
      if (likedTweet?._realData?.data[0]?.text) {
        setInput(likedTweet._realData.data[0].text)
      } else {
        setInput('')
      }
      return
    }

    // Type tweet to get your most recent tweet
    if (input === 'tweet') {
      setKeywordFetching(true)
      const userTweets = await fetch('/api/twitter/tweet', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .catch((e) => {
          console.error(e)
        })

      if (userTweets) setTwitterSuccess(true)

      setKeywordFetching(false)
      setTimeout(function () {
        inputRef?.current?.focus()
      }, 300)
      if (userTweets?._realData?.data[0]?.text) {
        setInput(userTweets._realData.data[0].text)
      } else {
        setInput('')
      }
      return
    }

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
      service:
        typeof session?.service === 'string'
          ? session?.service?.charAt(0)?.toUpperCase() +
            session?.service?.slice(1)
          : 'Anonymous',
    }

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json())

      return [data.message, ...messages!]
    }

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })

    setInput('')
    setTwitterSuccess(false)
  }
  if (typeof session?.service === 'string') {
    return (
      <form
        onSubmit={addMessage}
        className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t bg-white border-gray-100"
      >
        <input
          type="input"
          value={input}
          ref={inputRef}
          autoFocus
          disabled={!session || keywordFetching}
          placeholder="What's happening?"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleChatKey(e)}
          className={`what-is-happening flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 diabled:cursor-not-allowed ${
            twitterSuccess && 'twitter-success'
          }`}
        ></input>
        {keywordFetching && (
          <Image
            className="heart-beat"
            src="/images/heart-beat.gif"
            alt="loading"
            width="50"
            height="50"
          />
        )}
        <button
          type="submit"
          disabled={!input}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    )
  } else {
    return <div></div>
  }
}

export default ChatInput
