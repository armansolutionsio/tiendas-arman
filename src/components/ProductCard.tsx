import Image from 'next/image'
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

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price)
  }

  const getImageUrl = (images: string) => {
    try {
      const imageArray = JSON.parse(images)
      return imageArray.length > 0 ? imageArray[0] : '/placeholder.png'
    } catch {
      return '/placeholder.png'
    }
  }

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'nuevo':
        return 'badge-success'
      case 'muy bueno':
        return 'badge'
      case 'bueno':
        return 'badge-warning'
      case 'regular':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'badge'
    }
  }

  const getConditionEmoji = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'nuevo':
        return '✨'
      case 'muy bueno':
        return '👌'
      case 'bueno':
        return '👍'
      case 'regular':
        return '🆗'
      default:
        return '📦'
    }
  }

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card-hover overflow-hidden cursor-pointer group h-full flex flex-col">
        {/* Imagen Premium */}
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-100 to-gray-100">
          <Image
            src={getImageUrl(product.images)}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-125 transition-smooth duration-500"
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-smooth"></div>
          
          {/* Badge de condición */}
          <div className={`absolute top-4 right-4 ${getConditionColor(product.condition)} text-sm font-bold py-2 px-3 rounded-full shadow-lg flex items-center space-x-1`}>
            <span>{getConditionEmoji(product.condition)}</span>
            <span>{product.condition}</span>
          </div>

          {/* Categoría badge */}
          <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-bold py-2 px-3 rounded-full shadow-lg">
            {product.category}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Título */}
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-smooth text-lg mb-2">
            {product.title}
          </h3>
          
          {/* Descripción */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
            {product.description}
          </p>

          {/* Precio */}
          <div className="mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Separador */}
          <div className="border-t border-gray-200 pt-4 mt-4"></div>

          {/* Footer info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <span>📍</span>
              <span className="truncate font-semibold">{product.location}</span>
            </div>
            <span className="text-primary-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
          </div>

          {/* Seller info */}
          <div className="mt-3 text-xs text-gray-500 flex items-center space-x-1">
            <span>👤</span>
            <span className="truncate">{product.user.name || product.user.email.split('@')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
