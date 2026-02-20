'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

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

interface ProductsResponse {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

const CATEGORIES = [
  'Electrónicos',
  'Ropa y Accesorios',
  'Hogar y Jardín',
  'Deportes',
  'Libros',
  'Vehículos',
  'Otros'
]

export default function ProductsPage() {
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [search, category])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (category) params.append('category', category)

      const response = await fetch(`/api/products?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Error cargando productos:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header - Mejorado */}
      <section className="gradient-primary text-white py-16">
        <div className="container-base">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
            <div>
              <h1 className="text-heading-1 text-white mb-3">🛍️ Explora Nuestros Productos</h1>
              <p className="text-primary-100 text-lg max-w-2xl">
                Descubre miles de artículos de vendedores verificados en toda Argentina. Compra con total seguridad.
              </p>
            </div>
            <Link href="/products/create" className="btn-primary text-lg font-bold bg-white text-primary-700 hover:bg-gray-100 whitespace-nowrap">
              📦 Publicar Producto
            </Link>
          </div>

          {/* Filtros Premium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-bold text-primary-100 mb-2">
                🔍 Buscar productos
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Electrónicos, ropa, autos..."
                  className="w-full px-6 py-3 rounded-xl border-2 border-white bg-white bg-opacity-95 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-smooth"
                />
                <span className="absolute right-4 top-3 text-xl">🔍</span>
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-primary-100 mb-2">
                📁 Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-6 py-3 rounded-xl border-2 border-white bg-white bg-opacity-95 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300 transition-smooth"
              >
                <option value="">📂 Todas las categorías</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <main className="container-base py-16">
        {loading ? (
          <div className="text-center py-32">
            <div className="mb-6 flex justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary-200 border-t-primary-600"></div>
            </div>
            <p className="text-gray-600 text-lg font-semibold">⏳ Cargando productos...</p>
            <p className="text-gray-500 text-sm mt-2">Por favor espera un momento</p>
          </div>
        ) : data?.products.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-6 animate-bounce">📦</div>
            <h3 className="text-heading-3 mb-4 text-gray-900">No se encontraron productos</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Intenta con otros términos de búsqueda o explora diferentes categorías
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/create" className="btn-primary text-lg">
                📤 Sé el primero en vender
              </Link>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('')
                }}
                className="btn-secondary text-lg"
              >
                🔄 Limpiar filtros
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-heading-2 text-gray-900 mb-2">
                  ✨ {data?.pagination.total} {data?.pagination.total === 1 ? 'producto' : 'productos'} encontrados
                </h2>
                <p className="text-gray-600">
                  Mostrando página {data?.pagination.page} de {data?.pagination.totalPages}
                </p>
              </div>
              <button
                onClick={() => {
                  setSearch('')
                  setCategory('')
                }}
                className="btn-outline text-sm whitespace-nowrap"
              >
                🔄 Limpiar filtros
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Info */}
            {data?.pagination.totalPages && data.pagination.totalPages > 1 && (
              <div className="mt-16 text-center">
                <div className="card inline-block p-6">
                  <p className="text-gray-600 font-semibold mb-4">
                    Página <span className="text-primary-600 font-bold">{data.pagination.page}</span> de <span className="text-primary-600 font-bold">{data.pagination.totalPages}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Mostrando {data.pagination.limit} productos de {data.pagination.total} totales
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* CTA Section */}
      {data?.products && data.products.length > 0 && (
        <section className="gradient-primary text-white py-20 mt-20">
          <div className="container-base text-center">
            <h2 className="text-heading-2 text-white mb-6">¿Quieres vender también?</h2>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
              Publica tus productos ahora y comienza a ganar dinero. Es rápido, fácil y seguro.
            </p>
            <Link href="/products/create" className="btn-primary text-lg font-bold bg-white text-primary-700 hover:bg-gray-100">
              🚀 Publicar Ahora
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}