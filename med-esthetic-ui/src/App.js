import "./App.css"
import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./Components/NavBar/NavBar"
import Home from "./Pages/Home/Home"
import Services from "./Pages/ServiceWindow/Services"
import Reviews from "./Pages/Reviews/Reviews"
import Appointment from "./Pages/Appointment/Appointment"
import LoginSignup from "./Pages/LoginSignup/LoginSignup"
import Footer from "./Components/Footer/Footer"
import UserProfile from "./Pages/User/UserProfile"
import Admin from "./Pages/Admin/Admin"
import Calendar from "./Pages/Calendar/Calendar"
import RequestPasswordReset from "./Pages/LoginSignup/Password/RequestPasswordReset"
import ResetPassword from "./Pages/LoginSignup/Password/ResetPassword"
import { request } from "./Pages/api/axios_helper"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await request("GET", "/auth/check-session")
        if (response.data.isAuthenticated) {
          console.log("Session check response:", response.data)
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        console.error("Session check failed:", error)
        setIsLoggedIn(false)
      }
    }

    checkAuthentication()
  }, [])

  return (
      <div className="App">
        <BrowserRouter>
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/appointment" element={<Appointment />} />

            {/* My Profile */}
            <Route path="/user/:activepage" element={<UserProfile />} />
            <Route path="/admin/:activepage" element={<Admin />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route
                path="/login"
                element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/request-password-reset" element={<RequestPasswordReset />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  )
}

export default App
