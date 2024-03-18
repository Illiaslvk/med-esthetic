import React from "react"
import { useParams } from "react-router-dom"
import UserSidebar from "../../Components/UserProfile/UserSidebar"
import AccountSettings from "../../Components/UserProfile/AccountSettings"
import "./UserProfile.css"
import ChangePassword from "../../Components/UserProfile/ChangePassword"
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
          {activepage === "accountsettings" && <AccountSettings />}
          {activepage === "changepassword" && <ChangePassword />}
          {activepage === "appointments" && <YourAppointments />}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
