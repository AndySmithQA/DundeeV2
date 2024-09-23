import React, {useRef, useState} from "react";
import StatusModal from "../../../Components/Modal/StatusModal";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import * as validator from "../../../Utilities/Validators";
import "./NewDoctorForm.scss";

export default function NewDoctorForm(props) {
    const addHandler = props.addHandler;

    const [status, setStatus] = useState(null);

    const forenameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();

    const [forenameError, setForenameError] = useState(null);
    const [surnameError, setSurnameError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [emailError, setEmailError] = useState(null);

    const validateForename = () => {
        setForenameError(validator.name(forenameRef.current.value));
        return forenameError === validator.status.VALID;
    };

    const validateSurname = () => {
        setSurnameError(validator.name(surnameRef.current.value));
        return surnameError === validator.status.VALID;
    };

    const validatePhone = () => {
        setPhoneError(validator.phone(phoneRef.current.value));
        return phoneError === validator.status.VALID || phoneError === validator.status.EMPTY ;
    };

    const validateEmail = () => {
        setEmailError(validator.email(emailRef.current.value));
        return emailError === validator.status.VALID;
    };

    const registerDoctor = async (e) => {
        e.preventDefault();

        let validationResult = validateSurname();
        validationResult = validateForename() && validationResult;
        validationResult = validateEmail() && validationResult;
        validationResult = validatePhone() && validationResult;

        if (validationResult) {
            const newRegistration = {
                "email": emailRef.current.value,
                "phone": phoneRef.current.value,
                "forename": forenameRef.current.value,
                "surname": surnameRef.current.value,
            };
            setStatus(fetchStatus.WAITING);
            try {
                addHandler(await api(httpMethod.POST, "/admin/doctors", newRegistration));
                setStatus(fetchStatus.SUCCESS);

            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to register doctor because: ", error);
            }
        }
    };

    const dismissDialog = () => {
        setStatus(null);
    };

    return (
        <>
            <form className={"doctor-form"} noValidate={true} onSubmit={registerDoctor}>
                <div className="error-row">
                    <div>
                        {surnameError === validator.status.EMPTY && <>Required</>}
                        {surnameError === validator.status.INVALID && <>This is not a valid surname</>}
                    </div>
                    <div>
                        {forenameError === validator.status.EMPTY && <>Required</>}
                        {forenameError === validator.status.INVALID && <>This is not a valid forename</>}
                    </div>
                    <div>
                        {emailError === validator.status.EMPTY && <>Required</>}
                        {emailError === validator.status.INVALID && <>*This is not a valid Email</>}
                    </div>
                    <div>
                        {phoneError === validator.status.INVALID && <>This is not a valid UK Phone Number</>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-floating">
                        <input className="form-control" id="Surname" placeholder="Surname" ref={surnameRef}
                               onBlur={validateSurname}/>
                        <label htmlFor="Surname"><i className="fa fa-user"/>Surname*</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" id="forename" placeholder="Forename" ref={forenameRef}
                               onBlur={validateForename}/>
                        <label htmlFor="forename"><i className="fa fa-user"/>Forename*</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" id="email" placeholder="Email" ref={emailRef}
                               onBlur={validateEmail}/>
                        <label htmlFor="email"><i className="fa fa-envelope"/>Email Address*</label>
                    </div>
                    <div className="form-floating">
                        <input className="form-control" id="phone" placeholder="Phone" ref={phoneRef}
                               onBlur={validatePhone}/>
                        <label htmlFor="phone"><i className="fa fa-phone"/>Phone</label>
                    </div>
                    <div>
                        <button className="form-control btn btn-primary" type="submit">Add New Doctor</button>
                    </div>
                </div>
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type="spinner" ok={dismissDialog}>
                    Please wait - Submitting new doctor registration.
                </StatusModal>
            }
            {status === fetchStatus.SYSTEM_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    We have encountered a System Error. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.NETWORK_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Unable to contact server. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.CONFLICT &&
                <StatusModal type="warning" ok={dismissDialog}>
                    {emailRef.current.value} has already been already registered.
                </StatusModal>
            }
            {status === fetchStatus.SUCCESS &&
                <StatusModal type="info" ok={dismissDialog}>
                    Successfully submitted registration. An activation email has been sent to {emailRef.current.value}
                </StatusModal>
            }
        </>
    );
}