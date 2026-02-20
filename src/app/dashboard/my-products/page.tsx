'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  location: string
  images: string
  available: boolean
  createdAt: string
}

export default function MyProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const response = await fetch('/api/products/my-products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products)
        } else if (response.status === 401) {
          router.push('/auth/login')
        } else {
          setError('Error cargando productos')
        }
      } catch (err) {
        console.error('Error:', err)
        setError('Error de conexión')
      } finally {
        setLoading(false)
      }
    }

    fetchMyProducts()
  }, [router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price)
  }

  const getImageUrl = (images: string) => {
    try {
      const imageArray = JSON.parse(images)
      return imageArray.length > 0 ? imageArray[0] : 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Sin+imagen'
    } catch {
      return 'https://via.placeholder.com/300x200/e2e8f0/64748b?text=Sin+imagen'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const toggleAvailability = async (productId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          available: !currentStatus
        }),
      })

      if (response.ok) {
        setProducts(prev => 
          prev.map(product => 
            product.id === productId 
              ? { ...product, available: !currentStatus }
              : product
          )
        )
      }
    } catch (err) {
      console.error('Error actualizando producto:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando tus productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🛍️ Tiendas Arman
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-primary-600 hover:text-primary-800"
              >
                Dashboard
              </Link>
              <Link
                href="/products/create"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Publicar Producto
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Productos</h1>
          <p className="mt-2 text-gray-600">
            Gestiona tus publicaciones y su estado
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8v2a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1h10a1 1 0 011 1z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              No tienes productos publicados
            </h3>
            <p className="mt-2 text-gray-500">
              Comienza creando tu primer producto para vender
            </p>
            <div className="mt-6">
              <Link
                href="/products/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Crear primer producto
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id}>
                  <div className="px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg object-cover"
                          src={getImageUrl(product.images)}
                          alt={product.title}
                        />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-medium text-gray-900 truncate">
                              {product.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {product.description.substring(0, 100)}...
                            </p>
                            <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                              <span>{formatPrice(product.price)}</span>
                              <span>•</span>
                              <span>{product.condition}</span>
                              <span>•</span>
                              <span>{formatDate(product.createdAt)}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.available
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {product.available ? 'Disponible' : 'No disponible'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-6 flex items-center space-x-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        Ver
                      </Link>
                      <button
                        onClick={() => toggleAvailability(product.id, product.available)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        {product.available ? 'Pausar' : 'Activar'}
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  )
}