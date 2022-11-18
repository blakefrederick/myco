import { useState } from 'react'
import styles from '/styles/Heart.module.css'

type Props = {
  owner: string
}

export default function Heart({ owner }: Props) {
  const [isFilled, setIsFilled] = useState(false)
  const toggleFill = () => {
    setIsFilled(!isFilled)
  }
  return (
    <div
      className={`${styles.heart} ${isFilled ? styles.blast : ''} justify-end ${
        owner === 'mine' && 'ml-auto'
      }`}
      onClick={toggleFill}
    ></div>
  )
}
