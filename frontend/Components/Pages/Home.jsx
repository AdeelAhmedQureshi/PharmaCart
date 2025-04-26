import React, { useEffect, useState } from "react";
import { medicine } from "../../Data/medicines";
import { Categories } from "../Categories";
import { useNavigate } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1550572017-edd951aa6e72?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1576073719676-aa95576db207?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=400&fit=crop",
];

export function Home({ searchText }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const WithImages = medicine.map((prod) => ({
      ...prod,
      image: images[Math.floor(Math.random() * images.length)],
    }));
    setProducts(WithImages);
    setFilteredProducts(WithImages);
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

  return (
    <>
     <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <h3>No products found</h3>
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
                key={prod.productId}
                style={{
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleProductClick(prod.productId)}
              >
                <img
                  src={prod.image}
                  style={{
                    width: "80%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                  alt={prod.name}
                />
                <h3 style={{ marginTop: "10px", fontWeight: 500 }}>
                  {prod.name}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#555",
                  }}
                >
                  {prod.description}
                </p>
                <p>
                  <strong>Price:</strong> ${prod.price}
                </p>
                <p>
                  <strong>Strength:</strong> {prod.strength}
                </p>
                <button
                  style={{
                    marginTop: "10px",
                    padding: "8px 16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to cart logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
