import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GitHubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'
// import SpotifyProvider from 'next-auth/providers/spotify'

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
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    // SpotifyProvider({
    //   clientId: process.env.SPOTIFY_CLIENT_ID!,
    //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/auth/signin',
  },
}

export default NextAuth(authOptions)
