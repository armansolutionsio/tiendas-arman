'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'Error al iniciar sesión')
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
            <div className="relative w-20 h-20 mb-6 rounded-xl overflow-hidden bg-white">
              <Image
                src="/logo tiendas arman.jpeg"
                alt="Tiendas Arman Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-4">Bienvenido de Vuelta</h1>
            <p className="text-primary-100 text-lg leading-relaxed">
              Accede a tu cuenta para seguir comprando y vendiendo en la plataforma más segura de Argentina.
            </p>
          </div>
          <div className="space-y-4 pt-8">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">🔒</span>
              <div>
                <h3 className="font-bold">Seguridad Garantizada</h3>
                <p className="text-primary-100 text-sm">Tus datos están protegidos</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-3xl">⚡</span>
              <div>
                <h3 className="font-bold">Acceso Rápido</h3>
                <p className="text-primary-100 text-sm">En segundos estarás dentro</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-3xl">💜</span>
              <div>
                <h3 className="font-bold">Comunidad Confiable</h3>
                <p className="text-primary-100 text-sm">Miles de usuarios verificados</p>
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
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="/logo tiendas arman.jpeg"
                  alt="Tiendas Arman Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xl text-primary-700">Tiendas Arman</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-heading-2 mb-2">Inicia Sesión</h2>
            <p className="text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link href="/auth/register" className="text-primary-600 font-bold hover:text-primary-700">
                Regístrate aquí
              </Link>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-red-700 font-semibold">❌ {error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-lg"
            >
              {loading ? '⏳ Iniciando sesión...' : '🚀 Iniciar Sesión'}
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

          <p className="mt-8 text-center text-sm text-gray-600">
            Al iniciar sesión aceptas nuestros{' '}
            <a href="#" className="text-primary-600 hover:text-primary-700 font-bold">
              Términos y Condiciones
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
