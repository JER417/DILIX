// src/App.js
import React, { useEffect, useState } from 'react';
import { createStorefrontClient } from '@shopify/hydrogen-react';
import './App.css'; // Si tienes un archivo CSS para App, asegúrate de que exista o coméntalo si no lo usas

// Inicializa el cliente de Shopify con tus variables de entorno
const storefrontClient = createStorefrontClient({
  storeDomain: process.env.REACT_APP_SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  storefrontApiVersion: '2024-04', // Puedes usar la versión actual o una más reciente si es necesario
});

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // GraphQL query para obtener los productos
        const query = `
          query GetProducts {
            products(first: 10) { # Pedimos los primeros 10 productos
              edges {
                node {
                  id
                  title
                  descriptionHtml
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  featuredImage {
                    url
                    altText
                  }
                  tags # Para editoriales y géneros si los manejas como tags
                }
              }
            }
          }
        `;

        // Realiza la petición a la API de Shopify
        const { data, errors } = await storefrontClient.query({
          query,
          variables: {}, // No necesitamos variables para esta query simple
        });

        if (errors) {
          // Manejo de errores de GraphQL
          throw new Error(errors.map(err => err.message).join(', '));
        }

        setProducts(data.products.edges.map(edge => edge.node));
      } catch (err) {
        // Manejo de errores de red o del cliente
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente (al cargar la página)

  if (loading) return <div>Cargando libros...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>Nuestros Libros</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.featuredImage && (
              <img src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} />
            )}
            <h2>{product.title}</h2>
            {/* dangerousSetInnerHTML se usa para renderizar HTML desde la descripción de Shopify */}
            <p dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
            <p>
              Precio: {product.priceRange.minVariantPrice.amount}{' '}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
            {product.tags && product.tags.length > 0 && (
              <p>Etiquetas: {product.tags.join(', ')}</p>
            )}
            {/* Aquí puedes añadir un botón de "Ver detalles" o "Añadir al carrito" */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;