'use client'

import { getProviders, signIn } from 'next-auth/react'
import { isIOS } from 'react-device-detect'

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>
}

function SignInComponent({ providers }: Props) {
  return (
    <div className="justify-center">
      {isIOS ? (
        <>
          <p className="mx-auto">Regrettably, sign in doesn't work on iOS. </p>
          <p className="mx-auto">The developer is still figuring things out.</p>
        </>
      ) : (
        Object.values(providers!).map((provider) => (
          <div key={provider.name} className={`flex flex-col items-center`}>
            <button
              className={`${provider.name === 'Facebook' && 'bg-Facebook'} ${
                provider.name === 'GitHub' && 'bg-GitHub'
              }
          ${
            (provider.name === 'Twitter' ||
              provider.name === 'Twitter (Legacy)') &&
            'bg-Twitter'
          }  text-white font-bold my-4 py-2 px-4 rounded`}
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl:
                    process.env.VERCEL_URL || 'http://localhost:3000',
                })
              }
            >
              Sign in with{' '}
              {provider.name === 'Twitter (Legacy)' ? 'Twitter' : provider.name}
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default SignInComponent
