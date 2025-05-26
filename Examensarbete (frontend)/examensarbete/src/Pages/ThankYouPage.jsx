import React from "react";
import { Link } from "react-router-dom";
import "../Styling/ThankYouPage.css";

export function ThankYouPage() {
  return (
    <div className="thankyou-container">
      <h1>Tack för ditt köp!</h1>
      <p>Vi har tagit emot din beställning och hanterar den.</p>
      <Link to="/" className="back-home-link">← Till startsidan</Link>
    </div>
  );
}
