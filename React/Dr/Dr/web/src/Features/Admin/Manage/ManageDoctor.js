import {useEffect, useReducer, useState} from "react";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";

import StatusModal, {statusType} from "../../../Components/Modal/StatusModal";
import Alert, {alertType} from "../../../Components/Alert/Alert";
import NewDoctorForm from "./NewDoctorForm";

import "./ManageDoctor.scss";

export default function ManageDoctor() {

    const dispatchAction = {SET: "set", ADD: "add", REMOVE: "remove"};
    const [status, setStatus] = useState("");

    const [surgeryDoctors, dispatchSurgeryDoctors] = useReducer((state, action) => {
        switch (action.type) {
            case dispatchAction.SET:
                return action.payload;
            case dispatchAction.ADD:
                const newState = [...state];
                const newDoctor = action.payload;
                if (!newState.find(doctor => doctor.userinfoId === newDoctor.userinfoId)) {
                    newState.push(newDoctor);
                }
                return newState;
            default:
                return state;
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus(fetchStatus.LOADING);
                return await api(httpMethod.GET, "/admin/doctors");
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to load surgery doctors because: ", error);
            }
        };
        fetchData().then(doctors => {
            dispatchSurgeryDoctors({type: dispatchAction.SET, payload: doctors});
            setStatus(null);
        });
    }, []);

    return (
        <div id="manage-doctor" className="container">
            <h1>Doctors Management</h1>
            <NewDoctorForm
                addHandler={(newDoctor) => dispatchSurgeryDoctors({type: dispatchAction.ADD, payload: newDoctor})}/>
            <hr/>
            <div className={"doctor-table"}>
                <ul className={"header"}>
                    <li className="text-center">Active</li>
                    <li>ID</li>
                    <li>Surname</li>
                    <li>Forename</li>
                    <li>Email</li>
                    <li>Phone</li>
                </ul>
                {surgeryDoctors?.map(doctor => <ul key={doctor.email}>
                    <li className="text-center">{doctor.activationDate ?
                        <i className="fa-regular fa-circle-check"/> : ""}</li>
                    <li>{doctor.userinfoId}</li>
                    <li>{doctor.surname}</li>
                    <li>{doctor.forename}</li>
                    <li>{doctor.email}</li>
                    <li>{doctor.phone}</li>
                </ul>)}
            </div>
            {!surgeryDoctors?.length && <Alert type={alertType.INFO}>No Doctor Records Found</Alert>}
            {status === fetchStatus.LOADING && <Alert type={alertType.SPINNER}/>}
        </div>
    );
}