import {useNavigate} from "react-router-dom";
import "./FrontPage.scss";
import React from "react";

import patient from "./Resources/patient.jpg";
import doctor from "./Resources/doctor.jpg";
import admin from "./Resources/admin.jpg";

export default function FrontPage() {
    const navigate = useNavigate();

    return (
        <main id="frontpage">
            <div className="container">
                <div className="row">
                    <h1>hydra</h1>
                </div>
                <nav className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div onClick={() => navigate("/patient")} className={"block"}>
                            <img src={patient} alt={"banner"}/>
                            <div>Patient Portal</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div onClick={() => navigate("/doctor")} className={"block"}>
                            <img src={doctor} alt={"banner"}/>
                            <div>Doctor Portal</div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div onClick={() => navigate("/admin")} className={"block"}>
                            <img src={admin} alt={"banner"}/>
                            <div>Admin Portal</div>
                        </div>
                    </div>
                </nav>
            </div>
        </main>
    )
        ;
}