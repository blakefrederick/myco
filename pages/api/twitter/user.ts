import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import Twitter from 'twitter-lite'

type TwitterData = {
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
  res: NextApiResponse<TwitterData | ErrorData>
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('token', token)

  try {
    const twitterClient = new Twitter({
      consumer_key: process.env.TWITTER_CLIENT_ID!,
      consumer_secret: process.env.TWITTER_CLIENT_SECRET!,
      access_token_key: token!.credentials.authToken,
      access_token_secret: token!.credentials.authSecret,
    })
    //
    const userData = await twitterClient.get('users/show', {
      id: token!.userProfile.userID,
      screen_name: token!.userProfile.twitterHandle,
    })

    const data = {
      twitterHandle: userData.screen_name,
      followersCount: userData.followers_count,
      description: userData.description,
      location: userData.location,
    }

    return res.status(200).json({
      ...data,
    })
  } catch (error: unknown) {
    res.status(500).send({ error })
  }
}
