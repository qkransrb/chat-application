import React, { useState } from "react";
import "./Auth.scss";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import RegisterImage from "../../assets/images/register.svg";
import { register } from "../../store/actions/auth";

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      register({ firstName, lastName, email, gender, password }, history)
    );
  };

  return (
    <div id="auth-container">
      <div id="auth-card">
        <div className="card-shadow">
          <div id="image-section">
            <img src={RegisterImage} alt="register" />
          </div>

          <div id="form-section">
            <h2>Create an account</h2>
            <form onSubmit={submitHandler}>
              <div className="input-field mb-1">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                />
              </div>
              <div className="input-field mb-1">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                />
              </div>
              <div className="input-field mb-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-field mb-1">
                <select
                  defaultValue={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input-field mb-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account? <Link to="login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
