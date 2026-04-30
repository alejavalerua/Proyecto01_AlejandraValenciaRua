import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'

function StaticTV() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const draw = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        const val = Math.random() > 0.5 ? 255 : 0
        const tint = Math.random() > 0.95 ? 192 : 0
        imageData.data[i]     = val > 0 ? tint : 0
        imageData.data[i + 1] = 0                 
        imageData.data[i + 2] = val > 0 ? 0 : 0      
        imageData.data[i + 3] = Math.random() * 80   
      }
      ctx.putImageData(imageData, 0, 0)
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas ref={canvasRef} width={300} height={200}
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            aria-hidden="true" />
  )
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">

      <div className="relative w-64 h-44 rounded-2xl mb-8 overflow-hidden flex items-center justify-center"
           style={{ backgroundColor: '#0A0608', border: '3px solid var(--color-border)',
                    boxShadow: '0 0 40px rgba(192,57,90,0.2)' }}>
        <StaticTV />
        <div className="relative z-10 text-center">
          <p className="text-6xl font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
            404
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--color-muted)' }}>
            SEÑAL PERDIDA
          </p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--color-muted)' }}>
        La serie que buscas no existe en esta aplicación.
        <br/>
        Parece que el canal fue cancelado.
      </p>

      <Link to="/"
            className="px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
        Volver al inicio
      </Link>
    </div>
  )
}