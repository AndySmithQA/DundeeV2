import React, {useRef, useState} from "react";
import {Link, useNavigate,} from "react-router-dom";
import StatusModal from "../../../Components/Modal/StatusModal";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import * as validator from "../../../Utilities/Validators";
import "../../Common/Authentication/LoginForm.scss";

export default function Register() {
    const navigate = useNavigate();

    const [status, setStatus] = useState(null);

    const usernameRef = useRef();
    const forenameRef = useRef();
    const surnameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const termsOfUseRef = useRef();

    const [usernameError, setUsernameError] = useState(null);
    const [forenameError, setForenameError] = useState(null);
    const [surnameError, setSurnameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);
    const [termsOfUseError, setTermsOfUseError] = useState(null);

    const validateUsername = () => {
        setUsernameError(validator.email(usernameRef.current.value));
        return usernameError === validator.status.VALID;
    };

    const validatePassword = () => {
        setPasswordError(validator.password(passwordRef.current.value));
        return passwordError === validator.status.VALID;
    }

    const validateConfirmPassword = () => {
        setConfirmPasswordError(validator.match(passwordRef.current.value, confirmPasswordRef.current.value));
        return confirmPasswordError === validator.status.VALID;
    }

    const validateForename = () => {
        setForenameError(validator.notEmpty(forenameRef.current.value));
        return forenameError === validator.status.VALID;
    };

    const validateSurname = () => {
        setSurnameError(validator.notEmpty(surnameRef.current.value));
        return surnameError === validator.status.VALID;
    };

    const validateTermsOfUse = () => {
        setTermsOfUseError(validator.notEmpty(termsOfUseRef.current.checked));
        return termsOfUseError === validator.status.VALID;
    };

    const dismissDialog = () => {
        status === fetchStatus.SUCCESS
            ? navigate("/")
            : setStatus(null);
    };

    const submitRegistration = async (e) => {
        e.preventDefault();

        let validationResult = validateUsername();
        validationResult = validatePassword() && validationResult;
        validationResult = validateConfirmPassword() && validationResult;
        validationResult = validateForename() && validationResult;
        validationResult = validateSurname() && validationResult;
        validationResult = validateTermsOfUse() && validationResult;

        if (validationResult) {
            const newRegistration = {
                "email": usernameRef.current.value,
                "password": passwordRef.current.value,
                "forename": forenameRef.current.value,
                "surname": surnameRef.current.value,
            };
            setStatus(fetchStatus.WAITING);
            try {
                await api(httpMethod.POST, "/patient/registration", newRegistration);
                setStatus(fetchStatus.SUCCESS);
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to register because: ", error);
            }
        }
    };

    return (
        <>
            <form className="form-box" noValidate={true} onSubmit={submitRegistration}>
                <h3 className={"header"}>Patient Registration</h3>
                <div role="alert">
                    {usernameError === validator.status.EMPTY && "Please enter your email address"}
                    {usernameError === validator.status.INVALID && "Please enter a valid email"}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-envelope"/></span>
                    <input className="form-control" ref={usernameRef}
                           placeholder="Your Email.  This will be your username"
                           onBlur={validateUsername}/>
                </div>
                <div role="alert">
                    {passwordError === validator.status.EMPTY && <>Please choose a Password</>}
                    {passwordError === validator.status.INVALID && <>Password must be a minimum length of 8 and contain
                        at least 1 digit and 1 character</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-key"/></span>
                    <input className="form-control" ref={passwordRef} placeholder="Password" onBlur={validatePassword}/>
                </div>
                <div role="alert">
                    {confirmPasswordError === validator.status.INVALID && <>The entered Passwords do not match</>}
                    {confirmPasswordError === validator.status.EMPTY && <>Please confirm your password</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-key"/></span>
                    <input className="form-control" ref={confirmPasswordRef}
                           placeholder="Retype the password to confirm" onBlur={validateConfirmPassword}/>
                </div>
                <div role="alert">
                    {forenameError === validator.status.EMPTY && <>Please enter your Forename</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-user"/></span>
                    <input className="form-control" ref={forenameRef} placeholder="Forename" onBlur={validateForename}/>
                </div>
                <div role="alert">
                    {surnameError === validator.status.EMPTY && <>Please enter your Surname</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-user"/></span>
                    <input className="form-control" ref={surnameRef} placeholder="Surname" onBlur={validateSurname}/>
                </div>
                <div role="alert">
                    {termsOfUseError === validator.status.EMPTY &&
                        <>You must agree to the Terms and Conditions to use this service</>}
                </div>
                <div className="box">
                    <input type="checkbox" ref={termsOfUseRef} title="Terms of use agreement"
                           onChange={validateTermsOfUse}/>&nbsp;&nbsp;
                    I have read and agree to the&nbsp;<Link to="../termsofuse" className="link">Terms of Use</Link>
                </div>
                <br/>
                <div className="form-group text-end">
                    <button className="btn btn-primary" type="submit">REGISTER</button>
                    &nbsp;
                </div>
                <hr/>
                <Link to="../" className="link form-group">Back to Login</Link>
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type="spinner" ok={dismissDialog}>
                    Please wait - Submitting your registration.
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
                    Unable to register with given details.
                </StatusModal>
            }
            {status === fetchStatus.SUCCESS &&
                <StatusModal type="info">
                    Thank you for registering.. An email has been sent to your email address containing an activation
                    link. Please click on the link to activate your account. If you do not click the link your account
                    will remain inactive and you will not receive further emails. If you do not receive the email within
                    a few minutes, please check your spam folder.
                </StatusModal>
            }
        </>
    );
}