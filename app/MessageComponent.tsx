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
  const isGithub = message.service === 'Github'
  const isFacebook = message.service === 'Facebook'
  const isTwitter = session?.user?.image?.includes('twimg')

  return (
    <div className={`flex w-fit ${isFacebook && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isFacebook && 'order-2'}`}>
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
            isFacebook && 'text-blue-400 text-right'
          } ${isGithub && 'text-gray-400'}`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isFacebook && 'bg-blue-400 ml-auto order-2'
            } ${isGithub && 'bg-gray-400'}`}
          >
            <p>{message.message}</p>
          </div>
        </div>
        <p
          className={`text-2xs italic text-gray-300 ${
            isFacebook && 'text-right'
          }`}
        >
          {new Date(message.created_at).toLocaleString()}
        </p>
        <p
          className={`text-2xs px-[1px] pb-[1px]  ${
            isFacebook && 'text-blue-300 text-right'
          } ${isGithub && 'text-gray-300'}`}
        >
          Message sent via {message.service}
        </p>
        <p
          className={`text-2xs px-[1px] pb-[1px]  ${
            isFacebook && 'text-blue-300 text-right'
          } ${isGithub && 'text-gray-300'}`}
        >
          {isUser && <DeleteButton session={session} message={message} />}
        </p>
      </div>
    </div>
  )
}

export default MessageComponent
