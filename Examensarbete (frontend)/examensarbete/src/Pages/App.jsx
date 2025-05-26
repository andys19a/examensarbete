import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponenter
import { Navbar } from "../Components/Nav";
import { Footer } from "../Components/Footer";
import { LatestBlogPosts } from "../Components/LatestBlog";
import { ProductBox } from "../Components/Productbox";
import { Cart } from "../Components/Cart";
import { Hero } from "../Components/Hero";

// Sidor
import { Kontakt } from "./Kontakt";
import { Omoss } from "./Omoss";
import { ProduktSida } from "./ProduktSida";
import { Kategorisida } from "./Kategorisida";
import { Checkout } from "./Checkout";
import { ThankYouPage } from "./ThankYouPage";
import { BlogPage } from "./BlogPage";

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar cartCount={cartItems.length} />

        {/* Rendera Hero endast på startsidan */}
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={
              <>
                <ProductBox addToCart={addToCart} />
                <LatestBlogPosts />
              </>
            } />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/om-oss" element={<Omoss />} />
            <Route path="/produktsida/:id" element={<ProduktSida addToCart={addToCart} />} />
            <Route path="/kategorier/:category" element={<Kategorisida addToCart={addToCart} />} />
            <Route path="/varukorg" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/blogg" element={<BlogPage />} />
            <Route path="/blogg/:category" element={<BlogPage />} />
            <Route path="/tack" element={<ThankYouPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
