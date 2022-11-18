import Image from 'next/image'
import { getProviders } from 'next-auth/react'
import SignInComponent from './SignInComponent'

async function SignInPage() {
  const providers = await getProviders()
  return (
    <div className="grid justify-center">
      <div className="grid justify-center my-4">
        <Image
          className="rounded-full mx-2 object-cover"
          src="https://i.pinimg.com/736x/ff/7d/d0/ff7dd0faba84564e17c551d75949db45.jpg"
          height="100"
          width="100"
          alt="Sign In"
        />
      </div>
      {providers && <SignInComponent providers={providers} />}
    </div>
  )
}

export default SignInPage
