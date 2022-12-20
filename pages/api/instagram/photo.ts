// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | ErrorData>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ body: 'Method Not Allowed' })
    return
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('token', token)

  const profileResponse = await fetch(
    `https://graph.instagram.com/me/media?fields=id,media_url&access_token=${token?.credentials?.accessToken}`
  )

  const profileData = await profileResponse.json()

  console.log('profileData', profileData)

  res.status(200).json({ profileData })
}
