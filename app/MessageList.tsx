'use client'

import React from 'react'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'

function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>('/api/getMessages', fetcher)

  return (
    <div className="p-5">
      {messages?.map((message) => (
        <div key={message.id}>
          <p className="m-3">{message.message}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageList
