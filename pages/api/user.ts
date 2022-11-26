import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type UserData = {
  twitterHandle: string
  followersCount: string
  description: string
  location: string
}

type ErrorData = {
  error: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData | ErrorData | any>
) {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req })
  if (token) {
    // Signed in
    console.log('JSON Web Token', JSON.stringify(token, null, 2))
    return res.status(200).json({
      ...token,
    })
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
