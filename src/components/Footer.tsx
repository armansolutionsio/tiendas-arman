import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="gradient-primary text-white mt-24">
      <div className="container-base py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white">
                <Image
                  src="/logo tiendas arman.jpeg"
                  alt="Tiendas Arman Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">Tiendas Arman</h3>
                <p className="text-xs text-primary-100">Marketplace Seguro</p>
              </div>
            </div>
            <p className="text-primary-100 text-sm leading-relaxed">
              La plataforma de compraventa más segura de Argentina. Conectamos vendedores y compradores con confianza.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span className="w-1 h-6 bg-primary-300 rounded-full"></span>
              <span>Navegación</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Explorar Productos</span>
                </Link>
              </li>
              <li>
                <Link href="/products/create" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Vender Producto</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Mi Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Iniciar Sesión</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Información Legal */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span className="w-1 h-6 bg-primary-300 rounded-full"></span>
              <span>Legales</span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#about" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Sobre Nosotros</span>
                </a>
              </li>
              <li>
                <a href="#terms" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Términos y Condiciones</span>
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Política de Privacidad</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="text-primary-100 hover:text-white transition-smooth flex items-center space-x-2">
                  <span>→</span>
                  <span>Preguntas Frecuentes</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span className="w-1 h-6 bg-primary-300 rounded-full"></span>
              <span>Contacto</span>
            </h4>
            <ul className="space-y-3 text-sm text-primary-100">
              <li className="flex items-start space-x-2">
                <span className="text-lg">📧</span>
                <a href="mailto:info@tiendas-arman.com" className="hover:text-white transition-smooth">
                  info@tiendas-arman.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-lg">📱</span>
                <a href="tel:+541100000000" className="hover:text-white transition-smooth">
                  +54 9 11 0000-0000
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-lg">📍</span>
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h4 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <span className="w-1 h-6 bg-primary-300 rounded-full"></span>
              <span>Síguenos</span>
            </h4>
            <div className="flex space-x-4">
              <a href="#facebook" className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-smooth text-xl">
                f
              </a>
              <a href="#twitter" className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-smooth text-xl">
                𝕏
              </a>
              <a href="#instagram" className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-smooth text-xl">
                📷
              </a>
              <a href="#linkedin" className="w-12 h-12 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg flex items-center justify-center transition-smooth text-xl">
                in
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-10 pt-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-white border-opacity-10">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-200">10K+</p>
              <p className="text-xs text-primary-100">Productos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-200">5K+</p>
              <p className="text-xs text-primary-100">Usuarios</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-200">100%</p>
              <p className="text-xs text-primary-100">Seguro</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-100">
            <p>&copy; {currentYear} Tiendas Arman. Todos los derechos reservados. 💜</p>
            <p className="mt-4 md:mt-0 text-xs">Hecho con ❤️ en Argentina</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
