import {useNavigate} from "react-router-dom";

import appointment from "./Resources/appointment.jpg";
import reading from "./Resources/bpmeter.png";

import "./Dashboard.scss";

export default function PatientHome() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <nav className="row justify-content-center">
                <div className="col-sm-6 col-lg-4">
                    <div onClick={() => navigate("appointment")} className={"block"}>
                        <img src={appointment} alt={"banner"}/>
                        <div>Manage Appointments</div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4">
                    <div onClick={() => navigate("monitoring")} className={"block"}>
                        <img src={reading} alt={"banner"}/>
                        <div>Health Monitoring</div>
                    </div>
                </div>
            </nav>
        </div>
    );
};