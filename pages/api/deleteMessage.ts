// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis'

type Data = {
  success: boolean
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ body: 'Method Not Allowed' })
    return
  }

  const { message } = req.body

  const delResult = await redis.hdel('messages', message.id)

  res.status(200).json({ success: Boolean(delResult) })
}
