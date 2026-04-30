import { useState } from 'react'
import SendModal from '../components/SendModal'
import { useToast } from '../hooks/useToast'

const initialState = { name: '', email: '', message: '' }

const validate = ({ name, email, message }) => {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresa un correo válido.'
  if (message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { showToast, ToastComponent } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      setErrors(validate({ ...form, [name]: value }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(validate(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const allTouched = { name: true, email: true, message: true }
    setTouched(allTouched)
    
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setShowConfirmModal(true)   // ← Mostrar modal de confirmación
    }
  }

  const handleConfirmSend = () => {
    setShowConfirmModal(false)
    setIsSubmitting(true)

    setTimeout(() => {
      showToast('¡Mensaje enviado correctamente! Gracias por contactarnos.', 'success')
      setForm(initialState)
      setTouched({})
      setErrors({})
      setIsSubmitting(false)
    }, 800)
  }

  const isValid = Object.keys(validate(form)).length === 0 && 
                  form.name.trim() !== '' && 
                  form.email.trim() !== '' && 
                  form.message.trim() !== ''

  return (
    <>
      <div className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Contacto</h1>
        <p className="text-sm mb-10" style={{ color: 'var(--color-muted)' }}>
          ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu nombre"
              className="w-full px-5 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid ${errors.name && touched.name ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: 'var(--color-text)'
              }}
              aria-invalid={!!(errors.name && touched.name)}
            />
            {errors.name && touched.name && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="correo@ejemplo.com"
              className="w-full px-5 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid ${errors.email && touched.email ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: 'var(--color-text)'
              }}
              aria-invalid={!!(errors.email && touched.email)}
            />
            {errors.email && touched.email && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>{errors.email}</p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full px-5 py-3 rounded-xl text-sm resize-y min-h-[140px]"
              style={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid ${errors.message && touched.message ? 'var(--color-accent)' : 'var(--color-border)'}`,
                color: 'var(--color-text)'
              }}
              aria-invalid={!!(errors.message && touched.message)}
            />
            {errors.message && touched.message && (
              <p className="text-xs mt-1" style={{ color: 'var(--color-accent)' }}>{errors.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={!isValid || isSubmitting}
            className="w-full py-4 rounded-2xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isValid ? 'var(--color-accent)' : 'var(--color-border)',
              color: 'white'
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>

      {/* Modal de Confirmación para Enviar Mensaje */}
      <SendModal
        isOpen={showConfirmModal}
        userName={form.name}
        onConfirm={handleConfirmSend}
        onCancel={() => setShowConfirmModal(false)}
      />

      {ToastComponent}
    </>
  )
}