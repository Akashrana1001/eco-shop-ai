import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, PieChart, LineChart, MessageSquare, Send, X, ShoppingBag, Leaf } from "lucide-react";

import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const buttonRef = useRef(null);
  const featureCardsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const navigate = useNavigate();
  
  // Chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm EcoBot, your sustainable shopping assistant. How can I help you find eco-friendly products today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const featureCards = [
    {
      icon: <BarChart3 />,
      title: "Eco Impact Tracking",
      description: "Track your carbon footprint and sustainable choices",
      stats: [
        { value: "90%", label: "Eco-Friendly" },
        { value: "100%", label: "Transparency" },
      ],
    },
    {
      icon: <PieChart />,
      title: "Green Insights",
      description: "Visualize the environmental impact of your purchases",
      stats: [
        { value: "50+", label: "Sustainable Brands" },
        { value: "100%", label: "Recyclable Products" },
      ],
    },
    {
      icon: <LineChart />,
      title: "Sustainability Trends",
      description: "Stay updated with the latest eco-friendly shopping trends",
      stats: [
        { value: "99%", label: "Ethical Sourcing" },
        { value: "Real-time", label: "Updates" },
      ],
    },
  ];
  
  // Sample eco-friendly product recommendations for chatbot
  const ecoProducts = {
    clothing: [
      { name: "Organic Cotton T-Shirt", brand: "EcoWear", rating: "98% Eco-Friendly" },
      { name: "Recycled Denim Jeans", brand: "GreenThreads", rating: "95% Eco-Friendly" },
      { name: "Hemp Blend Sweater", brand: "PlanetFiber", rating: "97% Eco-Friendly" },
    ],
    homegoods: [
      { name: "Bamboo Kitchen Utensils", brand: "EcoHome", rating: "99% Eco-Friendly" },
      { name: "Recycled Glass Containers", brand: "ZeroWaste", rating: "100% Recyclable" },
      { name: "Organic Hemp Bedsheets", brand: "EcoSleep", rating: "96% Eco-Friendly" },
    ],
    beauty: [
      { name: "Plastic-Free Shampoo Bar", brand: "EcoGlow", rating: "100% Plastic-Free" },
      { name: "Organic Face Moisturizer", brand: "PureNature", rating: "98% Natural Ingredients" },
      { name: "Refillable Makeup Set", brand: "GreenBeauty", rating: "90% Less Packaging" },
    ],
    electronics: [
      { name: "Solar Powered Charger", brand: "EcoPower", rating: "100% Renewable Energy" },
      { name: "Recycled Plastic Headphones", brand: "GreenSound", rating: "85% Recycled Materials" },
      { name: "Energy Efficient Smart Plug", brand: "EcoTech", rating: "70% Energy Savings" },
    ],
  };
  
  const handleGetStarted = () => {
    navigate('/shopping', { replace: true });
  };

  const featuresContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    initial: {
      y: 100,
      opacity: 0,
      scale: 0.95,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
        duration: 0.8,
      },
    },
  };

  // Chatbot functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isChatbotOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isChatbotOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Process user input and generate response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue.toLowerCase());
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  const generateResponse = (input) => {
    let responseText = "";
    let responseData = null;

    // Keywords for different product categories
    const clothingTerms = ["cloth", "shirt", "pants", "jeans", "dress", "wear", "apparel", "fashion"];
    const homeTerms = ["home", "kitchen", "bedroom", "living", "furniture", "decor"];
    const beautyTerms = ["beauty", "cosmetic", "makeup", "skin", "care", "shampoo", "soap"];
    const electronicTerms = ["electronic", "gadget", "phone", "computer", "laptop", "device", "tech"];

    // Check for general help or greeting
    if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
      responseText = "Hello! I can help you find eco-friendly products. What type of items are you looking for today?";
    } 
    // Check for product category queries
    else if (clothingTerms.some(term => input.includes(term))) {
      responseText = "Here are some eco-friendly clothing options I recommend:";
      responseData = { type: "products", category: "clothing" };
    } 
    else if (homeTerms.some(term => input.includes(term))) {
      responseText = "Check out these sustainable home goods:";
      responseData = { type: "products", category: "homegoods" };
    } 
    else if (beautyTerms.some(term => input.includes(term))) {
      responseText = "Here are some eco-friendly beauty products:";
      responseData = { type: "products", category: "beauty" };
    } 
    else if (electronicTerms.some(term => input.includes(term))) {
      responseText = "These electronics are more sustainable options:";
      responseData = { type: "products", category: "electronics" };
    }
    // General sustainability questions
    else if (input.includes("sustainable") || input.includes("eco") || input.includes("green")) {
      responseText = "I can help you find sustainable products in various categories like clothing, home goods, beauty, and electronics. What specifically are you looking for?";
    }
    // Default response for unrecognized queries
    else {
      responseText = "I'd be happy to help you find eco-friendly products. You can ask about sustainable clothing, home goods, beauty products, or electronics.";
    }

    return {
      id: messages.length + 2,
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
      data: responseData,
    };
  };

  // Format timestamp for chat messages
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleCards = entries.map((entry) => entry.isIntersecting);
        setVisibleCards(newVisibleCards);
      },
      { threshold: 0.1 }
    );

    if (featureCardsRef.current) {
      const cards = featureCardsRef.current.querySelectorAll(".feature-card");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setShowCard(true);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  const dropdownContent = {
    Private: {
      title: "Discover E-commX Private",
      sections: [
        {
          title: "Daily Elections",
          items: ["Role Transfer", "Analytics", "Budgetings", "Accounts"],
        },
        {
          title: "Financial Elections",
          items: ["IPO Bidding", "Global Transfers", "Security"],
        },
      ],
    },
    Public: {
      title: "Discover E-commX Public",
      sections: [
        {
          title: "Presidency Elections",
          items: ["Election Funding", "Role Management", "Result"],
        },
        {
          title: "Enterprise Elections",
          items: ["Board Of Directors Elections", "Role Change"],
        },
      ],
    },
    company: {
      title: "About E-commX",
      sections: [
        {
          title: "Company",
          items: ["About Us", "Careers", "Press", "Contact"],
        },
        {
          title: "Resources",
          items: ["Blog", "Help Center", "Developer Docs"],
        },
      ],
    },
  };

  return (
    <div className="home-container">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            className="logo-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
          >
            <motion.h1
              className="logo-text"
              initial={{ scale:0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
            >
              E-commX
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showContent && (
          <>
            <motion.nav
              className="navbar"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <div className="nav-left">
                {Object.entries(dropdownContent).map(([key, content]) => (
                  <div key={key} className="dropdown-container">
                    <button className="nav-btn">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                    <div className="dropdown-menu">
                      <h3>{content.title}</h3>
                      {content.sections.map((section, index) => (
                        <div key={index} className="dropdown-section">
                          <div className="dropdown-section-title">
                            {section.title}
                          </div>
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href="#"
                              className="dropdown-item"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="nav-center">
                <h1 className="nav-logo">E-commX</h1>
              </div>

              <div className="nav-right">
                <button className="nav-btn">Help</button>
                <button className="nav-btn">Blog</button>
                <button className="nav-btn">EN</button>
                <button className="nav-btn nav-btn-dark" onClick={handleGetStarted}>Get Started</button>
              </div>
            </motion.nav>

            <motion.div
              className="black-container"
              variants={containerVariants}
              initial="initial"
              animate="animate"
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1,
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <div className="content-container">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                    ease: "easeOut",
                  }}
                >
                  <motion.h1
                    className="main-heading"
                    ref={headingRef}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    <motion.span
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                    >
                      Secure, Transparent, Sustainable
                    </motion.span>
                    <motion.span
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 1.2,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    >
                      AI-Powered Ethical & Eco-Friendly Shopping.
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="sub-heading"
                    ref={subHeadingRef}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                  >
                    Shop with confidence in a secure, transparent, and
                    eco-friendly AI-powered marketplace.
                  </motion.p>

                  <motion.button
                    className="open-account-btn"
                    ref={buttonRef}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    Open E-commX Account
                  </motion.button>

                  <AnimatePresence>
                    {showCard && (
                      <motion.div
                        className="card-interface"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 1,
                          duration: 0.8,
                          delay: 0.2,
                        }}
                      >
                        <div className="card-header">
                          <h2>Payments</h2>
                          <div className="card-tabs">
                            <button className="card-tab active">
                              My Payment Methods
                            </button>
                            <button className="card-tab">
                              All Payment Options
                            </button>
                          </div>
                        </div>
                        <div className="card-content">
                          <div className="card-section">
                            <div className="card-title">
                              <h3>My Payment Methods</h3>
                              <span className="card-count">6</span>
                              <button className="add-card-btn">+</button>
                            </div>
                            <div className="credit-card">
                              <div className="card-type">Eco Wallet</div>
                              <div className="card-number">0xf1 ** ** **</div>
                              <div className="card-valid">Verified</div>
                            </div>
                          </div>
                          <div className="card-section">
                            <div className="card-balance">
                              <h3>Wallet Balance (EcoCoins)</h3>
                              <div className="balance-amount">20.3</div>
                              <div className="transaction">
                                <span>Today</span>
                                <span>$5621.19</span>
                              </div>
                            </div>
                          </div>
                          <div className="card-section">
                            <div className="card-statistics">
                              <div className="statistic-header">
                                <h3>Spending Insights</h3>
                                <select className="period-select">
                                  <option>Week</option>
                                  <option>Month</option>
                                  <option>Year</option>
                                </select>
                              </div>
                              <div className="spending-chart">
                                <div className="chart-segment">
                                  <span className="segment shopping">
                                    Sustainable Shopping 45%
                                  </span>
                                  <span className="segment subscriptions">
                                    Eco-Friendly Subscriptions 35%
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="below-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className="global-payments"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 100,
                    delay: 0.2,
                  },
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="tag"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3 },
                  }}
                  viewport={{ once: true }}
                >
                  Daily Elections
                </motion.div>
                <motion.h2
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4 },
                  }}
                  viewport={{ once: true }}
                >
                  Efficiency at its best: E-commX's
                  <br />
                  Weekly Sustainableship
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5 },
                  }}
                  viewport={{ once: true }}
                >
                  Empowering global decentralization.
                </motion.p>

                <motion.div
                  className="payments-grid"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.6,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="payments-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="tag">Sustainable Impact</div>
                    <h3 className="payments-title">
                      Shop Green: Your
                      <br />
                      Gateway to Eco-Friendly
                      <br />
                      Choices
                    </h3>
                    <p className="payments-description">
                      E-commX: making sustainable shopping effortless
                      <br />
                      for a better planet.
                    </p>
                  </motion.div>

                  <motion.div
                    className="payment-card"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        delay: 0.2,
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="payment-form">
                      <h4>Amount</h4>
                      <div className="amount-input">
                        <span>Support Sustainable Brands</span>
                        <div className="amount-display">
                          <span>€2,298</span>
                          <div className="balance">Balance: €6,950.00</div>
                        </div>
                        <div className="currency-select">
                          <span className="currency-flag">🇪🇺</span>
                          <span>EUR</span>
                          <span className="arrow">▼</span>
                        </div>
                      </div>

                      <div className="recipient-input">
                        <h4>Who are you purchasing from?</h4>
                        <div className="recipient-select">
                          <span className="avatar">EB</span>
                          <span>EcoBrands Store</span>
                          <span className="arrow">▼</span>
                        </div>
                      </div>

                      <motion.button
                        className="send-button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Confirm and Send
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="features-section"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={featuresContainerVariants}
            >
              <motion.div className="features-header" variants={headerVariants}>
                <motion.span
                  className="features-tag"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Features
                </motion.span>
                <motion.h2 className="features-title">
                  Everything You Need for Green Shopping
                </motion.h2>
                <motion.p className="features-subtitle">
                  Powerful tools and features to make sustainable shopping
                  easier and more rewarding.
                </motion.p>
              </motion.div>

              <motion.div
                className="features-grid"
                variants={featuresContainerVariants}
                ref={featureCardsRef}
              >
                {featureCards.map((card, index) => (
                  <motion.div
                    key={index}
                    className="feature-card"
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.02,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="feature-icon"
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 0.6 },
                      }}
                    >
                      {card.icon}
                    </motion.div>
                    <h3 className="feature-title">{card.title}</h3>
                    <p className="feature-description">{card.description}</p>
                    <div className="feature-stats">
                      {card.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 * statIndex }}
                        >
                          <div className="stat-value">{stat.value}</div>
                          <div className="stat-label">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Section */}
      <motion.footer 
        className="footer"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-commX</h3>
            <p>Your trusted partner in sustainable shopping</p>
            <div className="social-links">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">Instagram</a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Sustainable Shopping</h4>
            <ul>
              <li><a href="#">Eco-Friendly Products</a></li>
              <li><a href="#">Green Brands</a></li>
              <li><a href="#">Carbon Footprint Calculator</a></li>
              <li><a href="#">Sustainability Reports</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About Us</h4>
            <ul>
              <li><a href="#">Our Mission</a></li>
              <li><a href="#">Environmental Impact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 E-commX. All rights reserved.</p>
          <p>Making the world greener, one purchase at a time.</p>
        </div>
      </motion.footer>

      {/* Chatbot toggle button */}
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 }}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#34D399",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          zIndex: 100,
          cursor: "pointer",
        }}
      >
        <MessageSquare color="white" size={24} />
      </motion.button>
{/* Chatbot interface */}
<AnimatePresence>
    {isChatbotOpen && (
      <motion.div
        className="chatbot-container"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          position: "fixed",
          bottom: "5rem",
          right: "2rem",
          width: "350px",
          height: "500px",
          borderRadius: "16px",
          backgroundColor: "white",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 99,
        }}
      >
        {/* Chatbot header */}
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#34D399",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Leaf size={20} />
            <h3 style={{ margin: 0 }}>EcoBot Assistant</h3>
          </div>
          <button
            onClick={() => setIsChatbotOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat messages area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message ${message.sender}`}
              style={{
                alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                padding: "0.75rem 1rem",
                borderRadius: message.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                backgroundColor: message.sender === "user" ? "#34D399" : "#f0f0f0",
                color: message.sender === "user" ? "white" : "black",
              }}
            >
              <div>{message.text}</div>
              <div
                style={{
                  fontSize: "0.7rem",
                  opacity: 0.7,
                  marginTop: "0.25rem",
                  textAlign: message.sender === "user" ? "right" : "left",
                }}
              >
                {formatTime(message.timestamp)}
              </div>

              {/* Display recommended products if available */}
              {message.data?.type === "products" && (
                <div
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.5rem",
                    borderRadius: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {ecoProducts[message.data.category].map((product, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "0.5rem",
                        marginBottom: "0.25rem",
                        borderRadius: "6px",
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{product.name}</div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{product.brand}</span>
                        <span style={{ color: message.sender === "user" ? "white" : "#34D399" }}>
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            padding: "0.75rem",
            borderTop: "1px solid #eee",
            backgroundColor: "#f9f9f9",
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about eco-friendly products..."
            ref={inputRef}
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "20px",
              border: "1px solid #ddd",
              outline: "none",
              marginRight: "0.5rem",
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "#34D399",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </motion.div>
    )}
    </AnimatePresence>
  </div>
);
}

export default Home;