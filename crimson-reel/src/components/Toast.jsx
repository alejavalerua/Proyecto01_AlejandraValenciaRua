import { useEffect } from 'react'

const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
}

const colors = {
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    info: 'var(--color-info)',
}

export default function Toast({ message, type = 'info', onClose }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div role="alert" aria-live="polite"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3
                    rounded-xl shadow-2xl text-sm font-medium animate-[slideIn_0.3s_ease]"
            style={{
                backgroundColor: 'var(--color-surface)', border: `1px solid ${colors[type]}`,
                color: 'var(--color-text)', maxWidth: '320px'
            }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                style={{ backgroundColor: colors[type] }} aria-hidden="true">
                {icons[type]}
            </span>
            <span>{message}</span>
            <button onClick={onClose} aria-label="Cerrar notificación"
                className="ml-auto text-[#9B7A82] hover:text-white transition-colors">
                ✕
            </button>
        </div>
    )
}