import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Descubre tu próxima gran lectura
            </h1>
            <p className="text-xl mb-8">
              Miles de libros digitales en todos los géneros. 
              Lee en cualquier dispositivo, en cualquier momento.
            </p>
            <Link 
              href="/catalogo" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías Destacadas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Categorías Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.nombre}
                href={`/categorias/${categoria.slug}`}
                className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{categoria.emoji}</div>
                <h3 className="font-semibold">{categoria.nombre}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Libros Destacados */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Libros Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {librosDestacados.map((libro) => (
              <div key={libro.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[3/4] bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{libro.titulo}</h3>
                  <p className="text-gray-600 text-sm mb-3">{libro.autor}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${libro.precio}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Datos de ejemplo (más adelante vendrán de Shopify)
const categorias = [
  { nombre: 'Ficción', slug: 'ficcion', emoji: '🎭' },
  { nombre: 'No Ficción', slug: 'no-ficcion', emoji: '📚' },
  { nombre: 'Ciencia', slug: 'ciencia', emoji: '🔬' },
  { nombre: 'Historia', slug: 'historia', emoji: '📜' },
  { nombre: 'Romance', slug: 'romance', emoji: '💕' },
  { nombre: 'Misterio', slug: 'misterio', emoji: '🔍' },
  { nombre: 'Fantasía', slug: 'fantasia', emoji: '🐉' },
  { nombre: 'Negocios', slug: 'negocios', emoji: '💼' },
]

const librosDestacados = [
  {
    id: 1,
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    precio: 9.99,
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    precio: 12.99,
  },
  {
    id: 3,
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    precio: 8.99,
  },
  {
    id: 4,
    titulo: 'Cien Años de Soledad',
    autor: 'Gabriel García Márquez',
    precio: 14.99,
  },
]