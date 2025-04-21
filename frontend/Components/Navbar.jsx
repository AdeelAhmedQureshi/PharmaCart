import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
export function Navbar() {
  function Check() {
    alert("Cart Clickrdd");
  }
  return (
    <>
      <nav>
        <h2 id="title">PharmaCart</h2>
        <input
          type="text"
          placeholder="Search Medicines"
          className="searchField"
        />
        {/* <Link to="/login">SignIn | </Link>
        <Link to="/signup"> SignUp</Link> */}
        <Link to="/login">SignIn</Link> | <Link to="/signup">SignUp</Link>

        <FaShoppingCart
          style={{ fontSize: "35px" }}
          onClick={Check}
          className="cart"
        />
      </nav>
    </>
  );
}
