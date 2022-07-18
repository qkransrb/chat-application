import React, { useState } from "react";
import "./Auth.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginImage from "../../assets/images/login.svg";
import { login } from "../../store/actions/auth";

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("1234");

  const submitHandler = async (e) => {
    e.preventDefault();
    // Dispatch Login Action
    dispatch(login({ email, password }, history));
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={LoginImage} alt="login" />
          </div>

          <div id="form-section">
            <h2>Welcome back</h2>
            <form onSubmit={submitHandler}>
              <div className="input-field mb-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="input-field mb-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
