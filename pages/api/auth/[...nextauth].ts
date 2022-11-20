import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
// import SpotifyProvider from 'next-auth/providers/spotify'
import { cloneDeep } from 'tailwindcss/lib/util/cloneDeep'

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email user:follow',
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      // version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    // SpotifyProvider({
    //   clientId: process.env.SPOTIFY_CLIENT_ID!,
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    // }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('profile', profile)
      if (profile) {
        token['userProfile'] = {
          followersCount: profile.followers_count,
          twitterHandle: profile.screen_name,
          followingCount: profile.friends_count,
          userID: profile.id,
        }
      }
      if (account) {
        token['credentials'] = {
          authToken: account.oauth_token,
          authSecret: account.oauth_token_secret,
        }
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      let userData = cloneDeep(token.userProfile)
      delete userData.userID
      session.twitter = userData
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
    error: '/error', // Error code passed in query string as ?error=
  },
}

export default NextAuth(authOptions)
