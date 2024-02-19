import React from "react"
import "./Home.css"
import AuthContent from "../../Components/AuthContent"

const Home = () => {
  return (
    <div className="start">
      <h2>Home</h2>
      <p>Welcome to our Home page!</p>
      <div>
        <AuthContent/>
      </div>
    </div>
  )
}

export default Home
