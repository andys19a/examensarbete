import React from "react";
import "../Styling/Checkout.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../Components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QpqLYFqahfzXScHvVlleDDC2QnU8eZc02UknJc9PfmpHf2yl0UN4MpYqBocSSEIXC4xsFk8jsrPlVWxcGcWa56A005jae0rRn");

export function Checkout({ cartItems }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="checkout-container">
      <h2>Orderöversikt</h2>

      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <>
          <div className="checkout-summary">
            {cartItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <span>{item.name}</span>
                <span>{item.price} kr</span>
              </div>
            ))}
            <hr />
            <div className="checkout-total">
              <strong>Totalt:</strong> <span>{total} kr</span>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm amount={total} />
          </Elements>
        </>
      )}
    </div>
  );
}
