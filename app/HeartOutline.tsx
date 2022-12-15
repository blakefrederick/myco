'use client'

import { useRouter } from 'next/navigation'

function HeartOutline() {
  const router = useRouter()

  return (
    <div
      className="text-center cursor-help"
      onClick={() => router.push('/about')}
    >
      &#9825;
    </div>
  )
}

export default HeartOutline
