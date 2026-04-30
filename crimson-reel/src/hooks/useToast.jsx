// src/hooks/useToast.jsx
import { useState, useCallback } from 'react'
import Toast from '../components/Toast'

export function useToast() {
  const [toast, setToast] = useState(null)

  // showToast(message, type)
  // type: 'success' | 'error' | 'info'
  const showToast = useCallback((message, type = 'info') => {
    // Si ya hay un toast visible, lo remplazamos
    setToast(null)
    // Pequeño delay para que React vuelva a montar el componente
    // (reinicia la animación y el timer)
    setTimeout(() => setToast({ message, type }), 10)
  }, [])

  const hideToast = useCallback(() => setToast(null), [])

  // ToastComponent ya usa portal, solo inclúyelo UNA VEZ en el árbol
  // (en App.jsx es lo más limpio, pero también funciona en cada página)
  const ToastComponent = toast
    ? <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    : null

  return { showToast, ToastComponent }
}