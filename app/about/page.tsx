'use client'

import { Providers } from '../providers'
import { littleBang } from './hyphae.js'
import { useEffect, useRef } from 'react'
import styles from '/styles/Hyphae.module.css'

function AboutPage() {
  const substratum = useRef(null)

  useEffect(() => {
    littleBang(substratum.current)
  })
  return (
    <Providers session={''}>
      <main>
        <canvas
          className={`${styles.substratum}`}
          id="substratum"
          ref={substratum}
        ></canvas>
        <div className={`${styles.status}`} id="legend"></div>
      </main>
    </Providers>
  )
}

export default AboutPage
