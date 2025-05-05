import { useState } from "react";
import { FaTimes } from "react-icons/fa"; // Font Awesome
import "./SignUp.css";
export function SignUp({ onSignUpSuccess }) {
  const [data, setData] = useState({
    fullname: "",
    gender: "female",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    password2:""
  });
  const [errors, setErrors] = useState({
    fullname: "",
    gender: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
    password2:""
  });
  const [popup, setpopup] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== "");
    const hasEmptyFields = Object.values(data).some((val) => val.trim() === "");
    console.log(data.gender)

    if (hasErrors || hasEmptyFields) {
      alert("Please fill all required fields correctly.");
      return;
    }
    fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Something went wrong");
          });
        }
        return res.json();
      })
      .then((response) => {
        console.log("Success:", response);
        if (onSignUpSuccess) onSignUpSuccess(); 
        setpopup(true)

      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
      if (onSignUpSuccess) onSignUpSuccess();
    setpopup(true);
  }
  function handleChange(e) {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateInp(e.target.name, e.target.value);
  }
  function validateInp(name, value) {
    var valid = true;
    if (name === "fullname") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*FullName is Required",
        }));
      } else if (value.length < 3) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*FullName must be 3 Characters long",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else if (name === "email") {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Email is Required",
        }));
      } else if (!re.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Invalid Email",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else if (name === "phoneNumber") {
      const re = /^03\d{9}$/;
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*phoneNumber is Required",
        }));
      } else if (!re.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Invalid PhoneNumber",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else if (name === "address") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Address is Required",
        }));
      } else if (value.length < 10) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Incomplete Address",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    } else if (name === "password") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Password is Required",
        }));
      } else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Password must be at least 8 charcters",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
    else if (name === "password2") {
      if (!value) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Confirm Your Password",
        }));
      }else if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Password must be at least 8 charcters",
        }));
      } 
       else if (value !== data.password) {
        setErrors((prev) => ({
          ...prev,
          [name]: "*Password must be same",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  }
  return (
    <>
      <form id="signInForm" onSubmit={handleSubmit}>
        <h3 className="SigUpTittle">Create Account</h3>
        <input
          type="text"
          placeholder="FullName"
          className="inputs"
          name="fullname"
          onChange={handleChange}
        />
        {errors.fullname && <p>{errors.fullname}</p>}
        <select name="gender" className="inputs" onChange={handleChange} value={data.gender}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="PhoneNumber"
          className="inputs"
          onChange={handleChange}
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        <textarea
          type="address"
          name="address"
          placeholder="Full Address"
          className="inputs"
          onChange={handleChange}
        />
        {errors.address && <p>{errors.address}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="inputs"
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="inputs"
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="inputs"
          onChange={handleChange}
        />
        {errors.password2 && <p>{errors.password2}</p>}
        <button className="btn">Sign-Up</button>
      </form>
      {popup && (
        <div className="popup">
          <FaTimes
            style={{ color: "red", fontSize: "24px" }}
            className="cross-icon"
            onClick={() => {
              setpopup(false);
              if (onSignUpSuccess) onSignUpSuccess(); // ✅ Close signup popup too
            }}
          />
          <h3 className="popup-text">
             Registration Successful!
          </h3>
          <img src="../assets/check.jpeg" alt="" />
        </div>
      )}
    </>
  );
}
