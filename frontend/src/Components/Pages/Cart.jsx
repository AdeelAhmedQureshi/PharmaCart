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
