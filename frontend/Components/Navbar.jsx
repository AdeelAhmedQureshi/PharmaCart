import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

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

        <div className="about-wrapper">
          <FaInfoCircle
            style={{ marginRight: "50px", fontSize: "27px", cursor: "pointer" }}
            className="about"
            onClick={() => navigate("/about")}
          />
          <span className="about-text">About</span>
        </div>

        <div className="cart-wrapper">
          <FaShoppingCart
            style={{ fontSize: "30px" }}
            onClick={Check}
            className="cart"
          />
          <span className="cart-text">Cart</span>
        </div>

        <div className="user-wrapper">
          <FaUserCircle
            style={{ fontSize: "27px", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          />
          <span className="login-text">Log-In</span>
        </div>
      </nav>
    </>
  );
}
