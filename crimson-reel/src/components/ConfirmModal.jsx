import { useRef, useEffect } from 'react'

/*
 * ⚠️ DARK PATTERN INTENCIONAL — "Confirmshaming"
*/

export default function ConfirmModal({ isOpen, onConfirm, onCancel, showName }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [isOpen])

  return (
    <dialog ref={dialogRef}
            className="rounded-2xl p-6 max-w-sm w-full backdrop:bg-black/70"
            style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)',
                     color: 'var(--color-text)' }}
            onCancel={onCancel}>
      <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display' }}>
        ¿Quitar de favoritos?
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>
        Estás a punto de quitar <strong style={{ color: 'var(--color-text)' }}>{showName}</strong> de tus favoritos.
      </p>

      <div className="flex gap-3 justify-end">
        {/* DARK PATTERN: botón destructivo con estilo apagado → parece "seguro" */}
        <button onClick={onConfirm}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity hover:opacity-70"
                style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-muted)',
                         border: '1px solid var(--color-border)' }}>
          Quitar
        </button>

        {/* DARK PATTERN: cancelar con color primario → parece la acción "recomendada" */}
        <button onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
          Conservar
        </button>
      </div>
    </dialog>
  )
}