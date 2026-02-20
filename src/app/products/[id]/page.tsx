'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description: string
  price: number
  condition: string
  category: string
  location: string
  images: string
  createdAt: string
  user: {
    id: string
    name?: string
    email: string
  }
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data = await response.json()
          setProduct(data.product)
        } else {
          setError('Producto no encontrado')
        }
      } catch (err) {
        console.error('Error cargando producto:', err)
        setError('Error cargando producto')
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price)
  }

  const getImages = (images: string) => {
    try {
      const imageArray = JSON.parse(images)
      return imageArray.length > 0 ? imageArray : ['https://via.placeholder.com/400x300/e2e8f0/64748b?text=Sin+imagen']
    } catch {
      return ['https://via.placeholder.com/400x300/e2e8f0/64748b?text=Sin+imagen']
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Producto no encontrado'}
          </h2>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-800"
          >
            ← Volver a productos
          </Link>
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
                href="/products"
                className="text-primary-600 hover:text-primary-800"
              >
                Todos los productos
              </Link>
              <Link
                href="/dashboard"
                className="text-primary-600 hover:text-primary-800"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Galería de imágenes */}
          <div className="mb-8 lg:mb-0">
            {(() => {
              const images = getImages(product.images)
              return (
                <div>
                  {/* Imagen principal */}
                  <div className="aspect-w-1 aspect-h-1 w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${product.title} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navegación de imágenes */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? images.length - 1 : prev - 1
                          )}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === images.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                        >
                          →
                        </button>
                        
                        {/* Indicador de imagen actual */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnails */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`aspect-w-1 aspect-h-1 h-20 rounded-lg overflow-hidden border-2 ${
                            index === currentImageIndex 
                              ? 'border-primary-500' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.title} - ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })()}
          </div>

          {/* Información del producto */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="text-4xl font-bold text-primary-600 mb-6">
              {formatPrice(product.price)}
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-sm font-medium text-gray-500">Estado:</span>
                <span className="ml-2 text-sm text-gray-900">{product.condition}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Ubicación:</span>
                <span className="ml-2 text-sm text-gray-900">{product.location}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Publicado:</span>
                <span className="ml-2 text-sm text-gray-900">{formatDate(product.createdAt)}</span>
              </div>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Descripción
              </h3>
              <p className="text-gray-700 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Vendedor
              </h3>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                  {(product.user.name || product.user.email).charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {product.user.name || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Miembro desde {formatDate(product.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium">
                Contactar vendedor
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                ♡ Favorito
              </button>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            ← Volver a todos los productos
          </Link>
        </div>
      </main>
    </div>
  )
}