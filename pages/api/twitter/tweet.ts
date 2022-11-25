import { TwitterApi } from 'twitter-api-v2'

import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type ErrorData = {
  error: unknown
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown | ErrorData>
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  console.log('token', token)

  try {
    // Instantiate with desired auth type (here's Bearer v2 auth)
    const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!)

    // Tell Typescript it's a readonly app
    const readOnlyClient = twitterClient.readOnly

    const user = await readOnlyClient.v2.userByUsername(
      token?.userProfile?.twitterHandle!
    )

    const likedTweets = await readOnlyClient.v2.userLikedTweets(user.data.id)

    return res.status(200).json({
      ...likedTweets,
    })
  } catch (error: unknown) {
    res.status(500).send({ error })
  }
}
