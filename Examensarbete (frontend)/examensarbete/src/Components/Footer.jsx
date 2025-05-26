import React, { useState } from "react";
import "../Styling/Footer.css"; // om du har en footer.css

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      setMessage(text);
      setEmail(""); // töm inputfältet
    } catch (err) {
      setMessage("Något gick fel. Försök igen.");
    }
  };

  return (
    <footer className="footer">
      <p>© 2025 Examensarbete</p>
      <form onSubmit={handleSubscribe} className="newsletter-form">
        <input
          type="email"
          placeholder="Din e-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Prenumerera</button>
      </form>
      {message && <p>{message}</p>}
    </footer>
  );
}
