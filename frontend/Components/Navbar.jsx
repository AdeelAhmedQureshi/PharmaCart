import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState } from "react";
import { User } from 'lucide-react';

export function Navbar({ SearchValue }) {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function Check() {
    alert("Cart Clicked");
  }

  return (
    <>
      <nav>
        <h2 id="title">PharmaCart</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Medicines..."
            className="searchField"
            onChange={(e) => { SearchValue(e.target.value) }}
          />
          <FaSearch className="search-icon" />
        </div>
        <div className="cart-wrapper">
          <FaShoppingCart
            style={{ fontSize: "35px" }}
            onClick={Check}
            className="cart"
          />
          <span className="cart-text">Cart</span>
        </div>
        <div className="user-wrapper">
          <User style={{ fontSize: "100px", cursor: "pointer" }} onClick={() => navigate("/login")} />
          <span className="login-text">Log-In</span>
        </div>
      </nav>
    </>
  );
}
