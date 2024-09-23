import React, {useRef, useState} from "react";
import {useNavigate, useParams,} from "react-router-dom";

import StatusModal from "../../../Components/Modal/StatusModal";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import * as Validator from "../../../Utilities/Validators";

import "../../Common/Authentication/LoginForm.scss";

export default function Activation() {
    const navigate = useNavigate();
    const {token} = useParams();

    const [status, setStatus] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const validatePassword = () => {
        setPasswordError(Validator.password(passwordRef.current.value));
        return passwordError === Validator.status.VALID;
    };

    const validateConfirmPassword = () => {
        setConfirmPasswordError(Validator.match(passwordRef.current.value, confirmPasswordRef.current.value));
        return confirmPasswordError === Validator.status.VALID;
    };

    const reset = async (e) => {
        e.preventDefault();

        let validationResult = validatePassword();
        validationResult = validateConfirmPassword() && validationResult;

        if (validationResult) {
            setStatus(fetchStatus.WAITING);
            try {
                await api(httpMethod.PUT, "/doctor/activation/" + token, {"password": passwordRef.current.value});
                setStatus(fetchStatus.SUCCESS);
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to activate account because: ", error);
            }
        }
    };

    const dismissDialog = () => {
        status === fetchStatus.SUCCESS
            ? navigate("../")
            : setStatus(null);
    };

    return (
        <>
            <form className="form-box" noValidate={true} onSubmit={reset}>
                <h3 className={"header"}>Doctor Account Activation</h3>
                <h4>Please choose a password</h4>
                <div role="alert">
                    {passwordError === Validator.status.EMPTY && <>Please choose a Password</>}
                    {passwordError === Validator.status.INVALID && <>Password must be a minimum length of 8 and contain
                        at least 1 digit and 1 character</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-key"/></span>
                    <input className="form-control" ref={passwordRef} placeholder="Password" onBlur={validatePassword}/>
                </div>
                <div role="alert">
                    {confirmPasswordError === Validator.status.INVALID && <>The entered Passwords do not match</>}
                    {confirmPasswordError === Validator.status.EMPTY && <>Please confirm your password</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-key"/></span>
                    <input className="form-control" ref={confirmPasswordRef}
                           placeholder="Retype the password to confirm" onBlur={validateConfirmPassword}/>
                </div>
                <br/>
                <div className="form-group text-end">
                    <button className="btn btn-primary" type="submit">ACTIVATE</button>
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => navigate("/doctor")}>Cancel</button>
                </div>
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type="spinner">
                    Please wait while we activate your account.
                </StatusModal>
            }
            {status === fetchStatus.SYSTEM_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Sorry. We are currently experience problems. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.NETWORK_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Unable to contact server. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.SUCCESS &&
                <StatusModal type="success" ok={() => navigate("/doctor")}>
                    Your account has been changed. Please log on.
                </StatusModal>
            }
        </>
    );
}