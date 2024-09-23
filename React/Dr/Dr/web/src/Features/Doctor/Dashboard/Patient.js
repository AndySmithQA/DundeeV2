import {useEffect, useState} from "react";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import Alert, {alertType} from "../../../Components/Alert/Alert";

export default function Patient() {
    const [status, setStatus] = useState();
    const [patients, setPatients] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setStatus(fetchStatus.LOADING);
                return await api(httpMethod.GET, "/doctor/patients");
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to load patient appointments because: ", error);
            }
        };
        fetchData().then(patients => {
            setPatients(patients);
            setStatus(null);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col" id="appointment-list">
                    <div className="heading">Patients</div>
                    <div className="box">
                        <div className={"appointment-table"}>
                            <div className={"header"}>
                                <span>ID</span>
                                <span>Surname</span>
                                <span>Forename</span>
                                <span>Email</span>
                                <span>Phone</span>
                            </div>
                            {patients?.map(patient =>
                                <div key={patient.userinfoId}>
                                    <span>{patient.userinfoId}</span>
                                    <span>{patient.surname}</span>
                                    <span>{patient.forename}</span>
                                    <span>{patient.email}</span>
                                    <span>{patient.phone}</span>
                                </div>)}
                        </div>
                        <div className="status">
                            {!patients?.length &&
                                <Alert type={alertType.INFO}>No patient records found</Alert>}
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