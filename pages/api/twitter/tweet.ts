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

    const userTweets = await readOnlyClient.v2.userTimeline(user.data.id, {
      exclude: 'replies',
      max_results: 10,
      expansions: [
        'author_id',
        'referenced_tweets.id',
        'referenced_tweets.id.author_id',
        'entities.mentions.username',
        'attachments.poll_ids',
        'attachments.media_keys',
        'in_reply_to_user_id',
        'geo.place_id',
        'edit_history_tweet_ids',
      ],
      'media.fields': [
        'duration_ms',
        'height',
        'media_key',
        'preview_image_url',
        'type',
        'url',
        'width',
        'public_metrics',
        'non_public_metrics',
        'organic_metrics',
        'alt_text',
        'variants',
      ],
    })

    return res.status(200).json({
      ...userTweets,
    })
  } catch (error: unknown) {
    res.status(500).send({ error })
  }
}
