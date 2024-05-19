import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box } from "@mui/material";
import { request } from "../api/axios_helper";
import "./Calendar.css";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRoles = JSON.parse(localStorage.getItem("userRoles"));
        setIsAdmin(userRoles?.includes("ADMIN"));
    }, []);

    const fetchBookedAppointments = async () => {
        try {
            let response;
            if (isAdmin) {
                response = await request("GET", "/appo/all");
            } else {
                response = await request("GET", "/appo/booked");
            }
            if (response && response.status === 200) {
                const appointments = response.data;
                console.log("Appointments:", appointments);
                const events = appointments.map(appointment => {
                    const startDateTime = `${appointment.date}T${appointment.time}`;
                    const endDateTime = `${appointment.date}T${appointment.time}`;
                    return {
                        title: `${appointment.serviceName} - EMP: ${appointment.empName} `,
                        start: startDateTime,
                        end: endDateTime,
                        allDay: false
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



    const handleDatesSet = () => {
        fetchBookedAppointments();
    };

    return (
        <Box className="calendar-container" m="20px" >
            <Box className="calendar-area" margin={2}>
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
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={currentEvents}
                    datesSet={handleDatesSet}
                />
            </Box>
        </Box>
    );
};

export default Calendar;
