import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-light -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container-base py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block">
                  <span className="badge bg-primary-100 text-primary-700 text-lg font-bold">✨ Nuevo en Tiendas Arman</span>
                </div>
                <h1 className="text-heading-1 leading-tight">
                  <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 bg-clip-text text-transparent">
                    Tu Marketplace
                  </span>
                  <br />
                  <span className="text-gray-900">Seguro de Confianza</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Compra y vende con total seguridad. La plataforma más confiable de Argentina para transacciones rápidas, transparentes y protegidas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/products" className="btn-primary text-lg font-bold">
                  🛍️ Explorar Productos
                </Link>
                <Link href="/products/create" className="btn-secondary text-lg font-bold">
                  📦 Comenzar a Vender
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    10K+
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-semibold">Productos Activos</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    5K+
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-semibold">Usuarios Verificados</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    100%
                  </div>
                  <p className="text-sm text-gray-600 mt-2 font-semibold">Seguro Garantizado</p>
                </div>
              </div>
            </div>

            {/* Logo Animado */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-md h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center h-full">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full animate-float">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características - Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-base">
          <div className="text-center mb-20">
            <h2 className="text-heading-2 mb-6">¿Por qué elegir Tiendas Arman?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ofrecemos la mejor experiencia de compraventa con características diseñadas para tu seguridad, comodidad y tranquilidad
            </p>
          </div>

          <div className="grid-auto">
            {/* Feature 1 - Seguridad */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">🔒</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Seguridad Garantizada</h3>
              <p className="text-gray-600 leading-relaxed">
                Transacciones seguras con verificación de usuarios y protección de datos. Tus pagos están protegidos desde el inicio.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>

            {/* Feature 2 - Velocidad */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rápido y Fácil</h3>
              <p className="text-gray-600 leading-relaxed">
                Crea tu anuncio en minutos. Nuestra plataforma es intuitiva y diseñada para todos sin necesidad de conocimientos técnicos.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>

            {/* Feature 3 - Comunicación */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">💬</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Comunicación Directa</h3>
              <p className="text-gray-600 leading-relaxed">
                Conecta directamente con compradores y vendedores sin intermediarios. Negocia con libertad y transparencia total.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>

            {/* Feature 4 - Verificación */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">✅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Usuarios Verificados</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros usuarios están verificados y validados. Compra y vende con la confianza de saber quién está al otro lado.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>

            {/* Feature 5 - Variedad */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">🏪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Gran Variedad</h3>
              <p className="text-gray-600 leading-relaxed">
                Desde electrónica hasta inmuebles, encuentra todo lo que necesitas. Miles de productos actualizados diariamente.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>

            {/* Feature 6 - Soporte */}
            <div className="card-hover p-10 group">
              <div className="text-7xl mb-6 transform group-hover:scale-125 transition-smooth inline-block">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Soporte 24/7</h3>
              <p className="text-gray-600 leading-relaxed">
                Equipo disponible para ayudarte en cualquier momento. Respuestas rápidas y soluciones efectivas para tus consultas.
              </p>
              <div className="mt-4 w-1 h-1 bg-primary-600 rounded-full group-hover:w-12 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-primary text-white">
        <div className="container-base text-center">
          <h2 className="text-heading-2 text-white mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Únete a miles de usuarios que confían en Tiendas Arman para sus compras y ventas seguras
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg font-bold bg-white text-primary-700 hover:bg-gray-100">
              Registrarse Ahora
            </Link>
            <Link href="/products" className="btn-secondary text-lg font-bold border-white text-white hover:bg-white hover:bg-opacity-10">
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-white">
        <div className="container-base">
          <div className="text-center mb-16">
            <h2 className="text-heading-3 mb-4">Confían en Tiendas Arman</h2>
            <p className="text-gray-600">Miles de usuarios satisfechos en toda Argentina</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="text-4xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-gray-600">Productos Listados</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary-600 mb-2">5K+</p>
              <p className="text-gray-600">Usuarios Activos</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary-600 mb-2">100%</p>
              <p className="text-gray-600">Seguridad</p>
            </div>
            <div className="p-6">
              <p className="text-4xl font-bold text-primary-600 mb-2">24/7</p>
              <p className="text-gray-600">Disponibles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
