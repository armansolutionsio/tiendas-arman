'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('¡Cuenta creada exitosamente! Redirigiendo...')
        setTimeout(() => {
          router.push('/auth/login')
        }, 2000)
      } else {
        setError(data.error || 'Error al crear la cuenta')
      }
    } catch (err) {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Lado izquierdo - Información */}
      <div className="gradient-primary text-white flex items-center justify-center p-8 hidden lg:flex">
        <div className="max-w-md space-y-8">
          <div>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-20 h-20 mb-6">
              <path d="M40 60C40 50 48 45 58 45H142C152 45 160 50 160 60V160C160 170 152 175 142 175H58C48 175 40 170 40 160V60Z" fill="#faf5ff" opacity="0.9"/>
              <path d="M70 45C70 35 75 25 85 20C95 15 105 15 115 20C125 25 130 35 130 45" stroke="#7e22ce" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <g transform="translate(50, 70)">
                <path d="M35 80L10 20" stroke="#7e22ce" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M35 80L60 20" stroke="#7e22ce" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="18" y1="50" x2="52" y2="50" stroke="#7e22ce" strokeWidth="10" strokeLinecap="round"/>
              </g>
            </svg>
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">Únete a la Comunidad</h1>
            <p className="text-primary-100 text-lg leading-relaxed">
              Crea tu cuenta en Tiendas Arman y comienza a comprar y vender de forma segura. Miles de usuarios confían en nosotros.
            </p>
          </div>
          <div className="space-y-4 pt-8">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">✨</span>
              <div>
                <h3 className="font-bold">Registro Rápido</h3>
                <p className="text-primary-100 text-sm">En menos de 2 minutos</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-3xl">🎁</span>
              <div>
                <h3 className="font-bold">Beneficios Exclusivos</h3>
                <p className="text-primary-100 text-sm">Acceso a ofertas especiales</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-3xl">🌟</span>
              <div>
                <h3 className="font-bold">Comunidad Verificada</h3>
                <p className="text-primary-100 text-sm">Usuarios autenticados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-10 h-10">
                <path d="M40 60C40 50 48 45 58 45H142C152 45 160 50 160 60V160C160 170 152 175 142 175H58C48 175 40 170 40 160V60Z" fill="#9333ea" opacity="0.9"/>
                <path d="M70 45C70 35 75 25 85 20C95 15 105 15 115 20C125 25 130 35 130 45" stroke="#e9d5ff" strokeWidth="8" strokeLinecap="round" fill="none"/>
                <g transform="translate(50, 70)">
                  <path d="M35 80L10 20" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M35 80L60 20" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="18" y1="50" x2="52" y2="50" stroke="#ffffff" strokeWidth="10" strokeLinecap="round"/>
                </g>
              </svg>
              <span className="font-bold text-xl text-primary-700">Tiendas Arman</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-heading-2 mb-2">Crear Cuenta</h2>
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link href="/auth/login" className="text-primary-600 font-bold hover:text-primary-700">
                Inicia sesión aquí
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input-field"
                placeholder="Juan Pérez"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input-field"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input-field"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-2">La contraseña debe tener al menos 6 caracteres</p>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="input-field"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-red-700 font-semibold">❌ {error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p className="text-green-700 font-semibold">✅ {success}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg"
            >
              {loading ? '⏳ Creando cuenta...' : '🚀 Crear Cuenta'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">O</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push('/')}
              className="btn-outline w-full py-3"
            >
              ← Volver al inicio
            </button>
          </form>

          <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-xs text-primary-800">
              Al registrarte aceptas nuestros{' '}
              <a href="#" className="font-bold hover:underline">
                Términos y Condiciones
              </a>
              {' '}y{' '}
              <a href="#" className="font-bold hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
