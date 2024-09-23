import React, {useRef, useState} from "react";
import {Link} from "react-router-dom";
import StatusModal from "../../../Components/Modal/StatusModal";
import {api, fetchStatus, httpMethod} from "../../../Services/HTTP";
import * as validator from "../../../Utilities/Validators";
import "../../Common/Authentication/LoginForm.scss";

export default function ForgottenPassword() {
    const [status, setStatus] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const usernameRef = useRef();

    const reset = async (e) => {
        e.preventDefault();

        if (usernameRef.current.value) {
            setStatus(fetchStatus.WAITING);
            try {
                await api(httpMethod.POST, "/patient/password-reset", {"email": usernameRef.current.value});
                setStatus(fetchStatus.SUCCESS);
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Failed to reset because of: ", error);
            }
        } else {
            setUsernameError(validator.status.EMPTY);
        }
    };

    const dismissDialog = () => {
        setStatus(null);
    };

    return (
        <>
            <form className="form-box" noValidate={true} onSubmit={reset}>
                <h3 className={"header"}>Forgotten Password</h3>
                <div role="alert">
                    {usernameError === validator.status.EMPTY && "Please enter your username"}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-envelope"/></span>
                    <input className="form-control" ref={usernameRef}
                           placeholder="Username of account"/>
                </div>
                <br/>
                <div className="form-group text-end">
                    <button className="btn btn-primary" type="submit">RESET</button>
                </div>
                <hr/>
                <Link to="../" className="link form-group">Back to Login</Link>
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type="spinner">
                    Please wait while we try to find your account.
                </StatusModal>
            }
            {status === fetchStatus.NOT_FOUND &&
                <StatusModal type="warning" ok={dismissDialog}>
                    We were unable to find an account with the given username
                </StatusModal>
            }
            {status === fetchStatus.SYSTEM_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Sorry.  We are currently experience problems.  Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.NETWORK_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Unable to contact server. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.SUCCESS &&
                <StatusModal type="info">
                    An email has been sent to your email address containing a password reset
                    link. If you do not receive the email within a few minutes, please check your spam folder.
                </StatusModal>
            }
        </>
    );
}