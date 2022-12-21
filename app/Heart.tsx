import { useState } from 'react'
import styles from '/styles/Heart.module.css'

type Props = {
  owner: string
  liked: Boolean
}

export default function Heart({ owner, liked }: Props) {
  const [isFilled, setIsFilled] = useState(false)
  const toggleFill = () => {
    setIsFilled(!isFilled)
  }
  return (
    <div
      className={`${styles.heart} ${
        isFilled || (liked && styles.blast)
      } justify-end ${owner === 'mine' && 'ml-auto'} ${
        owner === 'mine' && styles.mine
      }`}
      onClick={toggleFill}
    ></div>
  )
}
