import { useParams } from "react-router-dom";
import {medicine} from '../../../Data/medicines'
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
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log(productId);
    const findProduct = medicine.find(prod => prod.productId === productId);
    console.log("Found product:", findProduct);
    if (findProduct) {
      setProduct(findProduct);
      setImage(images[Math.floor(Math.random() * images.length)]);
    }
    else{console.error("Product not found!");}
  }, [productId]);

  if (!product) return <div>Loading...</div>;
  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div style={{
      maxWidth: "1100px",
      margin: "20px auto",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
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
          <h1 style={{ marginBottom: "10px", fontSize:"30px", fontWeight:600 ,marginLeft:"10px" }}>{product.name}</h1>
          <p style={{ 
            fontSize: "24px", 
            color: "#007BFF",
            marginBottom: "20px",
            marginLeft:"10px" 
          }}>
            ${product.price}
          </p>
          <p style={{marginLeft:"10px" }}><strong>Strength:</strong> {product.strength}</p>
          <p style={{marginLeft:"10px" }}><strong>Category:</strong> {product.category}</p>
          
          <div style={{ margin: "30px 0",marginLeft:"20px" }}>
            <h3><strong>Description:</strong></h3>
            <p>{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div style={{
            margin: "20px 0",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginLeft:"20px"
          }}>
            <button
              onClick={decreaseQty}
              style={{
                width: "35px",
                height: "35px",
                fontSize: "20px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "rgb(88, 96, 99)",
                cursor: "pointer",
                color:"white"
              }}
            >−</button>
            <span style={{ fontSize: "20px", minWidth: "30px", textAlign: "center" }}>{quantity}</span>
            <button
              onClick={increaseQty}
              style={{
                width: "35px",
                height: "35px",
                fontSize: "20px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: "rgb(88, 96, 99)",
                cursor: "pointer",
                color:"white"
              }}
            >+</button>
          </div>
          <button style={{
            padding: "12px 24px",
            backgroundColor: "#06202B",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
          onClick={() => alert(`Successfully added ${quantity} of ${product.name} to Cart`)}>
           Add to Cart
          </button>
          <button style={{
            padding: "12px 24px",
            backgroundColor: "#06202B",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
             marginLeft: "20px",
          }}
          onClick={() => alert(`Successfully Order placed of ${product.name}`)}>
           Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}