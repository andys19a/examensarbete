import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51QpqLYFqahfzXScHvVlleDDC2QnU8eZc02UknJc9PfmpHf2yl0UN4MpYqBocSSEIXC4xsFk8jsrPlVWxcGcWa56A005jae0rRn');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode> (valfritt, men ibland orsakar dubbel render i dev)
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
  //</React.StrictMode>
);
