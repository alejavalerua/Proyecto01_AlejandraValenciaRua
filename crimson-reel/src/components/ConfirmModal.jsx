import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function ConfirmModal({ isOpen, onConfirm, onCancel, showName = "esta serie" }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      dialog.showModal()
    } else {
      dialog.close()
    }
  }, [isOpen])

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onCancel()
    }
  }

  const handleConfirmDelete = () => {
    onConfirm()
    dialogRef.current?.close()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={onCancel}           // Soporta tecla ESC
      className="fixed inset-0 z-[100] bg-transparent border-none p-0 m-auto w-full max-w-md"
      style={{ 
        background: 'transparent',
      }}
    >
      <div className="bg-[#1E1014] border border-[#3D1E27] rounded-3xl p-8 mx-4 shadow-2xl">
        
        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-950/50 flex items-center justify-center text-4xl">
            🗑️
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2 text-white">
          ¿Eliminar de favoritos?
        </h2>
        
        <p className="text-center text-[#9B7A82] mb-8 leading-relaxed">
          ¿Estás segura de que deseas quitar <br />
          <strong className="text-white">"{showName}"</strong> <br />
          de tus favoritos?
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleConfirmDelete}
            className="flex-1 py-3.5 rounded-2xl text-sm font-medium border border-[#3D1E27] 
                       hover:bg-red-950/40 hover:border-red-900 transition-all active:scale-95"
            style={{ color: 'var(--color-muted)' }}
          >
            Sí, quitar
          </button>

          <button
            onClick={onCancel}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold bg-[#C0395A] 
                       hover:bg-[#A12E4A] transition-all active:scale-95"
          >
            No, conservar
          </button>
        </div>
      </div>
    </dialog>,
    document.body
  )
}