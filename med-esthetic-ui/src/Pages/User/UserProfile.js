import React from "react"
import { useParams } from "react-router-dom"
import UserSidebar from "../../Components/UserProfile/UserSidebar"
import MyProfile from "../../Components/UserProfile/MyProfile"
import "./UserProfile.css"
import YourAppointments from "../../Components/UserProfile/YourAppointments"

const UserProfile = () => {
  const { activepage } = useParams()

  return (
    <div className="userprofile">
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === "myprofile" && <MyProfile />}
          {activepage === "appointments" && <YourAppointments />}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
