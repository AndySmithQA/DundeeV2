import {Outlet,} from "react-router-dom";
import "./Authentication.scss";


export default function Authentication()  {
    return (
        <main id="authentication">
            <Outlet/>
        </main>
    );
};
