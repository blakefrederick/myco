// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { serverPusher } from 'lib/pusher'
import redis from 'lib/redis'
import { Message } from 'typings'

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method Not Allowed' })
    return
  }

  const { message } = req.body

  const newMessage = {
    ...message,
    // Use server time
    created_at: Date.now(),
  }

  // To redis key value store
  await redis.hset('messages', message.id, JSON.stringify(newMessage))
  // await redis.expire('messages', 100)
  serverPusher.trigger('messages', 'new-message', newMessage)

  res.status(200).json({ message: newMessage })
}
