import {useNavigate} from "react-router-dom";

import appointmentImg from "./Resources/appointment.jpg";
import patientsImg from "./Resources/patients.jpg";

import "./Dashboard.scss";

export default function DoctorHome() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <nav className="row justify-content-center">
                <div className="col-sm-6 col-lg-4">
                    <div onClick={() => navigate("appointments")} className={"block"}>
                        <img src={appointmentImg} alt={"banner"}/>
                        <div>Appointments</div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                    <div onClick={() => navigate("patients")} className={"block"}>
                        <img src={patientsImg} alt={"banner"}/>
                        <div>Patients</div>
                    </div>
                </div>
            </nav>
        </div>
    );
};