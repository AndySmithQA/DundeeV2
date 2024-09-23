import "./Authentication.scss";
import {Outlet} from "react-router-dom";

const Authentication = () => {
    return (
        <main id="doctor-authentication">
            <Outlet/>
        </main>);
};

export default Authentication;
