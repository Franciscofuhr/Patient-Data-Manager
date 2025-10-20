import React, { createContext, useContext, useState } from "react"
import styles from "./ToastContext.module.css"
import Toast from "../../components/Toast/Toast"

type ToastType = "success" | "failure"

interface ToastItem {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastItem | null>(null)

  const showToast = (message: string, type: ToastType = "success") => {
    // Evita acumulación: reemplaza el toast actual
    const id = Date.now()
    setToast({ id, message, type })

    // Elimina el toast después del tiempo del componente Toast
    setTimeout(() => setToast(null), 3200)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toastContainer}>
        {toast && <Toast key={toast.id} message={toast.message} type={toast.type} />}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
