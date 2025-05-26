import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styling/Productbox.css";

export function ProductBox({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (category) {
          const filtered = data.filter((p) => p.category === category);
          setProducts(filtered);
        } else {
          setProducts(data);
        }
      })
      .catch((error) => console.error("Fel vid hämtning av produkter:", error));
  }, [category]);

  return (
    <div>
      <h2>{category ? `Produkter i ${category}` : "Alla produkter"}</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/produktsida/${product.id}`} className="product-link">
              <h3>{product.name}</h3>
            </Link>
            <img src={product.image} alt={product.name} className="product-image" />
            <p>Pris: {product.price} kr</p>
            <Link to={`/produktsida/${product.id}`} className="product-link"><button> Läs mer</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

