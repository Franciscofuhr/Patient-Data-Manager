import React, { useEffect, useState } from "react"
import styles from "./Toast.module.css"

type ToastType = "success" | "failure"

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number // en ms
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", duration = 3000 }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  if (!visible) return null

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
    </div>
  )
}

export default Toast
