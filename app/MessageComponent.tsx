import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Message } from 'typings'
import DeleteButton from './DeleteButton'

type Props = {
  key: string
  message: Message
}

function MessageComponent({ message }: Props) {
  const { data: session } = useSession()
  const isUser = session?.user?.image === message.profilePic
  const isGithub = message.service === 'Github'
  const isFacebook = message.service === 'Facebook'
  const isTwitter = message.service === 'Twitter'

  console.log(session)
  console.log(message)

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
          className={`text-2xs px-[2px] pb-[2px] ${isUser && 'text-right'} ${
            isFacebook && 'text-blue-400'
          } ${isGithub && 'text-gray-400'}
          ${isTwitter && 'text-sky-400'}`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser && 'text-right ml-auto order-2'
            } ${isFacebook && 'bg-blue-400'} ${isGithub && 'bg-gray-400'} ${
              isTwitter && 'bg-sky-400'
            }`}
          >
            <p>{message.message}</p>
          </div>
        </div>
        <p
          className={`text-2xs italic text-gray-300 ${isUser && 'text-right'}`}
        >
          {new Date(message.created_at).toLocaleString()}
        </p>
        <p
          className={`text-2xs px-[1px] pb-[1px] ${isUser && 'text-right'} ${
            isFacebook && 'text-blue-300'
          } ${isGithub && 'text-gray-300'} ${isTwitter && 'text-sky-400'}`}
        >
          Message sent via {message.service}
        </p>
        <p
          className={`text-2xs px-[1px] pb-[1px] ${isUser && 'text-right'} ${
            isFacebook && 'text-blue-300'
          } ${isGithub && 'text-gray-300'} ${isTwitter && 'text-sky-400'}`}
        >
          {isUser && <DeleteButton session={session} message={message} />}
        </p>
      </div>
    </div>
  )
}

export default MessageComponent
