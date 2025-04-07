import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, X } from 'lucide-react';
import '../styles/Shopping.css';

const Wishlist = ({ wishlistItems, removeFromWishlist, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState('');

  const toggleWishlist = () => {
    if (isOpen) {
      setAnimation('slide-out');
      setTimeout(() => {
        setIsOpen(false);
        setAnimation('');
      }, 300);
    } else {
      setIsOpen(true);
      setAnimation('slide-in');
    }
  };

  // Handle animation when items change
  useEffect(() => {
    if (wishlistItems.length > 0 && isOpen) {
      const newItemElement = document.querySelector('.wishlist-item:last-child');
      if (newItemElement) {
        newItemElement.classList.add('item-added');
        setTimeout(() => {
          if (newItemElement) {
            newItemElement.classList.remove('item-added');
          }
        }, 500);
      }
    }
  }, [wishlistItems.length, isOpen]);

  return (
    <div className="wishlist-container">
      <button 
        className={`wishlist-toggle ${wishlistItems.length > 0 ? 'has-items' : ''}`}
        onClick={toggleWishlist}
        aria-label="Toggle Wishlist"
      >
        <span className="wishlist-icon">❤</span>
        {wishlistItems.length > 0 && (
          <span className="wishlist-count">{wishlistItems.length}</span>
        )}
      </button>

      {isOpen && (
        <div className={`wishlist-panel ${animation}`}>
          <div className="wishlist-header">
            <h2>My Wishlist ({wishlistItems.length})</h2>
            <button 
              className="close-wishlist" 
              onClick={toggleWishlist}
              aria-label="Close Wishlist"
            >
              <X size={20} />
            </button>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist">
              <p>Your wishlist is empty</p>
              <button 
                className="continue-shopping"
                onClick={toggleWishlist}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="wishlist-items">
                {wishlistItems.map(item => (
                  <div key={item.id} className="wishlist-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">${item.price}</p>
                    </div>
                    <div className="item-actions">
                      <button 
                        className="move-to-cart"
                        onClick={() => {
                          addToCart(item);
                          removeFromWishlist(item.id);
                        }}
                        aria-label="Move to Cart"
                      >
                        <ShoppingCart size={16} />
                      </button>
                      <button 
                        className="remove-item"
                        onClick={() => removeFromWishlist(item.id)}
                        aria-label="Remove from Wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="wishlist-footer">
                <button 
                  className="wishlist-action-btn add-all-to-cart"
                  onClick={() => {
                    wishlistItems.forEach(item => addToCart(item));
                    wishlistItems.forEach(item => removeFromWishlist(item.id));
                  }}
                >
                  <ShoppingCart size={16} />
                  Add All to Cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
      
      {isOpen && <div className="overlay" onClick={toggleWishlist}></div>}
    </div>
  );
};

export default Wishlist;