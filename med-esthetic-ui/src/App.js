import "./App.css"
import NavBar from "./Components/NavBar/NavBar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Services from "./Pages/ServiceWindow/Services"
import Reviews from "./Pages/Reviews/Reviews"
import Appointment from "./Pages/Appointment/Appointment"
import LoginSignup from "./Pages/LoginSignup/LoginSignup"
import Footer from "./Components/Footer/Footer"
import React, { useState } from "react"
import UserProfile from './Pages/User/UserProfile'
import Admin from "./Components/Admin"

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/appointment" element={<Appointment />} />
          
          {/* My Profile */}
          <Route path='/user/:activepage' element={<UserProfile />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/login"
            element={<LoginSignup setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
