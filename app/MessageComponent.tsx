import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Message } from '../typings'
import DeleteButton from './DeleteButton'

type Props = {
  key: string
  message: Message
}

function MessageComponent({ message }: Props) {
  const { data: session } = useSession()
  const isUser = session?.user?.email === message.email

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={message.profilePic}
          alt="Profile Picture"
        />
      </div>
      <div>
        <p
          className={`text-2xs px-[2px] pb-[2px] ${
            isUser ? 'text-blue-400 text-right' : 'text-green-400 text-left'
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-green-400'
            }`}
          >
            <p>{message.message}</p>
          </div>
        </div>
        <p
          className={`text-2xs italic px-2 text-gray-300 ${
            isUser && 'text-right'
          }`}
        >
          {new Date(message.created_at).toLocaleString()}
        </p>
        {isUser && <DeleteButton session={session} />}
      </div>
    </div>
  )
}

export default MessageComponent
