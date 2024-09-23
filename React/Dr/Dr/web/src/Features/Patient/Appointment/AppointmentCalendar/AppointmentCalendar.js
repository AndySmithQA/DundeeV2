import {Fragment, useEffect, useReducer, useState} from "react";
import "./AppointmentCalendar.scss";

import BookingForm from "./BookingForm";
import {api, httpMethod} from "../../../../Services/HTTP";

export default function AppointmentCalendar(props) {
    const parentAddCallback = props.addHandler;
    const ACTION = {SET: "set", ADD: "add", REMOVE: "remove"};
    const TIMESLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "SAT"];

    const [status, setStatus] = useState();
    const [calendarStartDate, setCalendarStartDate] = useState();
    const [selectedBooking, setSelectedBooking] = useState();
    const [surgeryDoctors, setSurgeryDoctors] = useState();
    const [weekAppointments, dispatchWeekAppointments] = useReducer((state, action) => {
        switch (action.type) {
            case ACTION.SET:
                return action.payload;
            case ACTION.ADD:
                const newState = {...state};
                const newAppointment = action.payload;
                newAppointment.weekday = new Date(newAppointment.date).getDay();

                if (!newState[newAppointment.weekday]) {
                    newState[newAppointment.weekday] = {"date": newAppointment.date};
                }
                if (!newState[newAppointment.weekday].slots[newAppointment.time]) {
                    newState[newAppointment.weekday].slots[newAppointment.time] = {"doctors": []};
                }

                // Ensure that appointment is not added twice sue to React reprocessing
                const appointmentDoctors = newState[newAppointment.weekday].slots[newAppointment.time].doctors;
                if (!appointmentDoctors.find(doctor => doctor.id === newAppointment.doctor.id)) {
                    appointmentDoctors.push(newAppointment.doctor);
                }
                return newState;
            case ACTION.REMOVE:
                // TODO filter
                return state;
            default:
                return state;
        }
    }, {});

    /**
     *
     * @param fromDate
     * @param toDate
     * @returns {Promise<void>}
     */
    const loadCalendar = async (fromDate, toDate) => {
        try {
            const offsetInMs = fromDate.getTimezoneOffset() * 60000;
            fromDate.setTime(fromDate.getTime() - offsetInMs);
            toDate.setTime(toDate.getTime() - offsetInMs);

            const fromParam = fromDate.toISOString().substring(0, 10);
            const toParam = toDate.toISOString().substring(0, 10);

            const appointmentDetails = await api(httpMethod.GET, `/patient/appointments/calendar?from=${fromParam}&to=${toParam}`);
            const calendar = {};

            // Initialise the day slots
            for (let day = fromDate.getDay(), date = new Date(fromDate);
                 day < 6;
                 day++, date.setDate(date.getDate() + 1)) {

                calendar[day] = {date: new Date(date), slots: {}};
            }

            appointmentDetails.forEach(appointment => {
                const appointmentDate = new Date(appointment.date)
                const weekday = appointmentDate.getDay();
                const time = appointment.date.substring(11,16);

                if (!calendar[weekday].slots[time]) {
                    calendar[weekday].slots[time] = {"doctors": []};
                }
                calendar[weekday].slots[time].doctors.push(appointment.doctor);
            });

            dispatchWeekAppointments({type: ACTION.SET, payload: calendar});

        } catch (error) {
            setStatus("ERROR");
            console.error("[ERROR] Failed to load appointments because: ", error);
        }
    };

    const loadPreviousWeek = () => {
        if (weekAppointments[1]?.date > calendarStartDate) {
            let startDate;
            let endDate;

            const previousMonday = new Date(weekAppointments[5].date);
            previousMonday.setDate(previousMonday.getDate() - 11); // there will always be a Friday loaded

            startDate = (previousMonday < calendarStartDate)
                ? calendarStartDate
                : previousMonday;

            endDate = new Date();
            endDate.setDate(previousMonday.getDate() + 5);

            loadCalendar(startDate, endDate);
        } else {
            console.warn("[WARN] Cannot load previous week as it is before Calendar Start Date of ", calendarStartDate);
        }
    };

    const loadNextWeek = () => {
        const currentFriday = new Date(weekAppointments[5].date);

        const nextMonday = new Date(currentFriday);
        nextMonday.setDate(currentFriday.getDate() + 3);

        const nextSaturday = new Date(currentFriday);
        nextSaturday.setDate(currentFriday.getDate() + 8);

        loadCalendar(nextMonday, nextSaturday);
    };

    useEffect(() => {
        const loadSurgeryDoctors = async () => {
            setSurgeryDoctors(await api(httpMethod.GET, `/patient/appointments/doctors`));
        };
        loadSurgeryDoctors();

        const startDay = new Date();
        startDay.setHours(0, 0, 0, 0);
        startDay.setTime(startDay.getTime() - (startDay.getTimezoneOffset() * 60000));

        // if today is Saturday and Sunday, then move start to next Monday
        if (startDay.getDay() > 5) {
            startDay.setDate(startDay.getDate() + (8 - startDay.getDate()));
        }

        const saturday = new Date(startDay);
        saturday.setDate(saturday.getDate() + 6 - startDay.getDay());

        setCalendarStartDate(startDay);
        loadCalendar(startDay, saturday);
    }, []);

    const addAppointment = (newAppointment) => {
        dispatchWeekAppointments({type: ACTION.ADD, payload: newAppointment});
        const tempAppointment = {...newAppointment};
        tempAppointment.date = newAppointment.date.toISOString().substring(0, 10);
        parentAddCallback(newAppointment);
    };

    const appointmentColumn = (day, time) => {
        if (weekAppointments[day]) {
            if (weekAppointments[day].slots[time]?.doctors.length >= surgeryDoctors.length) {
                return <div className={"not-available"}>Not Available</div>;
            } else {
                return (
                    <div className="available" title={time}
                         onClick={() => {
                             setSelectedBooking({
                                 doctorsInSurgery: surgeryDoctors,
                                 appointmentDate: weekAppointments[day].date,
                                 time: time,
                                 appointmentDoctors: weekAppointments[day].slots[time]?.doctors ?? []
                             });
                         }}> Available
                    </div>
                );
            }
        } else {
            return <div>&nbsp;</div>;
        }
    };

    return (
        <div id="appointmentCalendar" className={"container-fluid"}>
            <div className={"calendar-table"}>
                <div className={"heading"}>
                    <span>Book Appointment</span>
                    <i className="bi bi-arrow-left-square enabled" onClick={loadPreviousWeek}/>
                    <i className="bi bi-arrow-right-square enabled" onClick={loadNextWeek}/>
                </div>

                <div className={"timeColumn"}>
                    <div>&nbsp;</div>
                    {TIMESLOTS.map((time) => <div key={time}>{time}</div>)}
                </div>
                {[1, 2, 3, 4, 5].map(day =>
                    <div className={"appointmentColumn"} key={WEEKDAYS[day]}>
                        {weekAppointments[day] ?
                            <div>{new Date(weekAppointments[day].date).toDateString().substring(0, 10)}</div>
                            :
                            <div className={"na"}>{WEEKDAYS[day]}</div>
                        }
                        {TIMESLOTS.map((time) =>
                            <Fragment key={day + "-" + time}>
                                {appointmentColumn(day, time)}
                            </Fragment>
                        )}
                    </div>
                )}
            </div>
            {selectedBooking &&
                <BookingForm cancel={() => setSelectedBooking(null)}
                             addAppointmentHandler={addAppointment}
                             bookingData={selectedBooking}/>}


        </div>);
}