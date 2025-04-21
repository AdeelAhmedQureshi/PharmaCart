import "./Navbar.css";
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
        <a href="">SignIn | </a>
        <a href=""> SignUp</a>
        <FaShoppingCart
          style={{ fontSize: "35px" }}
          onClick={Check}
          className="cart"
        />
      </nav>
    </>
  );
}
