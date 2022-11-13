import Image from 'next/image'
import { Message } from '../typings'

type Props = {
  key: string
  message: Message
}

function MessageComponent({ message }: Props) {
  return (
    <div className="flex w-fit m-2">
      <div className="flex-shrink-0">
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p className="text-2xs px-[2px] pb-[2px] text-gray-400">
          {message.username}
        </p>
        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-fit text-white bg-red-400">
            <p>{message.message}</p>
          </div>
        </div>
        <p className="text-2xs italic px-2 text-gray-300">
          {new Date(message.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default MessageComponent
