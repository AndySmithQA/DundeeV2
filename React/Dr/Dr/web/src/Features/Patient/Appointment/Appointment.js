import AppointmentCalendar from "./AppointmentCalendar/AppointmentCalendar";
import {useEffect, useReducer, useState} from "react";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import "./Appointment.scss";
import Alert, {alertType} from "../../../Components/Alert/Alert";

export default function Appointment() {
    const dispatchAction = {SET: "set", ADD: "add", REMOVE: "remove"};
    const [status, setStatus] = useState();

    const [appointments, dispatchAppointments] = useReducer((state, action) => {
        switch (action.type) {
            case dispatchAction.SET:
                return action.payload;
            case dispatchAction.ADD:
                const newState = [...state];
                const newAppointment = action.payload;

                if (!newState.find(appointment => JSON.stringify(appointment) === JSON.stringify(newAppointment))) {
                    newState.push(newAppointment);
                }
                return newState;
            default:
                return state;
        }
    }, []);

    const addAppointment = (newAppointment) => {
        dispatchAppointments({type: dispatchAction.ADD, payload: newAppointment});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus(fetchStatus.LOADING);
                return await api(httpMethod.GET, "/patient/appointments");
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to load patient appointments because: ", error);
            }
        };
        fetchData().then(appointments => {
            appointments.forEach(appointment => appointment.date = new Date(appointment.date));
            dispatchAppointments({type: dispatchAction.SET, payload: appointments});
            setStatus(null);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col"><AppointmentCalendar addHandler={addAppointment}/></div>
                <div className="col" id="appointment-list">
                    <div className="heading">My Appointments</div>
                    <div className="box">
                        <div className={"appointment-table"}>
                            <div className={"header"}>
                                <span>Date</span>
                                <span>Doctor</span>
                            </div>
                            {appointments?.map(appointment =>
                                <div key={JSON.stringify(appointment)}>
                                    <span>{appointment.date.toLocaleDateString()}&nbsp;{appointment.date.toLocaleTimeString().substring(0, 5)}</span>
                                    <span>{appointment.doctor.name}</span>
                                </div>)}
                        </div>
                        <div className="status">
                            {!appointments?.length &&
                                <Alert type={alertType.INFO}>You do not have any upcoming appointments</Alert>
                            }
                            {status === fetchStatus.LOADING &&
                                <Alert type={alertType.SPINNER}>Loading appointments </Alert>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}