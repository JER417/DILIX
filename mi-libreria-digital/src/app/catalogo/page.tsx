'use client'

import { useState } from 'react'
import Link from 'next/link'

// Tipos para nuestros libros
interface Libro {
  id: number
  titulo: string
  autor: string
  precio: number
  categoria: string
  imagen?: string
  descripcion: string
}

export default function CatalogoPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('todas')
  const [ordenamiento, setOrdenamiento] = useState('relevancia')
  const [busqueda, setBusqueda] = useState('')

  // Filtrar libros según los criterios
  const librosFiltrados = librosEjemplo.filter(libro => {
    const cumpleBusqueda = libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          libro.autor.toLowerCase().includes(busqueda.toLowerCase())
    const cumpleCategoria = filtroCategoria === 'todas' || libro.categoria === filtroCategoria
    
    return cumpleBusqueda && cumpleCategoria
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header del catálogo */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">Catálogo DILIX Books</h1>
          <p className="text-center mt-4 text-lg">Explora nuestra colección de más de 10,000 títulos</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar de filtros */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="font-bold text-lg mb-4">Filtros</h2>
              
              {/* Búsqueda */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Buscar</label>
                <input
                  type="text"
                  placeholder="Título o autor..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Categorías */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categorías</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="categoria"
                      value="todas"
                      checked={filtroCategoria === 'todas'}
                      onChange={(e) => setFiltroCategoria(e.target.value)}
                      className="mr-2"
                    />
                    <span>Todas las categorías</span>
                  </label>
                  {categorias.map(cat => (
                    <label key={cat.slug} className="flex items-center">
                      <input
                        type="radio"
                        name="categoria"
                        value={cat.slug}
                        checked={filtroCategoria === cat.slug}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className="mr-2"
                      />
                      <span>{cat.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de precio */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Precio</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Menos de $10</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$10 - $20</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>$20 - $30</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Más de $30</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid de libros */}
          <main className="md:col-span-3">
            {/* Barra de ordenamiento */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                {librosFiltrados.length} libros encontrados
              </p>
              <select 
                value={ordenamiento}
                onChange={(e) => setOrdenamiento(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevancia">Más relevantes</option>
                <option value="precio-menor">Precio: menor a mayor</option>
                <option value="precio-mayor">Precio: mayor a menor</option>
                <option value="titulo">Título: A-Z</option>
                <option value="novedad">Más recientes</option>
              </select>
            </div>

            {/* Grid de libros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {librosFiltrados.map(libro => (
                <Link
                  key={libro.id}
                  href={`/libro/${libro.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-gray-400/20">DILIX</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{libro.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-2">{libro.autor}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-blue-600">
                        ${libro.precio.toFixed(2)}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {libro.categoria}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  Siguiente
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

// Datos de ejemplo
const categorias = [
  { nombre: 'Ficción', slug: 'ficcion' },
  { nombre: 'No Ficción', slug: 'no-ficcion' },
  { nombre: 'Ciencia', slug: 'ciencia' },
  { nombre: 'Historia', slug: 'historia' },
  { nombre: 'Romance', slug: 'romance' },
  { nombre: 'Misterio', slug: 'misterio' },
  { nombre: 'Fantasía', slug: 'fantasia' },
  { nombre: 'Negocios', slug: 'negocios' },
]

const librosEjemplo: Libro[] = [
  {
    id: 1,
    titulo: 'El Gran Gatsby',
    autor: 'F. Scott Fitzgerald',
    precio: 9.99,
    categoria: 'ficcion',
    descripcion: 'Una historia sobre el sueño americano'
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    precio: 12.99,
    categoria: 'ficcion',
    descripcion: 'Una distopía sobre el control totalitario'
  },
  {
    id: 3,
    titulo: 'Breve historia del tiempo',
    autor: 'Stephen Hawking',
    precio: 15.99,
    categoria: 'ciencia',
    descripcion: 'Una exploración del universo'
  },
  {
    id: 4,
    titulo: 'Sapiens',
    autor: 'Yuval Noah Harari',
    precio: 18.99,
    categoria: 'historia',
    descripcion: 'La historia de la humanidad'
  },
  {
    id: 5,
    titulo: 'El Hobbit',
    autor: 'J.R.R. Tolkien',
    precio: 14.99,
    categoria: 'fantasia',
    descripcion: 'La aventura de Bilbo Bolsón'
  },
  {
    id: 6,
    titulo: 'Orgullo y Prejuicio',
    autor: 'Jane Austen',
    precio: 11.99,
    categoria: 'romance',
    descripcion: 'Una historia de amor clásica'
  },
]