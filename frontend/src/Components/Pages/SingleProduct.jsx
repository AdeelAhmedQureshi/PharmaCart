import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LogInContext } from "../Context/UserContext";
export function SingleProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const {userEmail}=useContext(LogInContext).userEmail;

  const fetchProduct = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      const findProduct = data.find((prod) => prod._id === productId); // use _id or productId based on your DB
      console.log("Found product:", findProduct);
      if (findProduct) {
        setProduct(findProduct);
      } else {
        console.error("Product not found!");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <div>Loading...</div>;

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    const userId = userEmail;
  
    try {
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          productId: product._id,
          quantity,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error adding product to cart");
      }
  
      const cartData = await response.json();
      alert(`Successfully added ${quantity} of ${product.name} to Cart`);
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Error adding product to cart.");
    }
  };
  

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "10px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexDirection: window.innerWidth > 768 ? "row" : "column",
        }}
      >
        <div style={{ flex: 1 }}>
          <img
            src={product.image}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
            alt={product.name}
          />
        </div>
        <div style={{ flex: 2 }}>
          <h1
            style={{
              marginBottom: "10px",
              fontSize: "30px",
              fontWeight: 600,
              marginLeft: "10px",
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: "#007BFF",
              marginBottom: "20px",
              marginLeft: "10px",
            }}
          >
            Rs.{product.price}
          </p>
          <p style={{ marginLeft: "10px" }}>
            <strong>Strength:</strong> {product.strength}
          </p>
          <p style={{ marginLeft: "10px" }}>
            <strong>Category:</strong> {product.category}
          </p>

          <div style={{ margin: "30px 0", marginLeft: "20px" }}>
            <h3>
              <strong>Description:</strong>
            </h3>
            <p>{product.description}</p>
          </div>

          <div
            style={{
              margin: "20px 0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginLeft: "20px",
            }}
          >
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
                color: "white",
              }}
            >
              −
            </button>
            <span
              style={{
                fontSize: "20px",
                minWidth: "30px",
                textAlign: "center",
              }}
            >
              {quantity}
            </span>
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
                color: "white",
              }}
            >
              +
            </button>
          </div>
          <button
            style={{
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
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#06202B",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "20px",
            }}
            onClick={() =>
              alert(`Successfully Order placed of ${product.name}`)
            }
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
