import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Message } from 'typings'
import DeleteButton from './DeleteButton'
import Heart from './Heart'

type Props = {
  key: string
  message: Message
}

function MessageComponent({ message }: Props) {
  const { data: session } = useSession()
  const isUser =
    session?.user?.email === message.email &&
    session?.service?.charAt(0)?.toUpperCase() + session?.service?.slice(1) ===
      message.service
  const isGithub = message.service === 'Github'
  const isFacebook = message.service === 'Facebook'
  const isTwitter = message.service === 'Twitter'
  const isSpotify = message.service === 'Spotify'
  const isInstagram = message.service === 'Instagram'

  // console.log('session MessageComponent ', session)

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
            isFacebook && 'text-Facebook'
          } ${isGithub && 'text-GitHub'}
          ${isTwitter && 'text-Twitter'} ${isSpotify && 'text-Spotify'} ${
            isInstagram && 'text-Instagram'
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-2 rounded-lg w-fit text-white ${
              isUser && 'text-right order-2'
            } ${isFacebook && 'bg-Facebook'} ${isGithub && 'bg-GitHub'} ${
              isTwitter && 'bg-Twitter'
            } ${isSpotify && 'bg-Spotify'} ${isInstagram && 'bg-Instagram'}`}
          >
            <p>{message.message}</p>
            {message?.media && (
              <Image
                className={`rounded-sm py-2 ${isUser && 'ml-auto'}`}
                src={message?.media}
                alt="media"
                height="200"
                width="150"
              />
            )}
          </div>
          <div className={`${isUser ? 'ml-2' : 'mr-2'}`}>
            <Heart owner={isUser ? 'mine' : 'theirs'} />
          </div>
        </div>
        <p
          className={`text-2xs px-[1px] pb-[1px] ${isUser && 'text-right'} ${
            isFacebook && 'text-Facebook'
          } ${isGithub && 'text-GitHub'} ${isTwitter && 'text-Twitter'} ${
            isSpotify && 'text-Spotify'
          } ${isInstagram && 'text-Instagram'}`}
        >
          Message sent via {message.service}
        </p>
        <p
          className={`flex justify-end text-2xs italic text-gray-300 ${
            isUser && 'text-right'
          }`}
        >
          {new Date(message.created_at).toLocaleString()}
        </p>
        <p
          className={`text-2xs px-[1px] pb-[1px] ${isUser && 'text-right'} ${
            isFacebook && 'text-Facebook'
          } ${isGithub && 'text-GitHub'} ${isTwitter && 'text-Twitter'} ${
            isSpotify && 'text-Spotify'
          } ${isInstagram && 'text-Instagram'}`}
        >
          {isUser && <DeleteButton session={session} message={message} />}
        </p>
      </div>
    </div>
  )
}

export default MessageComponent
