// import React, { useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Navbar } from "../Components/Navbar";
// import { Login } from "../Components/Pages/LogIn";
// import { SignUp } from "../Components/Pages/SignUp";
// import { Footer } from "../Components/Footer";
// import { Home } from "../Components/Pages/Home";
// import { SingleProduct } from "../Components/Pages/SingleProduct";
// import { About } from "../Components/Pages/About";
// import Cart from "../Components/Pages/Cart";
// import { LogInProvider } from "../Components/Context/UserContext";
// import AccessDenied from "./Admin_Dashboard/components/AccessDenied";
// import Dashboard from "./Admin_Dashboard/pages/Dashboard";
// import AddProduct from "./Admin_Dashboard/components/AddProduct";
// import UpdateProduct from "./Admin_Dashboard/components/UpdateProduct";
// import DashboardLayout from "./Admin_Dashboard/pages/DashboardLayout";
// import ProtectedAdminRoute from "./Admin_Dashboard/routes/ProtectedAdminRoute";

// function App() {
//   const [searchText, setSearchText] = useState("");
//   const [showLogin, setShowLogin] = useState(false);

//   function handleSearch(value) {
//     setSearchText(value);
//   }

//   return (
//     <LogInProvider>
//       <BrowserRouter>
//         <Navbar SearchValue={handleSearch} openLoginPopup={() => setShowLogin(true)} />

//         <Routes>
//           <Route path="/" element={<Home searchText={searchText} />} />
//           <Route path="/products/:productId" element={<SingleProduct />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/access-denied" element={<AccessDenied />} />

//           {/* Admin Protected Routes */}
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedAdminRoute>
//                 <DashboardLayout />
//               </ProtectedAdminRoute>
//           }
//           />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedAdminRoute>
//                 <Dashboard />
//               </ProtectedAdminRoute>
//             }
//           />
//           <Route
//             path="/dashboard/addproduct"
//             element={
//               <ProtectedAdminRoute>
//                 <AddProduct />
//               </ProtectedAdminRoute>
//             }
//           />
//           <Route
//             path="/dashboard/updateproduct/:pid"
//             element={
//               <ProtectedAdminRoute>
//                 <UpdateProduct />
//               </ProtectedAdminRoute>
//             }
//           />
//         </Routes>

//         {showLogin && (
//           <div className="login-popup-overlay" onClick={() => setShowLogin(false)}>
//             <div className="login-popup-content" onClick={(e) => e.stopPropagation()}>
//               <Login />
//             </div>
//           </div>
//         )}

//         <Footer />
//       </BrowserRouter>
//     </LogInProvider>
//   );
// }

// export default App;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Login } from "./Components/Pages/LogIn";
import { SignUp } from "./Components/Pages/SignUp";
import { Footer } from "./Components/Footer";
import { Home } from "./Components/Pages/Home";
import { SingleProduct } from "./Components/Pages/SingleProduct";
import { About } from "./Components/Pages/About";
import Cart from "./Components/Pages/Cart";
import { LogInProvider } from "./Components/Context/UserContext";
import AccessDenied from "./Admin_Dashboard/components/AccessDenied";
import Dashboard from "./Admin_Dashboard/pages/Dashboard";
import AddProduct from "./Admin_Dashboard/components/AddProduct";
import UpdateProduct from "./Admin_Dashboard/components/UpdateProduct";
import DashboardLayout from "./Admin_Dashboard/pages/DashboardLayout";
import ProtectedAdminRoute from "./Admin_Dashboard/routes/ProtectedAdminRoute";
import Profile from "./Admin_Dashboard/pages/Profile";
import Customers from "./Admin_Dashboard/pages/Customers";
import Products from "./Admin_Dashboard/components/ProductsTable";
import { DashboardProvider } from "./Components/Context/DashboardContext";

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
        <DashboardProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home searchText={searchText} />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            {/* Admin Protected Routes with Sidebar Layout */}{" "}
            {/*wrapping admin dashboard with context here, */}
            <Route
              path="/dashboard"
              element={
                <ProtectedAdminRoute>
                  <DashboardLayout />
                </ProtectedAdminRoute>
              }
            >
              {/* Nested routes (these render inside DashboardLayout) */}
              <Route index element={<Dashboard />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="updateproduct/:pid" element={<UpdateProduct />} />
              <Route path="profile" element={<Profile />} />
              <Route path="customers" element={<Customers />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Routes>
        </DashboardProvider>

        {/* Login Popup */}
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
              <SignUp onSignupSuccess={() => setShowSignUp(false)} />
            </div>
          </div>
        )}
        <Footer />
      </BrowserRouter>
    </LogInProvider>
  );
}

export default App;
