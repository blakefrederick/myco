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

function DeleteButton({ session, message }: Props) {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  const isUser =
    session?.user?.image === message.profilePic || // This doesn't work with Spotify because it uses the exact same profile pic URL as Facebook
    session?.user?.email === message.email // absurd assumption here about cross-platform email synchronicity
  // Optimistic fetch data pattern:
  // 1. Update immediately in the client, assuming the fetch request will succeed
  // 2. If the value returned from fetch matches our optimistic guess, then great
  // 3. Otherwise, rollback

  const deleteMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) return

    const deleteMessageFromUpstash = async () => {
      const wasDeleted = await fetch('/api/deleteMessage', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
        }),
      }).then((res) => res.json())

      return wasDeleted
    }

    const deleteUpstashResult = await deleteMessageFromUpstash()
    console.log('deleteUpstashResult', deleteUpstashResult)

    await mutate(fetcher)
  }
  return (
    <>
      <form
        onSubmit={deleteMessage}
        className={`z-50 bg-white ${!isUser && 'w-full flex space-x-2'}`}
      >
        <button
          type="submit"
          className={`text-2xs italic text-gray-300 ${isUser && 'text-right'}`}
        >
          Delete
        </button>
      </form>
    </>
  )
}

export default DeleteButton
