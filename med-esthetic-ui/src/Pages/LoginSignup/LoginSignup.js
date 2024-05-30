import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginSignup.css";
import AuthForm from "../hooks/AuthForm";
import { request } from "../api/axios_helper";
import { useAuthFormState } from "../hooks/useAuthFormState";
import { useAuthFormErrors } from "../hooks/useAuthFormErrors";

const LoginSignup = ({ setIsLoggedIn }) => {
    const [action, setAction] = useState("Sign Up");
    const [state, handleChange] = useAuthFormState();
    const {signupErrors, setSignupErrors, resetSignupErrors, loginErrors, setLoginErrors, resetLoginErrors} = useAuthFormErrors();
    const [banReason, setBanReason] = useState(null);
    const navigate = useNavigate();

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
        if (!validateSignupForm()) return;

        try {
            const response = await request("POST", "/auth/signup", {
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password,
            });

            if (response.status === 200) {
                console.log("Signup successful");
                setAction("Login");
                resetSignupErrors();
            } else {
                console.error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error.message);
        }
    };

    const handleSignin = async () => {
        if (!validateLoginForm()) return;

        try {
            const response = await request("POST", "/auth/signin", {
                email: state.email,
                password: state.password,
            });

            if (response.status === 200) {
                console.log("Signin successful");
                const roles = response.data.roles;
                localStorage.setItem("userRoles", JSON.stringify(roles));

                setIsLoggedIn(true);
                navigate("/");
                resetLoginErrors();
            } else if (response.status === 403) {
                setBanReason(response.data);
            } else {
                console.error("Signin failed");
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                setBanReason(error.response.data);
            } else {
                console.error("Error during signin:", error.message);
            }
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

            {banReason && (
                <div className="ban-message">
                    <p>{banReason}</p>
                </div>
            )}

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
            {action === "Login" && (
                <div className="password-reset-link">
                    <Link className='stylenone' to="/request-password-reset">Forgot Password?</Link>
                </div>
            )}
        </div>
    );
};

export default LoginSignup;
