// import React, { useEffect, useState } from "react";
// import "./Cart.css";
// import { LogInContext } from "../Context/UserContext";
// import { useContext } from "react";
// //const userId = "YOUR_USER_ID"; // Replace with actual user ID (from context/auth)

// const Cart = () => {
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { userId } = useContext(LogInContext);
//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//       setCart(res.data);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = async (productId, delta) => {
//     const item = cart.items.find(i => i.productId._id === productId);
//     if (!item) return;
//     const newQuantity = item.quantity + delta;
//     if (newQuantity < 1) return;

//     await axios.post("http://localhost:5000/api/cart/add", {
//       userId,
//       productId,
//       quantity: delta
//     });

//     fetchCart();
//   };

//   const removeItem = async (productId) => {
//     await axios.delete(`http://localhost:5000/api/cart/${userId}/${productId}`);
//     fetchCart();
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   if (loading) return <p>Loading cart...</p>;
//   if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

//   const subtotal = cart.items.reduce(
//     (sum, item) => sum + item.productId.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-container">
//       <h2>Your Cart 🛒</h2>
//       <div className="cart-items">
//         {cart.items.map(item => (
//           <div className="cart-item" key={item.productId._id}>
//             <div className="item-details">
//               <h3>{item.productId.name}</h3>
//               <p>Brand: {item.productId.brand}</p>
//               <p>Price: Rs. {item.productId.price}</p>
//             </div>
//             <div className="item-quantity">
//               <button onClick={() => updateQuantity(item.productId._id, -1)}>-</button>
//               <span>{item.quantity}</span>
//               <button onClick={() => updateQuantity(item.productId._id, 1)}>+</button>
//               <button onClick={() => removeItem(item.productId._id)} style={{ marginLeft: "10px", color: "red" }}>
//                 ❌
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="cart-summary">
//         <p>Subtotal: <strong>Rs. {subtotal}</strong></p>
//         <button className="checkout-btn">Proceed to Checkout</button>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useState } from "react";
import "./Cart.css";
import { CheckoutComponent } from "./Checkout";
const initialItems = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 50,
    quantity: 2,
    brand: "MediHeal",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    price: 120,
    quantity: 1,
    brand: "PharmaPlus",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialItems);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (id, delta) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const handleCheckoutClick = () => {
    setShowCheckout(true); 
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false); 
  };

  return (
    <div className="cart-container">
      <h2> Cart Summary 🛒</h2>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="item-details">
              <h3>{item.name}</h3>
              {/* description here */}
              <p>Price: ${item.price}</p>
            </div>
            <div className="item-quantity">
              <button onClick={() => handleQuantityChange(item.id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item.id, 1)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p>
          Subtotal: <strong> ${subtotal}</strong>
        </p>
        <button className="checkout-btn" onClick={handleCheckoutClick}>
          Proceed to Checkout
        </button>
      </div>
      {showCheckout && (
        <div className="checkout-modal-overlay" onClick={handleCloseCheckout}>
          <div
            className="checkout-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <CheckoutComponent handleClose={handleCloseCheckout} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
