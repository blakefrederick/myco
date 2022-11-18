import { useState } from 'react'
import styles from '/styles/Heart.module.css'

export default function Heart({ owner }) {
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
