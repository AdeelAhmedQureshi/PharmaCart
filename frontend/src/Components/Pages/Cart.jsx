import React, { useEffect, useState, useContext } from "react";
import "./Cart.css";
import { LogInContext } from "../Context/UserContext";
import { CheckoutComponent } from "./Checkout";
const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userEmail,userFullName,userAddress,userPhoneNumber } = useContext(LogInContext);
  const [showCheckout, setShowCheckout] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/${userEmail}`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, delta) => {
    const item = cart.items.find((i) => i.productId._id === productId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail,
          productId,
          quantity: delta,
        }),
      });

      if (res.ok) {
        fetchCart();
      } else {
        const errData = await res.json();
        console.error("Error updating quantity:", errData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/cart/${userEmail}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        fetchCart();
      } else {
        const errData = await res.json();
        console.error("Error removing item:", errData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchCart();
    }
  }, [userEmail]);

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart 🛒</h2>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.productId._id}>
            <div className="item-details">
              <h3>{item.productId.name}</h3>
              <p>Brand: {item.productId.brand}</p>
              <p>Price: Rs. {item.productId.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => updateQuantity(item.productId._id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId._id, 1)}>
                +
              </button>
              <button
                onClick={() => removeItem(item.productId._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>
          Subtotal: <strong>Rs. {subtotal}</strong>
        </p>
        <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
          Proceed to Checkout
        </button>
      </div>
   {/* Checkout Popup Modal */}
     {showCheckout && (
  <div className="checkout-popup-overlay">
    <div className="checkout-popup-content">
      <span className="checkout-popup-close" onClick={() => setShowCheckout(false)}>
        &times;
      </span>
      <CheckoutComponent
        userData={{
          fullName: userFullName,
          email: userEmail,
          address: userAddress,
          phoneNumber: userPhoneNumber,
        }}
        handleClose={() => setShowCheckout(false)}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default Cart;