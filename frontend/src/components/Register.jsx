import "./styles/GeneralLP.css";
import "./styles/FormLP.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import person from "./assets/user-icon.png";
import locked from "./assets/locked-icon.png";
import unlocked from "./assets/unlocked-icon.png";
import NavigationLP from "./NavigationLP";
import { serverPath } from "../global";
import { useNavigate } from "react-router-dom";

function Register() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(0); // 0 - not tried, 1 - failed
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username: login,
      password: password,
    };

    try {
      let response = await fetch(serverPath + "/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.userId);
        navigate("/trips");
      } else {
        console.log("Błąd logowania:", response.status);
        setSuccess(1);
        localStorage.removeItem("authToken");
      }
    } catch (error) {
      console.error("Wystąpił błąd:", error);
    }
  };

  const handleUsernameChange = (event) => {
    setLogin(event.target.value);
    setSuccess(0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setSuccess(0);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavigationLP />
      <div className="login-container">
        <form onSubmit={handleSubmit} className="form">
          <p className="login">Register</p>
          <div className="inputs">
            <div className="username">
              <input
                onChange={handleUsernameChange}
                placeholder="Username"
                type="text"
              />
              <img src={person} alt="" />
            </div>
            <div className="password">
              <input
                onChange={handlePasswordChange}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
              <img
                src={showPassword ? unlocked : locked}
                alt="toggle password visibility"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="login-button register-button">
            <button type="submit">Register</button>
          </div>
          {success === 2 && (
            <div className="confirmation-message">
              <p>&#x2713;</p> {/*checkmark */}
              <span>Email sent!</span>
            </div>
          )}
          {success === 1 && (
            <div className="failed-message">
              <p>!</p>
              <span>Incorrect login or password</span>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default Register;
