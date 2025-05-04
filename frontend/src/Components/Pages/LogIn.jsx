import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogInContext } from "../Context/UserContext";
import { useContext } from "react";

export function Login({ showSuccess, onCloseSuccess  ,onSwitchToSignUp,onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    setisLogIn,
    setUserEmail,
    setUserFullName,
    setUserPhoneNumber,
    setUserAddress,
  } = useContext(LogInContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("isLogIn", "true"); // persist on refresh
      localStorage.setItem("token", data.token); // persist on refresh";
      localStorage.setItem("userFullName", data.user.fullname); // persist on refresh
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPhoneNumber", data.user.phoneNumber); // persist on refresh
      localStorage.setItem("userAddress", data.user.address); // persist on refresh
      setisLogIn(true);
      setUserEmail(email);
      setUserAddress(data.user.address); // set username in context
      setUserPhoneNumber(data.user.phoneNumber); // set username in context
      setUserFullName(data.user.fullname); // set username in context
      if (onLoginSuccess) onLoginSuccess();
      if (data.user.isAdmin) navigate("/dashboard"); // change route after login
      else navigate("/"); // change route after login
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="pic_portion">
        <img src="../assets/pic2.png" alt="" className="bg" />
      </div>
      <div className="form_portion">
        <form className="logInForm" onSubmit={handleLogin}>
          <h2>Log In</h2>
          <div className="input-wrapper">
            <span className="icon-inside">
              <FaUser />
            </span>
            <input
              type="email"
              name="email"
              className="login-input field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="icon-inside">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              className="field login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="line">
            Do not have an account?
            <span
              onClick={onSwitchToSignUp}
              style={{
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              Sign Up
            </span>
          </p>
          <button type="submit" className="btn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
