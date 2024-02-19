import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

import "./LoginSignup.css";
import userIcon from "../../Components/Images/user.png";
import emailIcon from "../../Components/Images/email.png";
import passwordIcon from "../../Components/Images/password.png";

import { request, setAuthToken, getAuthToken } from '../api/axios_helper'

const CustomInput = ({ type, placeholder, value, onChange, error, errorMessage, icon, }) => (
  <div className={`input ${error ? "error" : ""}`}>
    <img src={icon} alt="" />
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} />
    {error && <span className="error-span">{errorMessage}</span>}
  </div>
);

const LoginSignup = ({ setIsLoggedIn }) => {

  const [action, setAction] = useState("Sign Up");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const isEmailValid = () => emailRegex.test(email);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
  
    if (jwtToken) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  
  const handleValidationErrors = () => {
    setFirstNameError(!firstName);
    setLastNameError(!lastName);
    setEmailError(!isEmailValid());
    setPasswordError(!password);
  };

  const handleSignup = async () => {
    setEmailTouched(true);
  
    if (!firstName || !lastName || !email || !password || !isEmailValid()) {
      handleValidationErrors();
      return;
    }
  
    try {
      const response = await request("POST", "/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
  
      if (response.status === 200) {
        console.log("Signup successful");
  
        // Assuming the server returns the JWT token upon signup, set the JWT token in a cookie with a 30-minute expiration (adjust the time as needed)
        Cookies.set("jwtToken", response.data.token, { expires: 1 / 48 }); // 30min
  
        setAction("Login");
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  };
  
  const handleSignin = async () => {
    setEmailTouched(true);
  
    if (!email || !password || !isEmailValid()) {
      setEmailError(!isEmailValid());
      setPasswordError(!password);
      return;
    }
  
    try {
      const response = await request("POST", "/auth/signin", {
        email,
        password,
      });
  
      if (response.status === 200) {
        console.log("Signin successful");
        // Store the JWT token in a cookie named "jwtToken"
        Cookies.set("jwtToken", response.data.token, { expires: 1 / 48 }); // 1/48 of a day is approximately 30 minutes
        setIsLoggedIn(true);
        navigate("/");
      } else {
        console.error("Signin failed");
        setLoginError(true);
        setEmailError(false);
        setPasswordError(true);
        setEmailTouched(true);
  
        if (response.data && response.data.error) {
          console.error("Error from server:", response.data.error);
          setLoginErrorMessage(response.data.error);
        }
      }
    } catch (error) {
      console.error("Error during signin:", error.message);
      setLoginError(true);
    }
  };

  // const handleSignup = async () => {
  //   setEmailTouched(true);
  
  //   if (!firstName || !lastName || !email || !password || !isEmailValid()) {
  //     handleValidationErrors();
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("http://localhost:9090/api/auth/signup", { firstName, lastName, email, password, });
  
  //     if (response.status === 200) {
  //       console.log("Signup successful");
        
  //       // Assuming the server returns the JWT token upon signup, set the JWT token in a cookie with a 30-minute expiration (adjust the time as needed)
  //       Cookies.set("jwtToken", response.data.token, { expires: 1 / 48 }); // 30min
  
  //       setAction("Login");
  //     } else {
  //       console.error("Signup failed");
  //     }
  //   } catch (error) {
  //     console.error("Error during signup:", error.message);
  //   }
  // };

  // const handleSignin = async () => {
  //   setEmailTouched(true);
  
  //   if (!email || !password || !isEmailValid()) {
  //     setEmailError(!isEmailValid());
  //     setPasswordError(!password);
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post("http://localhost:9090/api/auth/signin", {email, password,});
  
  //     if (response.status === 200) {
  //       console.log("Signin successful");
  //       // Store the JWT token in a cookie named "jwtToken"
  //       Cookies.set("jwtToken", response.data.token, { expires: 1 / 48 }); // 1/48 of a day is approximately 30 minutes
  //       setIsLoggedIn(true);
  //       navigate("/");
  //     } else {
  //       console.error("Signin failed");
  //       setLoginError(true);
  //       setEmailError(false);
  //       setPasswordError(true);
  //       setEmailTouched(true);
  
  //       if (response.data && response.data.error) {
  //         console.error("Error from server:", response.data.error);
  //         setLoginErrorMessage(response.data.error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error during signin:", error.message);
  //     setLoginError(true);
  //   }
  // };

  const handleActionChange = (newAction) => {
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setLoginError(false);
    setLoginErrorMessage("");
    setAction(newAction);

    // Reset passwordError when switching from "Sign Up" to "Login"
    if (newAction === "Login") {
      setPasswordError(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? (
          <></>
        ) : (
          <div className="name-inputs">
            <CustomInput
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(false);
              }}
              error={firstNameError}
              errorMessage="First Name cannot be empty"
              icon={userIcon}
            />
            <CustomInput
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setLastNameError(false);
              }}
              error={lastNameError}
              errorMessage="Last Name cannot be empty"
              icon={userIcon}
            />
          </div>
        )}

        <CustomInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(!isEmailValid() && emailTouched);
          }}
          error={emailError && emailTouched}
          errorMessage="Enter a valid email address"
          icon={emailIcon}
        />
        <CustomInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(false);
            setLoginError(false);
          }}
          error={passwordError || loginError}
          errorMessage={
            loginErrorMessage || "Password cannot be empty or is incorrect"
          }
          icon={passwordIcon}
        />
      </div>

      {action === "Sign Up" ? (
        <></>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() =>
            action === "Sign Up"
              ? handleSignup()
              : handleActionChange("Sign Up")
          }
        >
          {action === "Sign Up" ? "Confirm" : "Sign Up"}
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() =>
            action === "Login" ? handleSignin() : handleActionChange("Login")
          }
        >
          {action === "Login" ? "Confirm" : "Login"}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
