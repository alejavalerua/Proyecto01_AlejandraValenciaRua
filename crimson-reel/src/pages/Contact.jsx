import { useState } from 'react'
import { useToast } from '../hooks/useToast'

const initialState = { name: '', email: '', message: '' }

const validate = ({ name, email, message }) => {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresa un correo válido (ej. usuario@ejemplo.com).'
  if (message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
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
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      showToast('¡Mensaje enviado! Gracias por escribirnos.', 'success')
      setForm(initialState)
      setTouched({})
      setErrors({})
    }
  }

  const isValid = Object.keys(validate(form)).length === 0

  const fieldStyle = (name) => ({
    backgroundColor: 'var(--color-card)',
    border: `1px solid ${errors[name] && touched[name] ? 'var(--color-accent)' : 'var(--color-border)'}`,
    color: 'var(--color-text)',
    outline: 'none',
    width: '100%',
    borderRadius: '0.75rem',
    padding: '0.625rem 1rem',
    fontSize: '0.875rem',
  })

  return (
    <>
      <div className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Contacto</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-muted)' }}>
          ¿Tienes alguna sugerencia? Déjanos un mensaje.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Nombre */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1"
                   style={{ color: 'var(--color-text)' }}>Nombre</label>
            <input id="name" name="name" type="text" value={form.name}
                   onChange={handleChange} onBlur={handleBlur}
                   placeholder="Tu nombre" style={fieldStyle('name')}
                   aria-describedby={errors.name ? 'name-error' : undefined}
                   aria-invalid={!!(errors.name && touched.name)} />
            {errors.name && touched.name && (
              <p id="name-error" role="alert" className="text-xs mt-1"
                 style={{ color: 'var(--color-accent)' }}>{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1"
                   style={{ color: 'var(--color-text)' }}>Email</label>
            <input id="email" name="email" type="email" value={form.email}
                   onChange={handleChange} onBlur={handleBlur}
                   placeholder="correo@ejemplo.com" style={fieldStyle('email')}
                   aria-describedby={errors.email ? 'email-error' : undefined}
                   aria-invalid={!!(errors.email && touched.email)} />
            {errors.email && touched.email && (
              <p id="email-error" role="alert" className="text-xs mt-1"
                 style={{ color: 'var(--color-accent)' }}>{errors.email}</p>
            )}
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1"
                   style={{ color: 'var(--color-text)' }}>Mensaje</label>
            <textarea id="message" name="message" rows={5} value={form.message}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="Tu mensaje aquí..." style={fieldStyle('message')}
                      aria-describedby={errors.message ? 'msg-error' : undefined}
                      aria-invalid={!!(errors.message && touched.message)} />
            {errors.message && touched.message && (
              <p id="msg-error" role="alert" className="text-xs mt-1"
                 style={{ color: 'var(--color-accent)' }}>{errors.message}</p>
            )}
          </div>

          <button type="submit" disabled={!isValid}
                  className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity"
                  style={{
                    backgroundColor: isValid ? 'var(--color-accent)' : 'var(--color-border)',
                    color: 'white',
                    cursor: isValid ? 'pointer' : 'not-allowed',
                    opacity: isValid ? 1 : 0.5
                  }}>
            Enviar mensaje
          </button>
        </form>
      </div>
      {ToastComponent}
    </>
  )
}