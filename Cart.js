import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, X, Plus, Minus, Leaf } from 'lucide-react';
import '../styles/Shopping.css';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation, setAnimation] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [ecoImpact, setEcoImpact] = useState({
    plasticSaved: 0,
    co2Reduced: 0,
    waterSaved: 0
  });

  // Calculate total price and eco impact
  const totalPrice = cartItems.reduce((total, item) => 
    total + (item.price * (item.quantity || 1)), 0);

  useEffect(() => {
    // Calculate estimated environmental impact
    const plasticSaved = cartItems.length * 0.5; // kg
    const co2Reduced = cartItems.length * 2.3; // kg
    const waterSaved = cartItems.length * 500; // liters
    
    setEcoImpact({
      plasticSaved,
      co2Reduced,
      waterSaved
    });
  }, [cartItems]);

  const toggleCart = () => {
    if (isOpen) {
      setAnimation('slide-out-right');
      setTimeout(() => {
        setIsOpen(false);
        setAnimation('');
        setCheckoutStep(0);
      }, 300);
    } else {
      setIsOpen(true);
      setAnimation('slide-in-right');
    }
  };

  const handleNextStep = () => {
    if (checkoutStep < 2) {
      setCheckoutStep(checkoutStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (checkoutStep > 0) {
      setCheckoutStep(checkoutStep - 1);
    }
  };

  // Fake checkout completion
  const completeCheckout = () => {
    setCheckoutStep(3); // Success state
    setTimeout(() => {
      cartItems.forEach(item => removeFromCart(item.id));
      setCheckoutStep(0);
      toggleCart();
    }, 3000);
  };

  return (
    <div className="cart-container">
      <button 
        className={`cart-toggle ${cartItems.length > 0 ? 'has-items' : ''}`}
        onClick={toggleCart}
        aria-label="Toggle Cart"
      >
        <ShoppingBag size={20} />
        {cartItems.length > 0 && (
          <span className="cart-count">{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</span>
        )}
      </button>

      {isOpen && (
        <div className={`cart-panel ${animation}`}>
          <div className="cart-header">
            <h2>
              {checkoutStep === 0 ? `Shopping Cart (${cartItems.length})` : 
               checkoutStep === 1 ? 'Shipping Details' :
               checkoutStep === 2 ? 'Payment Information' :
               'Order Complete!'}
            </h2>
            <button 
              className="close-cart" 
              onClick={toggleCart}
              aria-label="Close Cart"
            >
              <X size={20} />
            </button>
          </div>

          {checkoutStep === 0 && (
            <>
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={64} className="empty-cart-icon" />
                  <p>Your cart is empty</p>
                  <button 
                    className="continue-shopping"
                    onClick={toggleCart}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="item-image" />
                        <div className="item-details">
                          <h3>{item.name}</h3>
                          {item.ecoFeatures && (
                            <div className="eco-tags">
                              {item.ecoFeatures.slice(0, 2).map((tag, i) => (
                                <span key={i} className="eco-tag">
                                  <Leaf size={10} /> {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="item-price">${item.price}</p>
                        </div>
                        <div className="quantity-control">
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                            aria-label="Decrease Quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="quantity">{item.quantity || 1}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            aria-label="Increase Quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="eco-impact">
                    <h3>Your Environmental Impact</h3>
                    <div className="impact-stats">
                      <div className="impact-stat">
                        <span className="impact-value">{ecoImpact.plasticSaved.toFixed(1)} kg</span>
                        <span className="impact-label">Plastic Saved</span>
                      </div>
                      <div className="impact-stat">
                        <span className="impact-value">{ecoImpact.co2Reduced.toFixed(1)} kg</span>
                        <span className="impact-label">CO₂ Reduced</span>
                      </div>
                      <div className="impact-stat">
                        <span className="impact-value">{ecoImpact.waterSaved.toFixed(0)} L</span>
                        <span className="impact-label">Water Saved</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="cart-summary">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Eco-friendly Packaging</span>
                      <span>$3.99</span>
                    </div>
                    <div className="summary-row">
                      <span>Carbon Offset</span>
                      <span>$1.99</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>${(totalPrice + 5.98).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="cart-footer">
                    <button 
                      className="checkout-btn"
                      onClick={handleNextStep}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {checkoutStep === 1 && (
            <div className="checkout-form shipping-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="Enter your address" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" placeholder="City" />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code</label>
                  <input type="text" id="zipCode" placeholder="Zip Code" />
                </div>
              </div>
              <div className="checkout-buttons">
                <button className="back-btn" onClick={handlePreviousStep}>Back to Cart</button>
                <button className="next-btn" onClick={handleNextStep}>Continue to Payment</button>
              </div>
            </div>
          )}

          {checkoutStep === 2 && (
            <div className="checkout-form payment-form">
              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input type="text" id="cardName" placeholder="Enter name on card" />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input type="text" id="expiry" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" placeholder="123" />
                </div>
              </div>
              
              <div className="eco-options">
                <h3>Eco-friendly Options</h3>
                <div className="option">
                  <input type="checkbox" id="recyclable" checked readOnly />
                  <label htmlFor="recyclable">Use recyclable packaging</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="carbonOffset" checked readOnly />
                  <label htmlFor="carbonOffset">Include carbon offset</label>
                </div>
                <div className="option">
                  <input type="checkbox" id="paperless" checked readOnly />
                  <label htmlFor="paperless">Paperless receipt</label>
                </div>
              </div>
              
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>{cartItems.length} items</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Eco-friendly options</span>
                  <span>$5.98</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(totalPrice + 5.98).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="checkout-buttons">
                <button className="back-btn" onClick={handlePreviousStep}>Back to Shipping</button>
                <button className="complete-btn" onClick={completeCheckout}>Complete Order</button>
              </div>
            </div>
          )}

          {checkoutStep === 3 && (
            <div className="order-success">
              <div className="success-animation">
                <div className="checkmark-circle">
                  <div className="checkmark"></div>
                </div>
              </div>
              <h3>Order Successful!</h3>
              <p>Thank you for your eco-friendly purchase.</p>
              <p>An email confirmation has been sent.</p>
              <div className="eco-impact-message">
                <Leaf size={20} />
                <p>Your purchase saved {ecoImpact.plasticSaved.toFixed(1)}kg of plastic and offset {ecoImpact.co2Reduced.toFixed(1)}kg of CO₂</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {isOpen && <div className="overlay" onClick={toggleCart}></div>}
    </div>
  );
};

export default Cart;