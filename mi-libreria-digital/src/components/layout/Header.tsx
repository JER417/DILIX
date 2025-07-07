import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            📚 Mi Librería
          </Link>
          
          {/* Menú de navegación */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/catalogo" className="hover:text-gray-300">
              Catálogo
            </Link>
            <Link href="/categorias" className="hover:text-gray-300">
              Categorías
            </Link>
            <Link href="/novedades" className="hover:text-gray-300">
              Novedades
            </Link>
            <Link href="/sobre-nosotros" className="hover:text-gray-300">
              Nosotros
            </Link>
          </div>
          
          {/* Carrito */}
          <button className="flex items-center space-x-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Carrito (0)</span>
          </button>
        </div>
      </nav>
    </header>
  )
}