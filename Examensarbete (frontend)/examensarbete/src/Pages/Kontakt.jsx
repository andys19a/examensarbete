import React, { useState } from "react";
import "../Styling/Kontakt.css"; // Om du vill använda separat CSS

export function Kontakt() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = { name, email, phone, message };
  
    try {
      const response = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        alert("Tack! Ditt meddelande har sparats.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        alert("Något gick fel, försök igen.");
      }
    } catch (err) {
      console.error("Fel vid skickande:", err);
      alert("Ett tekniskt fel uppstod.");
    }
  };

  return (
    <div className="kontakt-container">
      <h1>Kontakta oss</h1>
      <form className="kontakt-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Namn:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-post:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefonnummer:</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Meddelande:</label>
          <textarea
            id="message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="kontakt-button">Skicka meddelande</button>
      </form>
    </div>
  );
}

