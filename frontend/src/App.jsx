import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { Login } from "../Components/Pages/LogIn";
import { SignUp } from "../Components/Pages/SignUp";
import { Home } from "../Components/Pages/Home";
import { SingleProduct } from "../Components/SingleProduct";
import AddProduct from "../Components/Pages/AddProduct";
import UpdateProduct from "../Components/UpdateProduct";
import Page404 from "./Admin_Dashboard/pages/Page404"; // for admin unknown routes

// Dashboard layout wrapper
import Dashboard from "../src/Admin_Dashboard/pages/Dashboard";

function App() {
  const [searchText, setSearchText] = useState("");

  function handleSearch(value) {
    setSearchText(value);
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar SearchValue={handleSearch} />
              <Routes>
                <Route path="/" element={<Home searchText={searchText} />} />
                <Route path="/products/:id" element={<SingleProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Home searchText={searchText} />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Dashboard/Admin Routes (no Navbar/Footer) */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="updateproduct" element={<UpdateProduct />} />
          <Route path="*" element={<Page404 />} />
        </Route>

        {/* Separate Route for AddProduct */}
        <Route path="/dashboard/addproduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
