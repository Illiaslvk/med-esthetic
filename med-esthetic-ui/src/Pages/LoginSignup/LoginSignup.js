import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import AuthForm from "../hooks/AuthForm";
import { request } from "../api/axios_helper";
import { useAuthFormState } from "../hooks/useAuthFormState"; 
import {  useAuthFormErrors } from "../hooks/useAuthFormErros";

const LoginSignup = ({ setIsLoggedIn }) => {
  const [action, setAction] = useState("Sign Up")
  const [state, handleChange] = useAuthFormState()
  const [signupErrors, setSignupErrors, resetSignupErrors, loginErrors, setLoginErrors, resetLoginErrors] = useAuthFormErrors();

  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async () => {
        try {
            const response = await request("GET", "/auth/check-session");
            if (response.data.isAuthenticated) {
                console.log("Session check response:", response.data);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Session check failed:", error);
            setIsLoggedIn(false);
        }
    };

    checkAuthentication();
}, [setIsLoggedIn]);


  const validateSignupForm = () => {
    const { firstName, lastName, email, password } = state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {
      firstNameError: !firstName,
      lastNameError: !lastName,
      emailError: !email || !emailRegex.test(email),
      passwordError: !password,
    };
    setSignupErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const validateLoginForm = () => {
    const { email, password } = state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {
      emailError: !email || !emailRegex.test(email),
      passwordError: !password,
    };
    setLoginErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSignup = async () => {
    // Using state and errors from the custom hook
    if (!validateSignupForm()) return

    try {
      // Send a request to sign up
      const response = await request("POST", "/auth/signup", {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
    });

      if (response.status === 200) {
        console.log("Signup successful")
        setAction("Login");
        resetSignupErrors();  // Reset errors when sign-up is successful
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  }

  const handleSignin = async () => {
    if (!validateLoginForm()) return;

    try {
        const response = await request("POST", "/auth/signin", {
            email: state.email,
            password: state.password,
        });

        if (response.status === 200) {
          console.log("Signin successful");
          // Store the roles returned by the backend in localStorage
          const roles = response.data.roles;
          localStorage.setItem("userRoles", JSON.stringify(roles));

          setIsLoggedIn(true);
          navigate("/");
          resetLoginErrors();
      } else {
          console.error("Signin failed");
      }
    } catch (error) {
        console.error("Error during signin:", error.message);
    }
};

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <AuthForm
        action={action}
        handleChange={handleChange}
        state={state}
        errors={action === "Sign Up" ? signupErrors : loginErrors}
      />

      <div className="submit-container">
        <button
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={
            action === "Sign Up" ? handleSignup : () => setAction("Sign Up")
          }
        >
          {action === "Sign Up" ? "Confirm" : "Sign Up"}
        </button>
        <button
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={action === "Login" ? handleSignin : () => setAction("Login")}
        >
          {action === "Login" ? "Confirm" : "Login"}
        </button>
      </div>
    </div>
  )
}

export default LoginSignup
