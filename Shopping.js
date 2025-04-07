import React, { useEffect, useState } from 'react';
import { Heart, ShoppingCart, Leaf } from 'lucide-react';
import '../styles/Shopping.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const sampleProducts = [
  {
    id: 1,
    name: 'Bamboo Toothbrush',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1585386959984-a41552262d4d?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Biodegradable', 'Plastic-free'],
  },
  {
    id: 2,
    name: 'Reusable Water Bottle',
    price: 12.49,
    image: 'https://images.unsplash.com/photo-1600185365528-22f21c3c145d?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Zero-waste', 'Durable'],
  },
  {
    id: 3,
    name: 'Organic Cotton Tote Bag',
    price: 8.75,
    image: 'https://images.unsplash.com/photo-1578926281928-59b4213a39d4?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Reusable', 'Organic'],
  },
  {
    id: 4,
    name: 'Compostable Phone Case',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1603775020644-eb8decd799f0?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Compostable', 'Plastic-free'],
  },
  {
    id: 5,
    name: 'Stainless Steel Straw Set',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1581579185169-2a992d2385d0?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Reusable', 'Plastic-free'],
  },
  {
    id: 6,
    name: 'Solar Power Bank',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1627773161301-e0d25358ddfb?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Solar-powered', 'Energy-saving'],
  },
  {
    id: 7,
    name: 'Eco-Friendly Notebooks',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Recycled paper', 'Sustainable'],
  },
  {
    id: 8,
    name: 'Plant-Based Soap Bar',
    price: 4.25,
    image: 'https://images.unsplash.com/photo-1590080875511-8f4f6c6d3dfc?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Chemical-free', 'Vegan'],
  },
  {
    id: 9,
    name: 'Reusable Beeswax Wraps',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1608224897801-890d593134b4?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Zero-waste', 'Plastic-free'],
  },
  {
    id: 10,
    name: 'Eco Yoga Mat',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1599058917212-df095ab83935?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Non-toxic', 'Biodegradable'],
  },
  {
    id: 11,
    name: 'Natural Deodorant',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1580476262791-bb00e04b98f5?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Aluminum-free', 'Natural scent'],
  },
  {
    id: 12,
    name: 'Organic Lip Balm',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1607082349250-4c4fa9282dfd?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Cruelty-free', 'Organic'],
  },
  {
    id: 13,
    name: 'Recycled Denim Journal',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Recycled', 'Sustainable'],
  },
  {
    id: 14,
    name: 'Biodegradable Trash Bags',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1616774288738-1ef8aa70c679?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Compostable', 'Zero-waste'],
  },
  {
    id: 15,
    name: 'Eco Bamboo Cutlery',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1585666200165-6ec4cb9295e3?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Reusable', 'Natural material'],
  },
  {
    id: 16,
    name: 'Natural Loofah Sponge',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1611080626911-d1a8b6f77321?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Biodegradable', 'Plastic-free'],
  },
  {
    id: 17,
    name: 'Recycled Paper Towels',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1618151664235-02773f3a91c4?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Recycled', 'Reusable'],
  },
  {
    id: 18,
    name: 'Coconut Bowl Set',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1623916271803-f6999cd56b32?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Compostable', 'Natural'],
  },
  {
    id: 19,
    name: 'Reusable Coffee Cup',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1571689936045-dfcb8c2d66c5?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Reusable', 'BPA-free'],
  },
  {
    id: 20,
    name: 'Eco Detergent Sheets',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1596704994830-7c5f5b843f09?auto=format&fit=crop&w=500&q=60',
    ecoFeatures: ['Non-toxic', 'Plastic-free'],
  },
];

const Shopping = ({ addToCart, toggleWishlist }) => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
  }, []);

  return (
    <div className="shopping-page">
      <h1 className="shop-title" data-aos="fade-down">Eco-Friendly Products</h1>
      <div className="product-grid">
        {sampleProducts.map((product) => (
          <div className="product-card" data-aos="zoom-in" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">${product.price.toFixed(2)}</p>

              {product.ecoFeatures && (
                <div className="eco-tags">
                  {product.ecoFeatures.slice(0, 2).map((feature, i) => (
                    <span key={i} className="eco-tag">
                      <Leaf size={12} /> {feature}
                    </span>
                  ))}
                </div>
              )}

              <div className="product-actions">
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
                <button 
                  className="wishlist-btn"
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
