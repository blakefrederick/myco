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
  const [media, setMedia] = useState('')
  const [keywordFetching, setKeywordFetching] = useState(false)
  const [twitterSuccess, setTwitterSuccess] = useState(false)
  const [instagramSuccess, setInstagramSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)

  // console.log('session ChatInput ', session)

  // Optimistic fetch data pattern:
  // 1. Update immediately in the client, assuming the fetch request will succeed
  // 2. If the value returned from fetch matches our optimistic guess, then great
  // 3. Otherwise, rollback

  const handleChatKey = (e: KeyboardEvent<HTMLInputElement>) => {
    // After retrieving a tweet, only allow submit or delete
    if (twitterSuccess || instagramSuccess) {
      if (e.key === 'Backspace') {
        setInput('')
        setMedia('')
        setTwitterSuccess(false)
        setInstagramSuccess(false)
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
    setMedia('')

    // TODO move the following verbose section somewhere else and refactor!

    if (session?.service === 'twitter') {
      // Command "like X" gets your most recent tweet (includes retweets)
      const likeRegex = /^like\s*(\d)?$/
      const likeMatch = input.match(likeRegex)

      if (likeMatch) {
        // "like 3" corresponds to the 3rd most recent like, for example
        const num =
          Number(likeMatch[1]) >= 1 && Number(likeMatch[1]) <= 9
            ? Number(likeMatch[1]) - 1
            : 0
        setKeywordFetching(true)
        const likedTweets = await fetch('/api/twitter/like', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .catch((e) => {
            console.error(e)
          })

        if (likedTweets) setTwitterSuccess(true)

        setKeywordFetching(false)
        setTimeout(function () {
          inputRef?.current?.focus()
        }, 300)

        // Tweet text
        if (likedTweets?._realData?.data[num]?.text) {
          setInput(likedTweets._realData.data[num].text)
        } else {
          setInput('')
        }

        // Tweet media (just images atm)
        const mediaKey =
          likedTweets?._realData?.data[num]?.attachments?.media_keys[0] // todo get all keys not just the 0th
        likedTweets?._realData?.includes?.media?.forEach(
          (item: any, index: number) => {
            console.log(item.media_key)
            if (item.media_key === mediaKey) {
              setMedia(item.url)
            }
          }
        )

        return
      }

      // Command "tweet X" gets your most recent tweet (includes retweets)
      const tweetRegex = /^tweet\s*(\d)?$/

      const tweetMatch = input.match(tweetRegex)

      if (tweetMatch) {
        // "tweet 3" corresponds to the 3rd most recent tweet, for example
        const num =
          Number(tweetMatch[1]) >= 1 && Number(tweetMatch[1]) <= 9
            ? Number(tweetMatch[1]) - 1
            : 0
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
        // Tweet text
        if (userTweets?._realData?.data[num]?.text) {
          setInput(userTweets._realData.data[num].text)
        } else {
          setInput('')
        }
        // Tweet media (just images atm)
        const mediaKey =
          userTweets?._realData?.data[num]?.attachments?.media_keys[0] // todo get all keys not just the 0th
        userTweets?._realData?.includes?.media?.forEach(
          (item: any, index: number) => {
            console.log(item.media_key)
            if (item.media_key === mediaKey) {
              setMedia(item.url)
            }
          }
        )
        return
      }
    }

    // Type tweet to get your most recent tweet
    if (session?.service === 'instagram') {
      if (input === 'caption') {
        setKeywordFetching(true)
        const instagramProfile = await fetch('/api/instagram/caption', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .catch((e) => {
            console.error(e)
          })

        if (instagramProfile) setInstagramSuccess(true)

        setKeywordFetching(false)
        setTimeout(function () {
          inputRef?.current?.focus()
        }, 300)

        console.log(instagramProfile)
        // TODO this is just a caption. Use .id and some not yet existent endpoint to retrieve photo
        if (instagramProfile?.profileData?.data[0]?.caption) {
          console.log(
            'instagram caption',
            instagramProfile?.profileData?.data[0]?.caption
          )
          setInput(instagramProfile?.profileData?.data[0]?.caption)
        } else {
          setInput('')
        }
        return
      }
      if (input === 'photo') {
        setKeywordFetching(true)
        const instagramProfile = await fetch('/api/instagram/photo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .catch((e) => {
            console.error(e)
          })

        if (instagramProfile) setInstagramSuccess(true)

        setKeywordFetching(false)
        setTimeout(function () {
          inputRef?.current?.focus()
        }, 300)

        console.log(instagramProfile)
        // Gets latest IG photo
        if (instagramProfile?.profileData?.data[0]?.media_url) {
          console.log(
            'instagram media_url',
            instagramProfile?.profileData?.data[0]?.media_url
          )
          setMedia(instagramProfile?.profileData?.data[0]?.media_url)
          setInput('📷')
        } else {
          setInput('')
        }
        return
      }
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
      media: media,
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
    setMedia('')
    setTwitterSuccess(false)
    setInstagramSuccess(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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
          } ${instagramSuccess && 'instagram-success'}`}
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
