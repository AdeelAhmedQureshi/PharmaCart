import "./Login.css";
import { FaTimes } from "react-icons/fa";
import { FaUser, FaLock } from "react-icons/fa";

export function Login() {
  return (
    <>
      <div className="container">
        <div className="pic_portion">
          <img src="../assets/pic2.png" alt="" className="bg" />
        </div>
        <div className="form_portion">
          <form>
            <h2>Log In</h2>
            <div className="input-wrapper">
            <span className="icon-inside"><FaUser /></span>
              <input
                type="text"
                name="username"
                id="username"
                className="login-input field"
                placeholder="Username"
              />
            </div>
            <div className="input-wrapper">
            <span className="icon-inside"><FaLock /></span>
            <input
              type="password"
              name="password"
              id="password"
              className="field login-input"
              placeholder="Password"
            />
          </div>
            <button className="btn">Log In</button>
          </form>
        </div>
      </div>
    </>
  );
}
