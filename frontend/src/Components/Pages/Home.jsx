import React, { useEffect, useState } from "react";
import { Categories } from "../Categories";
import { useNavigate } from "react-router-dom";
import { Login } from "./LogIn"

export function Home({ searchText }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

   const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data)
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchText.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, products, searchText]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (productId) => {
    console.log("Navigating to product:", productId);
    navigate(`/products/${productId}`);
  };
  const handleCloseLogin = () => {
    setShowLogin(false);
  };
  return (
    <>
      <Categories
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
      />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3 style={{ color: "#888" }}>No products found</h3>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => handleProductClick(prod._id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                }}
              >
                <img
                  src={prod.image}
                  style={{
                    width: "80%",
                    borderRadius: "12px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                  alt={prod.name}
                />
                <h3
                  style={{
                    marginTop: "6px",
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "18px",
                  }}
                >
                  {prod.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#666",
                    fontWeight: 600,
                  }}
                >
                  {prod.description}
                </p>
                <p
                  style={{
                    color: "#007BFF",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Rs.{prod.price}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Strength:</strong> {prod.strength}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {showLogin && (
        <div
          className="login-popup-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="login-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Login />
          </div>
        </div>
      )}
    </>
  );
}
