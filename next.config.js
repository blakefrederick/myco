/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'yt3.ggpht.com',
      'i.pinimg.com',
      'i.shgcdn.com',
      'platform-lookaside.fbsbx.com',
      'avatars.githubusercontent.com',
      'pbs.twimg.com',
    ],
  },
}
