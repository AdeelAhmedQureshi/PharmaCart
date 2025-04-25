import { Navbar } from "../Components/Navbar";
// import { Login } from "../Components/Pages/Login";
import { Login } from "../Components/Pages/LogIn";
import { SignUp } from "../Components/Pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "../Components/Footer";
import React from "react";
import { Home } from "../Components/Pages/Home";
import { SingleProduct } from "../Components/SingleProduct";
import Dashboard from "../Components/Dashboard";
import AddProduct from "../Components/AddProduct";
import DeleteProduct from "../Components/DeleteProduct";
import UpdateProduct from "../Components/UpdateProduct";

import { useState } from "react";
function App() {
  const [searchText, setSearchText] = useState("");
  function handleSearch(value) {
    setSearchText(value);
  }
  return (
    <>
      <BrowserRouter>
        <Navbar SearchValue={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchText={searchText} />}/>
          <Route path="/products/:id" element={<SingleProduct/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
          </Route>  
          <Route path="/addproduct" element={<AddProduct />}></Route>        
          <Route path="/deleteproduct" element={<DeleteProduct />}></Route>
          <Route path="/updateproduct" element={<UpdateProduct />}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
