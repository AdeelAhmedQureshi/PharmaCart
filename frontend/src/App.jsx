import { Navbar } from "./Components/Navbar";
import { Login } from "./Components/Pages/LogIn";
import { SignUp } from "./Components/Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./Components/Footer";
import { useState } from "react";
import { Home } from "./Components/Pages/Home";
import { SingleProduct } from "./Components/Pages/SingleProduct";
import { About } from "./Components/Pages/About";
import { LogInProvider } from "./Components/Context/UserContext";
import CheckoutComponent from "./Components/Pages/Checkout";
import React from "react";
import Dashboard from "./Components/Pages/Dashboard";
import AddProduct from "./Components/Pages/AddProduct";
import DeleteProduct from "./Components/DeleteProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Cart from "./Components/Pages/Cart";

function App() {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  function handleSearch(value) {
    setSearchText(value);
  }

  return (
    <LogInProvider>
      <BrowserRouter>
        <Navbar
          SearchValue={handleSearch}
          openLoginPopup={() => setShowLogin(true)}
        />
        <Routes>
          <Route path="/" element={<Home searchText={searchText} />} />
          <Route path="/products/:productId" element={<SingleProduct />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/deleteproduct" element={<DeleteProduct />} />
          <Route path="/updateproduct" element={<UpdateProduct />} />
          <Route path="/about" element={<About />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<CheckoutComponent />}></Route>
        </Routes>
        {showLogin && (
          <div
            className="login-popup-overlay"
            onClick={() => setShowLogin(false)}
          >
            <div
              className="login-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <Login
                onLoginSuccess={() => setShowLogin(false)}
                onSwitchToSignUp={() => {
                  setShowLogin(false);
                  setShowSignUp(true);
                }}
              />
              {/* <Login
                onLoginSuccess={() => setShowLogin(false)}
                onSwitchToSignUp={() => {
                  setShowLogin(false);
                  setShowSignUp(true);
                }}
              /> */}
            </div>
          </div>
        )}
        {showSignUp && (
          <div
            className="login-popup-overlay"
            onClick={() => setShowSignUp(false)}
          >
            <div
              className="login-popup-content"
              onClick={(e) => e.stopPropagation()}
            >
              <SignUp
                onSignupSuccess={() => setShowSignUp(false)}
                // onCloseSignUp={() => setShowSignUp(false)}
              />
            </div>
          </div>
        )}
        <Footer />
      </BrowserRouter>
    </LogInProvider>
  );
}

export default App;
