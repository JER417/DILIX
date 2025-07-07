export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mi Librería Digital</h3>
              <p className="text-gray-400">
                Tu destino para los mejores libros digitales. 
                Lee en cualquier lugar, en cualquier momento.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/catalogo" className="hover:text-white">Catálogo</a></li>
                <li><a href="/novedades" className="hover:text-white">Novedades</a></li>
                <li><a href="/ofertas" className="hover:text-white">Ofertas</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/como-comprar" className="hover:text-white">¿Cómo comprar?</a></li>
                <li><a href="/formatos" className="hover:text-white">Formatos disponibles</a></li>
                <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mi Librería Digital. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
  }