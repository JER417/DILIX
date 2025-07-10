// src/app/page.tsx
"use client"; // Esta directiva es CRUCIAL para que sea un componente de cliente

import React, { useEffect, useState } from 'react';
// Ya no necesitamos 'createStorefrontClient' para este enfoque directo de fetch
// import { createStorefrontClient } from '@shopify/hydrogen-react';

// Si creaste storefrontConfig en el ámbito global, bórralo o coméntalo:
// const storefrontConfig = createStorefrontClient({...});


export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AÑADE ESTAS LÍNEAS DE CONSOLE.LOG AQUÍ (SI NO LO HAS HECHO ANTES)
    console.log("Valor de NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
    console.log("Valor de NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
    // --- FIN DE LAS LÍNEAS A AÑADIR ---

    const fetchProducts = async () => {
      try {
        const graphqlQuery = `
          query GetProducts {
            products(first: 10) {
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
                  tags
                }
              }
            }
          }
        `;

        // OBTENEMOS EL DOMINIO Y TOKEN DIRECTAMENTE DE process.env
        const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
        const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
        const storefrontApiVersion = '2024-04'; // Puedes hacer que esta versión también sea una variable de entorno si cambias a menudo

        // VALIDACIÓN PARA ASEGURAR QUE LAS VARIABLES ESTÁN CONFIGURADAS
        if (!storeDomain) {
            throw new Error("Store Domain is not configured in .env (NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN)");
        }
        if (!accessToken) {
            throw new Error("Storefront Access Token is not configured in .env (NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN)");
        }

        // CONSTRUIMOS LA URL DE LA API MANUALMENTE
        const apiUrl = `https://${storeDomain}/api/${storefrontApiVersion}/graphql.json`;

        // Realizar la petición Fetch directamente
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': accessToken, // Usamos el token aquí
          },
          body: JSON.stringify({
            query: graphqlQuery,
          }),
        });

        const result = await response.json();

        // Manejar errores de la respuesta HTTP
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${result.errors ? result.errors.map((err: any) => err.message).join(', ') : 'Unknown error'}`);
        }

        // Manejar errores de GraphQL dentro de la respuesta (si existen)
        if (result.errors) {
          throw new Error(result.errors.map((err: any) => err.message).join(', '));
        }

        setProducts(result.data.products.edges.map((edge: any) => edge.node));
      } catch (err: unknown) {
        let errorMessage = 'An unknown error occurred.';
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Cargando libros...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>Error: {error}</div>;

  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Nuestros Libros</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product: any) => (
          <div key={product.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            {product.featuredImage && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
              />
            )}
            <h2 style={{ fontSize: '1.2em', marginBottom: '5px' }}>{product.title}</h2>
            <p style={{ fontSize: '0.9em', color: '#555', minHeight: '50px', overflow: 'hidden', textOverflow: 'ellipsis' }} dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></p>
            <p style={{ fontWeight: 'bold', fontSize: '1.1em', marginTop: '10px' }}>
              Precio: {product.priceRange.minVariantPrice.amount}{' '}
              {product.priceRange.minVariantPrice.currencyCode}
            </p>
            {product.tags && product.tags.length > 0 && (
              <p style={{ fontSize: '0.8em', color: '#777' }}>Etiquetas: {product.tags.join(', ')}</p>
            )}
            {/* Aquí puedes añadir un botón de "Ver detalles" o "Añadir al carrito" */}
          </div>
        ))}
      </div>
    </main>
  );
}