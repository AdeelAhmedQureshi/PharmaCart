import { useParams, useNavigate } from "react-router-dom";
import { medicine } from "../Data/medicines";
import { useEffect, useState } from "react";

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

export function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const findProduct = medicine.find(prod => prod.productId === parseInt(id));
    if (findProduct) {
      setProduct(findProduct);
      setImage(images[Math.floor(Math.random() * images.length)]);
    } else {
      navigate("/"); 
    }
  }, [id, navigate]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <button 
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        ← Back to Products
      </button>

      <div style={{
        display: "flex",
        gap: "40px",
        flexDirection: window.innerWidth > 768 ? "row" : "column"
      }}>
        <div style={{ flex: 1 }}>
          <img
            src={image}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
            alt={product.name}
          />
        </div>
        <div style={{ flex: 2 }}>
          <h1 style={{ marginBottom: "10px" }}>{product.name}</h1>
          <p style={{ 
            fontSize: "24px", 
            color: "#007BFF",
            marginBottom: "20px"
          }}>
            ${product.price}
          </p>
          <p><strong>Strength:</strong> {product.strength}</p>
          <p><strong>Category:</strong> {product.category}</p>
          
          <div style={{ margin: "30px 0" }}>
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button style={{
            padding: "12px 24px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "15px"
          }}>
            Add to Cart
          </button>

          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: "12px 24px",
              backgroundColor: "#f0f0f0",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}