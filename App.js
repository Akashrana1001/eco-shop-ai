import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shopping from './pages/Shopping';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <Router>
      {/* Cart is shown across all pages (global access) */}
      <Cart 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        updateQuantity={updateQuantity} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopping" element={
          <Shopping 
            addToCart={addToCart} 
            cartItems={cartItems} 
          />
        } />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Cart already shown globally, optional to have route */}
      </Routes>
    </Router>
  );
};

export default App;
