import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Login } from "../Components/Pages/LogIn";
import { SignUp } from "../Components/Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "../Components/Footer";
import React, { useState } from "react";
import { Home } from "../Components/Pages/Home";
import { SingleProduct } from "../Components/Pages/SingleProduct";
import Dashboard from "../Components/Pages/Dashboard";
import AddProduct from "../Components/Pages/AddProduct";
import DeleteProduct from "../Components/DeleteProduct";
import UpdateProduct from "../Components/UpdateProduct";
import { About } from "../Components/Pages/About";
import Cart from "../Components/Pages/Cart";
import { LogInProvider } from "../Components/Context/UserContext";

function App() {
  const [searchText, setSearchText] = useState("");
  const [showLogin, setShowLogin] = useState(false);


  function handleSearch(value) {
    setSearchText(value);
  }

  return (
    <LogInProvider>
    <BrowserRouter>
      <Navbar SearchValue={handleSearch} openLoginPopup={() => setShowLogin(true)} />
      <Routes>
        <Route path="/" element={<Home searchText={searchText} />} />
        <Route path="/products/:productId" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/deleteproduct" element={<DeleteProduct />} />
        <Route path="/updateproduct" element={<UpdateProduct />} />
        <Route path="/about" element={<About/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      </Routes>
      {showLogin && (
        <div className="login-popup-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-popup-content" onClick={(e) => e.stopPropagation()}>
            <Login />
          </div>
        </div>
      )}
      <Footer />
    </BrowserRouter>
    </LogInProvider>
  );
}

export default App;
