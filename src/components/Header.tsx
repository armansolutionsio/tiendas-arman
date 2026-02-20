'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name?: string
  email: string
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/')
      setMenuOpen(false)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-primary-100 shadow-lg">
      <div className="container-base">
        <div className="flex justify-between items-center py-4">
          {/* Logo y nombre */}
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="relative w-14 h-14 transition-smooth group-hover:scale-110">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full">
                <path d="M40 60C40 50 48 45 58 45H142C152 45 160 50 160 60V160C160 170 152 175 142 175H58C48 175 40 170 40 160V60Z" fill="#9333ea" opacity="0.9"/>
                <path d="M70 45C70 35 75 25 85 20C95 15 105 15 115 20C125 25 130 35 130 45" stroke="#e9d5ff" strokeWidth="8" strokeLinecap="round" fill="none"/>
                <g transform="translate(50, 70)">
                  <path d="M35 80L10 20" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M35 80L60 20" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="18" y1="50" x2="52" y2="50" stroke="#ffffff" strokeWidth="10" strokeLinecap="round"/>
                </g>
                <ellipse cx="100" cy="180" rx="45" ry="8" fill="#000000" opacity="0.15"/>
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">Tiendas Arman</h1>
              <p className="text-xs text-primary-600 font-semibold">Marketplace Seguro</p>
            </div>
          </Link>

          {/* Navegación central - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-primary-600 transition-smooth font-semibold relative group">
              Productos
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            {user && (
              <>
                <Link href="/products/create" className="text-gray-700 hover:text-primary-600 transition-smooth font-semibold relative group">
                  Vender
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-smooth font-semibold relative group">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
                </Link>
              </>
            )}
          </nav>

          {/* Autenticación */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-10 h-10 bg-gradient-to-r from-primary-200 to-primary-300 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user.name || user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-outline btn-small"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/login" className="btn-outline btn-small hidden sm:inline-block">
                  Iniciar Sesión
                </Link>
                <Link href="/auth/register" className="btn-primary btn-small">
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-primary-100 py-4 space-y-3">
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-smooth">
              Productos
            </Link>
            {user && (
              <>
                <Link href="/products/create" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-smooth">
                  Vender
                </Link>
                <Link href="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-smooth">
                  Dashboard
                </Link>
              </>
            )}
            {!user && (
              <Link href="/auth/login" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 rounded-lg transition-smooth">
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
