import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styling/Kategorisida.css";

// SEO-optimerade texter för varje kategori
const categoryDescriptions = {
  dexter: {
    title: "Dexter Merchandise – Hitta din favorit från Dexter-serien",
    description: "Välkommen till vår exklusiva samling av Dexter merchandise, där du kan hitta produkter som fångar den mörka och spännande världen av Dexter Morgan. Oavsett om du är en långvarig fan av Dexter eller just har börjat följa hans mörka resa som seriemördare och blodsplattanalytiker, har vi något för dig. Upptäck allt från kläder, samlarobjekt till Dexter-relaterade prylar som du inte vill missa."
  },
  "casa-de-papel": {
    title: "Casa de Papel Merch – Unika produkter för fans av La Casa de Papel",
    description: "Om du är ett fan av La Casa de Papel (Money Heist), så har vi ett brett utbud av Casa de Papel merchandise för att hylla din favoritserie. Från röd overall, Salvador Dalí-masker, till dekorationer som speglar den spännande och gripande världen i denna internationella hitserie, erbjuder vi det bästa som finns att tillgå."
  },
  "prison-break": {
    title: "Prison Break Merch – Din samling av Prison Break produkter",
    description: "Är du ett fan av Prison Break? Då kommer du att älska vår noggrant utvalda Prison Break merchandise, fylld med produkter inspirerade av den populära serien. Från klassiska Prison Break t-shirts till accessoarer som hyllar Michael Scofields episka flykt från fängelset – vi har alla produkter du kan tänka dig för att visa ditt stöd för denna otroliga serie."
  }
};

export function Kategorisida() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((p) => p.category === category);
        setProducts(filtered);
      });
  }, [category]);

  // Få den SEO-optimerade texten baserat på kategorin
  const categoryText = categoryDescriptions[category.toLowerCase()] || {
    title: "Produkter",
    description: "Utforska våra fantastiska produkter!"
  };

  return (
    <div className="category-page">
      {/* SEO-optimerad titel och beskrivning */}
      <h2 className="category-title">{categoryText.title}</h2>
      <p className="category-description">{categoryText.description}</p>

      <div className="category-grid">
        {products.map((product) => (
          <div key={product.id} className="category-card">
            <Link to={`/produktsida/${product.id}`} className="product-link">
              <img
                src={product.image}
                alt={product.name}
                className="category-image"
              />
              <h3>{product.name}</h3>
              <p>{product.price} kr</p>
              <button className="category-button">Läs mer</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
