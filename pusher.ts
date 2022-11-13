import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: 'blah',
  key: 'hhey',
  secret: 'no',
  cluster: 'nebula',
  useTLS: true,
})

export const clientPusher = new ClientPusher('469999999999999999', {
  cluster: '1p2',
})
