import { useState, useCallback } from 'react'
import Toast from '../components/Toast'

export function useToast() {
  const [toast, setToast] = useState(null)

    // type: 'success' | 'error' | 'info'
  const showToast = useCallback((message, type = 'info') => {
    setToast(null)
    setTimeout(() => setToast({ message, type }), 10)
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  const ToastComponent = toast
    ? <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    : null

  return { showToast, ToastComponent }
}