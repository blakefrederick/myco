'use client'

import React, { useEffect } from 'react'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import MessageComponent from './MessageComponent'
import { clientPusher } from '../pusher'

function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>('/api/getMessages', fetcher)

  useEffect(() => {
    // Notifications - super annoying mode
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        let notification: Notification
        let interval: NodeJS.Timeout
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'hidden') {
            const leaveDate = Date.now()
            interval = setInterval(() => {
              notification = new Notification(
                'Come back to your conversation!',
                {
                  // body: `All messages will disappear in ${
                  //   100 - Math.floor((Date.now() - leaveDate) / 1000)
                  // } seconds`,
                  body: `You've been gone for ${Math.floor(
                    (Date.now() - leaveDate) / 1000
                  )} seconds`,
                  icon: 'https://i.shgcdn.com/4a3ef1db-194d-4444-b1cf-ecc4e980a86c/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
                  tag: 'Come Back',
                }
              )
            }, 500)
          } else {
            if (interval) clearInterval(interval)
            if (notification) notification.close()
          }
        })
      } else {
        console.warn('Notifications permission denied')
      }
    })
  }, [])

  useEffect(() => {
    const channel = clientPusher.subscribe('messages')
    channel.bind('new-message', async (data: Message) => {
      // Self-message
      if (messages?.find((message) => message.id === data.id)) return
      // No messages
      if (!messages) {
        mutate(fetcher)
      } else {
        mutate(fetcher, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        })
      }
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages, mutate, clientPusher])

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {messages?.map((message) => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageList
