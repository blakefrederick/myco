// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    if (req.method !== 'POST') {
        res.status(405).json({ name: 'Method Not Allowed' })
        return
    }

    const { message } = req.body

    const newMessage = {
        ...message,
        // Use server time 
        created_at: Date.now()
    }

    // To redis key value store
    await redis.hset('messages', message.id, JSON.stringify(newMessage))

  res.status(200).json({ name: 'Hey!' })
}
