import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styling/Produktsida.css";

export function ProduktSida({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
      })
      .catch((error) => console.error("Fel vid hämtning:", error));
  }, [id]);

  if (!product) return <p className="loading-text">Laddar produkt...</p>;

  return (
    <div className="product-page">
      <h1 className="product-title">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="product-page-image"
      />
      <p className="product-price">Pris: {product.price} kr</p>
      <p className="product-stock">I lager: {product.stock}</p>
      <p className="product-description">{product.description}</p>

      {/* Lägg till i varukorg-knapp */}
      <button onClick={() => addToCart(product)} className="buy-button">
        Lägg till i varukorg
      </button>

      <Link to="/" className="back-link">← Tillbaka</Link>
    </div>
  );
}
