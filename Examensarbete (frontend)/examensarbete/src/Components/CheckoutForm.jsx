import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

export function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setStatus("Stripe är inte redo ännu.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      // 1. Skapa PaymentIntent från backend
      const { clientSecret } = await fetch("http://localhost:3001/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      }).then(res => res.json());

      // 2. Bekräfta betalningen
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        setStatus("❌ Betalning misslyckades: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setStatus("✅ Betalning genomförd! Tack för din order.");
      }

    } catch (err) {
      setStatus("Något gick fel. Försök igen.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Bearbetar..." : `Betala ${amount} kr`}
      </button>
      {status && <p className="payment-status">{status}</p>}
    </form>
  );
}
