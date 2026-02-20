import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contenido */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="text-primary-600">Tiendas</span> Arman
                </h1>
                <p className="text-2xl text-primary-600 font-semibold mt-2">Tu Marketplace Seguro</p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Compra y vende con confianza. Somos la plataforma más segura de Argentina para transacciones seguras, rápidas y confiables. Miles de usuarios confían en nosotros cada día.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="btn-primary text-lg">
                  Explorar Productos
                </Link>
                <Link href="/products/create" className="btn-secondary text-lg">
                  Comenzar a Vender
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <p className="text-sm text-gray-600 mt-1">Productos Activos</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">5K+</div>
                  <p className="text-sm text-gray-600 mt-1">Usuarios Verificados</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600">100%</div>
                  <p className="text-sm text-gray-600 mt-1">Seguro</p>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative w-full h-96">
                <Image
                  src="/logo tiendas arman.jpeg"
                  alt="Tiendas Arman Logo"
                  fill
                  className="object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir Tiendas Arman?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia de compraventa con características diseñadas para tu seguridad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Seguridad Garantizada</h3>
              <p className="text-gray-600">
                Transacciones seguras con verificación de usuarios y protección de datos garantizados.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Rápido y Fácil</h3>
              <p className="text-gray-600">
                Crea tu anuncio en minutos. Nuestra plataforma es intuitiva y simple de usar para todos.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunicación Directa</h3>
              <p className="text-gray-600">
                Conecta directamente con compradores y vendedores sin intermediarios innecesarios.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accesible</h3>
              <p className="text-gray-600">
                Accede desde cualquier dispositivo. Diseñado para funcionar en desktop, tablet y móvil.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">⭐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Calificaciones</h3>
              <p className="text-gray-600">
                Sistema de calificaciones para conocer la reputación de vendedores y compradores.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-8 text-center group">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-smooth">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cobertura Nacional</h3>
              <p className="text-gray-600">
                Compra y vende en toda Argentina. Conectamos personas en todo el país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">¿Listo para empezar?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están comprando y vendiendo en Tiendas Arman
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="bg-white text-primary-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-smooth text-lg">
              Crear Cuenta
            </Link>
            <Link href="/products" className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:bg-opacity-10 transition-smooth text-lg">
              Ver Productos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}