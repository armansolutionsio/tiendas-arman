import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tiendas Arman - Marketplace Seguro de Argentina',
  description: 'Plataforma de compra-venta segura para Argentina. Compra y vende productos con confianza en Tiendas Arman.',
  keywords: 'compraventa, marketplace, Argentina, seguro, tiendas',
  authors: [{ name: 'Tiendas Arman' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}