import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const CONFIGS = {
  success: { bg: '#16a34a', icon: '✓', label: 'Éxito' },
  error:   { bg: '#C0395A', icon: '✕', label: 'Error' },
  info:    { bg: '#8B1A3A', icon: 'i', label: 'Info'  },
}

export default function Toast({ message, type = 'info', onClose }) {
  const config = CONFIGS[type] ?? CONFIGS.info

  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  const toast = (
    <>
      <style>{`
        @keyframes cr-slide-in {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .cr-toast {
          animation: cr-slide-in 0.25s ease forwards;
        }
      `}</style>

      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="cr-toast"
        style={{
          position:        'fixed',
          bottom:          '1.5rem',
          right:           '1.5rem',
          zIndex:          9999,
          display:         'flex',
          alignItems:      'center',
          gap:             '0.75rem',
          padding:         '0.75rem 1rem',
          borderRadius:    '0.875rem',
          boxShadow:       '0 8px 32px rgba(0,0,0,0.45)',
          backgroundColor: '#1E1014',
          border:          `1px solid ${config.bg}`,
          color:           '#F5E6EA',
          maxWidth:        '340px',
          width:           'max-content',
          fontFamily:      "'DM Sans', sans-serif",
          fontSize:        '0.875rem',
        }}
      >
        {/* Icono */}
        <span
          aria-hidden="true"
          style={{
            flexShrink:      0,
            width:           '24px',
            height:          '24px',
            borderRadius:    '50%',
            backgroundColor: config.bg,
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            color:           'white',
            fontSize:        '12px',
            fontWeight:      700,
          }}
        >
          {config.icon}
        </span>

        <span style={{ flex: 1 }}>{message}</span>

        <button
          onClick={onClose}
          aria-label="Cerrar notificación"
          style={{
            background:  'none',
            border:      'none',
            cursor:      'pointer',
            color:       '#9B7A82',
            fontSize:    '14px',
            padding:     '0 0 0 0.25rem',
            lineHeight:  1,
            transition:  'color 0.15s',
          }}
          onMouseEnter={e => e.target.style.color = '#F5E6EA'}
          onMouseLeave={e => e.target.style.color = '#9B7A82'}
        >
          ✕
        </button>
      </div>
    </>
  )

  return createPortal(toast, document.body)
}