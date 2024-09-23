import {Link, Outlet, useNavigate,} from "react-router-dom";

import qa_logo from "../../../Resources/qa.png";
import StatusModal from "../../../Components/Modal/StatusModal";
import About from "../../Common/About/About";

import "./Dashboard.scss";

import {useEffect, useState} from "react";
import {isLoggedIn, logout, ROLE} from "../../../Services/UserService";

export default function Dashboard() {
    const [showLogout, setShowLogout] = useState(false);
    const [showAbout, setShowAbout] = useState(false);

    const navigate = useNavigate();
    const doctorLogout = () => {
        logout();
        navigate("/doctor");
    };

    const dismissDialog = () => {
        setShowLogout(false);
        setShowAbout(false);
    };

    useEffect(() => {
        if (!isLoggedIn(ROLE.DOCTOR)) {
            navigate("/doctor");
        }
    });

    return (<>
        <main id={"doctor-dashboard"}>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img className="navbar-brand logo" src={qa_logo} alt={"logo"}/>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={""} className="nav-link active" aria-current="page">Home</Link>
                            </li>
                        </ul>
                        <div id={"nav-aux"}>
                        <span onClick={() => setShowAbout(true)}>
                            <i className="fa-solid fa-circle-info" aria-hidden="true"/>&nbsp;About
                        </span>
                            <span onClick={() => setShowLogout(true)}>
                            <i className="fa fa-sign-out" aria-hidden="true"/>&nbsp;Logout
                        </span>
                        </div>
                    </div>
                </div>

                {/*Needs to be inside nav to ensure the dialog is on top */}
                {showLogout && <StatusModal type="warning" ok={doctorLogout} cancel={dismissDialog}>
                    Are you sure that you want to logout?
                </StatusModal>}
                {showAbout && <About dismiss={dismissDialog}/>}
            </nav>
            <br/>

            <Outlet/>
        </main>
        );
    </>);
};