import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaInfoCircle,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { UserDetails } from "./UserDeatils";
import { useContext } from "react";
import { LogInContext } from "./Context/UserContext";

export function Navbar({ SearchValue, openLoginPopup }) {
  const [searchText, setSearchText] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);

  const navigate = useNavigate();
  const { isLogIn, setisLogIn, userFullName } = useContext(LogInContext);
  const firstLetter = userFullName ? userFullName.charAt(0).toUpperCase() : "U";

  // Check localStorage for login status on component mount
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLogIn");
    if (savedLoginStatus === "true") {
      setisLogIn(true);
    }
  }, []);

  // Update localStorage when isLogIn changes
  useEffect(() => {
    localStorage.setItem("isLogIn", isLogIn);
  }, [isLogIn]);

  function handleLogout() {
    localStorage.setItem("isLogIn", "false");
    setisLogIn(false);
    setShowUserDetails(false);
  }

  const getRandomColor = () => {
    const colors = ["#007bff", "#28a745", "#dc3545", "#17a2b8", "#ffc107"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <nav>
      <h2 id="title" onClick={() => navigate("/")}>
        PharmaCart
      </h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Medicines..."
          className="searchField"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            SearchValue(e.target.value);
          }}
        />
        {searchText ? (
          <FaTimes
            className="crossIcon"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSearchText("");
              SearchValue("");
            }}
          />
        ) : (
          <FaSearch className="search-icon" />
        )}
      </div>

      <div className="about-wrapper">
        <FaInfoCircle
          style={{ marginRight: "50px", fontSize: "27px", cursor: "pointer" }}
          className="about"
          onClick={() => navigate("/about")}
        />
        <span className="about-text">About</span>
      </div>

      <div className="group">
        <div className="cart-wrapper">
          <FaShoppingCart
            style={{ fontSize: "30px", cursor: "pointer" }}
            className="cart"
            onClick={() => {
              if (isLogIn) {
                navigate("/cart");
              } else {
                openLoginPopup(); // Show login popup from props
              }
            }}
          />

          <span className="cart-text">Cart</span>
        </div>
        {isLogIn ? (
          //when the person is logIn
          <div className="user-wrapper relative">
            <div
              className="avatar"
              onClick={() => setShowUserDetails(!showUserDetails)}
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                backgroundColor: getRandomColor(),
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {firstLetter}
            </div>
            {showUserDetails && (
              <div className="absolute right-0 top-10 mt-2">
                <UserDetails setShowUserDetails={setShowUserDetails} />
              </div>
            )}
            <span className="login-text">Profile</span>
          </div>
        ) : (
          //when the person is not logIn
          <div className="user-wrapper">
            <FaUserCircle
              style={{ fontSize: "27px", cursor: "pointer" }}
              onClick={openLoginPopup} // Trigger login popup
            />
            <span className="login-text">Log-In</span>
          </div>
        )}
      </div>
    </nav>
  );
}
