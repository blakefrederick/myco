'use client'

import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import { unstable_getServerSession } from 'next-auth'

type Props = {
  session: Awaited<ReturnType<typeof unstable_getServerSession>>
}

function DeleteButton({ session }: Props) {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  // Optimistic fetch data pattern:
  // 1. Update immediately in the client, assuming the fetch request will succeed
  // 2. If the value returned from fetch matches our optimistic guess, then great
  // 3. Otherwise, rollback

  console.log('session', session)

  const deleteMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input || !session) return

    const messageToSend = input
    setInput('')

    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic: session?.user?.image!,
      email: session?.user?.email!,
    }

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/deleteMessage', {
        method: 'DELETE',
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
  }
  return (
    <>
      <form
        onSubmit={deleteMessage}
        className="z-50 w-full flex space-x-2 justify-end border-t bg-white border-gray-100"
      >
        <button
          type="submit"
          className={`text-2xs italic px-2 text-gray-300 text-right`}
        >
          Delete
        </button>
      </form>
    </>
  )
}

export default DeleteButton
