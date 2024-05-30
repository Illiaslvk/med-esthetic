import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "../Images/logo.png";
import { request } from "../../Pages/api/axios_helper";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [menu, setMenu] = useState("");
    const [userDetails, setUserDetails] = useState(null);
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await request("GET", "/user/details");
                if (response.status === 200) {
                    setUserDetails(response.data);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        if (isLoggedIn) {
            fetchUserDetails();
        } else {
            setUserDetails(null);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const userRoles = JSON.parse(localStorage.getItem("userRoles"));
        setIsAdmin(userRoles?.includes("ADMIN"));
    }, [isLoggedIn]);

    const handleLogout = async () => {
        try {
            await request("POST", "/auth/logout");
            setIsLoggedIn(false);
            localStorage.removeItem("userRoles");
            setUserDetails(null);
            navigate("/login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setMobileMenuOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="MedEsthetic Logo" />
                <p>MedEsthetic</p>
            </div>

            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
            </div>

            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <li onClick={() => setMenu("home")}>
                    <Link className='stylenone' to="/">HOME</Link>{" "}{menu === "home" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("services")}>
                    <Link className='stylenone' to="/services">SERVICES</Link>{" "}{menu === "services" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("reviews")}>
                    <Link className='stylenone' to="/reviews">REVIEWS</Link>{" "}{menu === "reviews" ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu("appointment")}>
                    <Link className='stylenone' to="/appointment">APPOINTMENT</Link>{" "}{menu === "appointment" ? <hr /> : <></>}
                </li>
                {isAdmin && (
                    <li onClick={() => setMenu("admin")}>
                        <Link className='stylenone' to="/admin/admintab">Admin Panel</Link>{" "}{menu === "admin" ? <hr /> : <></>}
                    </li>
                )}
                {isLoggedIn && mobileMenuOpen && (
                    <li onClick={() => setMenu("profile")}>
                        <Link className='stylenone' to="/user/myprofile">My Profile</Link>{" "}{menu === "profile" ? <hr /> : <></>}
                    </li>
                )}
                <li className="mobile-login-item">
                    {isLoggedIn ? (
                        <div onClick={handleLogout}>Log out</div>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>


            <div className="nav-login">
                {isLoggedIn && location.pathname !== "/login" ? (
                    <div className="user-dropdown">
                        <div onClick={() => setMenu("userOptions")}>
                            <button className="userName">
                                {userDetails ? userDetails.firstName : "Loading..."}
                            </button>
                        </div>
                        {menu === "userOptions" && (
                            <div className="user-options">
                                <Link className="options" to="/user/myprofile">My Profile</Link>
                                <Link className="options" to="/calendar">Calendar</Link>
                                {isAdmin && (
                                    <Link className="options" to="/admin/admintab"> Admin </Link>
                                )}
                                <Link className="options" onClick={handleLogout}>Log out</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
