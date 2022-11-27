import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
import SpotifyProvider from 'next-auth/providers/spotify'
import InstagramProvider from 'next-auth/providers/instagram'
// import { cloneDeep } from 'tailwindcss/lib/util/cloneDeep'
// import { setCookie } from 'cookies-next'

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user user:email user:follow',
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      // version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'user_profile,user_media',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // console.log('profile', profile)
      // console.log('token', token)
      // console.log('account', account)
      // console.log('user', user)

      if (profile || account) {
        token['userProfile'] = {
          service: account?.provider,
          followersCount: profile?.followers_count,
          twitterHandle: profile?.screen_name,
          followingCount: profile?.friends_count,
          userID: profile?.id || account?.user_id,
        }
      }
      if (account) {
        token['credentials'] = {
          authToken: account?.oauth_token,
          authSecret: account?.oauth_token_secret,
          accessToken: account?.access_token,
        }
      }
      return token
    },
    async session({ session, token, user }) {
      session.service = token?.userProfile?.service
      return Promise.resolve(session)
      // Send properties to the client, like an access_token from a provider.
      // let userData = cloneDeep(token.userProfile)
      // delete userData.userID
      // session.twitter = userData
      // return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/error', // Error code passed in query string as ?error=
  },
}

export default NextAuth(authOptions)
