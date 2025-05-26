import React, { useEffect, useState } from "react";
import "../Styling/Hero.css"; // Din CSS om du har

export function Hero() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Gör ett anrop till backend för att hämta bildens URL
    fetch("http://localhost:3001/hero-image")
      .then(response => response.blob()) // Konvertera till en blob
      .then(imageBlob => {
        // Skapa en URL för bilden
        const imageObjectURL = URL.createObjectURL(imageBlob);
        setImageSrc(imageObjectURL); // Sätt den som bildens src
      })
      .catch(error => console.error("Error fetching the image: ", error));
  }, []);

  return (
    <div>
      {imageSrc ? (
        <img
          src={imageSrc}
          alt="hero-bild-serier"
          className="hero-image"
        />
      ) : (
        <p>Laddar hero-bild...</p>
      )}
    </div>
  );
}
