import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_APPID ?? '',
  key: process.env.PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: 'us3',
  useTLS: true,
})

export const clientPusher = new ClientPusher('e65d19eb1e9be5099030', {
  cluster: 'us3',
})

// Enable pusher logging - don't include this in production. Debug
ClientPusher.logToConsole = true
