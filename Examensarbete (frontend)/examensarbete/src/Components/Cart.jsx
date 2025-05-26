import React from "react";
import { Link } from "react-router-dom";


export function Cart({ cartItems, removeFromCart }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Din varukorg</h2>
      {cartItems.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <h4>{item.name}</h4>
              <p>Pris: {item.price} kr</p>
              <button onClick={() => removeFromCart(index)}>Ta bort</button>
            </div>
          ))}
          <hr />
          <h3>Total: {total} kr</h3>
          <Link to="/Checkout">
          <button>Till kassan</button>
          </Link>
            
        </div>
      )}
    </div>
  );
}
