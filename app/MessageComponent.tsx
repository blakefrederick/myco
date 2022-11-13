import Image from 'next/image'
import { Message } from '../typings'

type Props = {
  key: string
  message: Message
}

function MessageComponent({ message }: Props) {
  return (
    <div key={message.id}>
      <div>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p className="m-3">{message.username}</p>
        <div>
          <div>
            <p>{message.message}</p>
          </div>
          <p>{new Date(message.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}

export default MessageComponent
