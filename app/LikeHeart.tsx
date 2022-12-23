'use client'

import { FormEvent, useState } from 'react'
import { Message } from 'typings'
import useSWR from 'swr'
import fetcher from 'utils/fetchMessages'
import { unstable_getServerSession } from 'next-auth'

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
  message: Message
}

function LikeHeart({ session, message }: Props) {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  const isUser =
    session?.user?.image === message.profilePic || // This doesn't work with Spotify because it uses the exact same profile pic URL as Facebook
    session?.user?.email === message.email // absurd assumption here about cross-platform email synchronicity
  // Optimistic fetch data pattern:
  // 1. Update immediately in the client, assuming the fetch request will succeed
  // 2. If the value returned from fetch matches our optimistic guess, then great
  // 3. Otherwise, rollback

  const likeMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) return

    const likeMessageFromUpstash = async () => {
      const wasLiked = await fetch('/api/likeMessage', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...message,
        }),
      }).then((res) => res.json())

      return wasLiked
    }

    const patchUpstashResult = await likeMessageFromUpstash()
    console.log('patchUpstashResult', patchUpstashResult)

    await mutate(fetcher)
  }
  return (
    <>
      <form
        onSubmit={likeMessage}
        className={`z-50 bg-white ${!isUser && 'w-full flex space-x-2'}`}
      >
        <button
          type="submit"
          className={`text-2xs italic text-gray-300 ${isUser && 'text-right'}`}
        >
          Like
        </button>
      </form>
    </>
  )
}

export default LikeHeart
