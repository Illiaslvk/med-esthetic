import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, Button } from "@mui/material";
import { request } from "../api/axios_helper";
import "./Calendar.css";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [showAllAppointments, setShowAllAppointments] = useState(false);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        fetchUserRole();
    }, []);

    useEffect(() => {
        console.log("UserRole or showAllAppointments changed:", userRole, showAllAppointments);
        if (userRole === "EMPLOYEE" || userRole === "ADMIN" || userRole === "USER") {
            fetchAppointments();
        }
    }, [showAllAppointments, userRole]);

    const fetchUserRole = async () => {
        try {
            const response = await request("GET", "/roles");
            if (response && response.status === 200) {
                const role = response.data.role;
                setUserRole(role);
            } else {
                console.error("Failed to fetch user role");
            }
        } catch (error) {
            console.error("Error fetching user role:", error.message);
        }
    };

    const fetchAppointments = async () => {
        const endpoint = showAllAppointments ? "/appo/all" : "/appo/booked";
        try {
            const response = await request("GET", endpoint);
            if (response && response.status === 200) {
                const appointments = response.data;
                console.log('Fetched appointments:', appointments);
                const events = appointments.map(appointment => {
                    const startDateTime = `${appointment.date}T${appointment.time.split('-')[0]}`;
                    const endDateTime = `${appointment.date}T${appointment.time.split('-')[1]}`;
                    let borderColor;
                    if (showAllAppointments) {
                        borderColor = getEmployeeColor(appointment.employeeId);
                    } else {
                        borderColor = "#635447";
                    }
                    return {
                        title: `${appointment.serviceName} - by: ${appointment.userEmail} - to: ${appointment.empName}`,
                        start: startDateTime,
                        end: endDateTime,
                        allDay: false,
                        borderColor: borderColor
                    };
                });
                setCurrentEvents(events);
            } else {
                console.error("Failed to fetch appointments");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error.message);
        }
    };

    const getEmployeeColor = (employeeId) => {
        const colors = ["green", "orange", "blue", "purple", "red", "yellow", "cyan", "magenta", "lime", "pink"];
        const colorIndex = parseInt(employeeId) % colors.length;
        return colors[colorIndex];
    };

    const toggleAppointments = () => {
        setShowAllAppointments(prevState => !prevState);
        fetchAppointments();
    };

    return (
        <Box className="calendar-container" m="20px">
            <Box className="calendar-area" margin={2}>
                {(userRole === "EMPLOYEE" || userRole === "ADMIN") && (
                    <Button
                        variant={showAllAppointments ? "contained" : "outlined"}
                        onClick={toggleAppointments}
                        className="appointment-toggle-button">
                        {showAllAppointments ? "My Appointments" : "All Appointments"}
                    </Button>
                )}
                <FullCalendar
                    height="75vh"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                    ]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                    initialView="dayGridMonth"
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={currentEvents}
                />
            </Box>
        </Box>
    );
};

export default Calendar;
