import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import UserSidebar from "../../Components/UserProfile/UserSidebar";
import MyProfile from "../../Components/UserProfile/MyProfile";
import YourAppointments from "../../Components/UserProfile/YourAppointments";
import HolidayList from "../../Components/UserProfile/HolidayList";
import ChangePassword from "../../Components/UserProfile/ChangePassword";
import { request } from "../api/axios_helper";
import "./UserProfile.css";

const UserProfile = () => {
  const { activepage } = useParams();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await request("GET", "/roles");
        if (response && response.status === 200) {
          setUserRole(response.data.role);
        } else {
          console.error("Failed to fetch user role");
        }
      } catch (error) {
        console.error("Error fetching user role:", error.message);
      }
    };

    fetchUserRole();
  }, []);

  return (
      <div className="userprofile">
        <div className="userprofilein">
          <div className="left">
            <UserSidebar activepage={activepage} userRole={userRole} />
          </div>
          <div className="right">
            {activepage === "myprofile" && <MyProfile />}
            {activepage === "appointments" && <YourAppointments userRole={userRole}/>}
            {(activepage === "holidays" && (userRole === "EMPLOYEE" || userRole === "ADMIN")) && <HolidayList />}
            {activepage === "changepassword" && <ChangePassword />}
          </div>
        </div>
      </div>
  );
};

export default UserProfile;
