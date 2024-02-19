import React, { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import "./NavBar.css";
import logo from "../Images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const NavBar = ({ isLoggedIn, setIsLoggedIn, isAdmin  }) => {
  const [menu, setMenu] = useState("");
  const location = useLocation();
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenu("");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="MedEsthetic Logo" />
        <p>MedEsthetic</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("home")}>
          <Link className='stylenone' to="/">HOME</Link>{" "}
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("services")}>
          <Link className='stylenone' to="/services">SERVICES</Link>{" "}
          {menu === "services" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("reviews")}>
          <Link className='stylenone' to="/reviews">REVIEWS</Link>{" "}
          {menu === "reviews" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("appointment")}>
          <Link className='stylenone' to="/appointment">APPOINTMENT</Link>{" "}
          {menu === "appointment" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login">
        {isLoggedIn && location.pathname !== "/login" ? (
          <div className="user-dropdown">
            <button onClick={() => setMenu("userOptions")}>
              <AccountCircleIcon style={{ width: "80px", height: "32px" }} />
            </button>
            {menu === "userOptions" && (
              <div className="user-options">
                <Link className="options" to="/user/accountsettings">My Profile</Link>
                <Link className="options" to="/user/changepassword">Settings</Link>
                <Link className="options" to="/user/appointments">Appointments</Link>
                {isAdmin && (
                  <Link className="options" to="/admin"> Admin </Link>
                )} 
                <Link className="options" onClick={handleLogout} >Log out</Link>
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
