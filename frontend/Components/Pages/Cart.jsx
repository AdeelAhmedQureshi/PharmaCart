// // import React, { useState, useEffect } from "react";

// // const Cart = () => {
// //     const [cartItems, setCartItems] = useState([]);

// //     // Load cart items from local storage on component mount
// //     useEffect(() => {
// //         const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
// //         setCartItems(storedCart);
// //     }, []);

// //     // Save cart items to local storage whenever they change
// //     useEffect(() => {
// //         localStorage.setItem("cart", JSON.stringify(cartItems));
// //     }, [cartItems]);

// //     // Add a product to the cart
// //     const addToCart = (product) => {
// //         const updatedCart = [...cartItems, product];
// //         setCartItems(updatedCart);
// //     };

// //     // Remove a product from the cart
// //     const removeFromCart = (productId) => {
// //         const updatedCart = cartItems.filter((item) => item.id !== productId);
// //         setCartItems(updatedCart);
// //     };

// //     return (
// //         <div style={{ padding: "20px" }}>
// //             <h1>Shopping Cart</h1>
// //             <div>
// //                 <h2>Cart Items</h2>
// //             </div>
// //             <div style={{ marginTop: "20px" }}>
// //                 <h2>Cart Items</h2>
// //                 {cartItems.length === 0 ? (
// //                     <p>Your cart is empty.</p>
// //                 ) : (
// //                     <ul>
// //                         {cartItems.map((item) => (
// //                             <li key={item.id}>
// //                                 {item.name} - ${item.price}{" "}
// //                                 <button onClick={() => removeFromCart(item.id)}>Remove</button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default Cart;

// import React, { useState, useEffect } from 'react';
// import {medicine} from '../../Data/medicines'; // Assuming you have a JSON file with product data
// import { LogInContext } from '../Context/UserContext';
// import { useContext } from 'react';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const {userEmail}=useContext(LogInContext)


//   const storageKey = `cart_${userEmail}`;

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem(storageKey)) || [];
//     setCart(storedCart);
//   }, [storageKey]);

//   // Save cart to localStorage on update
//   useEffect(() => {
//     localStorage.setItem(storageKey, JSON.stringify(cart));
//   }, [cart,storageKey]);

//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = [...cart];
//     updatedCart.splice(index, 1);
//     setCart(updatedCart);
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h2>Products</h2>
//       {products.map((product) => (
//         <div key={product.id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
//           <p>{product.name} - ${product.price}</p>
//           {/* <button onClick={() => addToCart(product)} style={{ background: 'blue', color: 'white' }}>
//             Add to Cart
//           </button> */}
//         </div>
//       ))}

//       <h2>Cart</h2>
//       {cart.length === 0 ? (
//         <p>Cart is empty.</p>
//       ) : (
//         cart.map((item, index) => (
//           <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
//             <p>{item.name} - ${item.price}</p>
//             <button onClick={() => removeFromCart(index)} style={{ background: 'red', color: 'white' }}>
//               Remove
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect, useContext } from 'react';
// import { LogInContext } from '../Context/UserContext'; // Adjust the import path as necessary
// import { useContext } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { userEmail } = useContext(LogInContext);
  const storageKey = `cart_${userEmail}`;

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(storageKey)) || [];
    setCart(storedCart);
  }, [storageKey]);

  // Save to localStorage when cart updates
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
            <p>{item.name} - ${item.price}</p>
            <button onClick={() => removeFromCart(index)} style={{ background: 'red', color: 'white' }}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
