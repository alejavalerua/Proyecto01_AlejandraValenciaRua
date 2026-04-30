import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function SendModal({ isOpen, onConfirm, onCancel, userName = "" }) {
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

    const handleConfirmSend = () => {
        onConfirm()
        dialogRef.current?.close()
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            onCancel={onCancel}
            className="fixed inset-0 z-[100] bg-transparent border-none p-0 m-auto w-full max-w-md"
            style={{ background: 'transparent' }}
        >
            <div className="bg-[#1E1014] border border-[#3D1E27] rounded-3xl p-8 mx-4 shadow-2xl">

                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#C0395A]/20 flex items-center justify-center text-5xl">
                        ✉️
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center mb-3 text-white">
                    ¿Enviar mensaje?
                </h2>

                <div className="flex flex-col sm:flex-row gap-3">
                    
                    <button
                        onClick={handleConfirmSend}
                        className="flex-1 py-4 rounded-2xl text-sm font-semibold bg-[#C0395A] 
                       hover:bg-[#A12E4A] transition-all active:scale-95"
                    >
                        Sí, enviar mensaje
                    </button>

                    
                    <button
                        onClick={onCancel}
                        className="flex-1 py-4 rounded-2xl text-sm font-medium border border-[#3D1E27] 
                       hover:bg-[#2C1A1F] transition-all active:scale-95"
                        style={{ color: 'var(--color-muted)' }}
                    >
                        No, cancelar
                    </button>
                </div>
            </div>
        </dialog>,
        document.body
    )
}