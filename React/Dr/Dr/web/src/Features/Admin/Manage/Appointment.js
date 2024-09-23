import {useEffect, useState} from "react";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import Alert, {alertType} from "../../../Components/Alert/Alert";


export default function Appointment() {
    const [status, setStatus] = useState();
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus(fetchStatus.LOADING);
                return await api(httpMethod.GET, "/admin/appointments");
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to load patient appointments because: ", error);
            }
        };
        fetchData().then(appointments => {
            appointments.forEach(appointment => appointment.date = new Date(appointment.date));
            setAppointments(appointments);
            setStatus(null);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col" id="appointment-list">
                    <div className="heading">My Appointments</div>
                    <div className="box">
                        <div className={"appointment-table"}>
                            <div className={"header"}>
                                <span>Date</span>
                                <span>Patient</span>
                            </div>
                            {appointments?.map(appointment =>
                                <div key={JSON.stringify(appointment)}>
                                    <span>{appointment.date.toLocaleDateString()}&nbsp;{appointment.date.toLocaleTimeString().substring(0, 5)}</span>
                                    <span>{appointment.patient.name}</span>
                                </div>)}
                        </div>
                        <div className="status">
                            {!appointments?.length &&
                                <Alert type={alertType.INFO}>There are no upcoming appointments</Alert>}
                            {status === fetchStatus.LOADING &&
                                <Alert type={alertType.SPINNER}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}