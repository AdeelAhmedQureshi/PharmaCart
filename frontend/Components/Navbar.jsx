import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FaShoppingCart ,FaSearch  } from "react-icons/fa";
import { useState } from "react";
export function Navbar({SearchValue}) {
  const [searchText, setSearchText] = useState("");
  function Check() {
    alert("Cart Clickrdd");
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
            onChange={(e)=>{SearchValue(e.target.value)}}
          />
          <FaSearch className="search-icon" />
        </div>
        <Link to="/login"> SignIn | </Link> <Link to="/signup"> SignUp</Link>

        <FaShoppingCart
          style={{ fontSize: "35px" }}
          onClick={Check}
          className="cart"
        />
      </nav>
    </>
  );
}
