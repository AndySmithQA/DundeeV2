import React, {useRef, useState} from "react";
import {useNavigate,} from "react-router-dom";
import StatusModal from "../../../Components/Modal/StatusModal";
import * as UserInfo from "../../../Services/UserService";
import {fetchStatus} from "../../../Services/HTTP";
import * as validator from "../../../Utilities/Validators";
import "./LoginForm.scss";

export default function LoginForm(props) {
    const title = props.title;
    const loginUrl = props.loginUrl;
    const successUrl = props.successUrl;

    const [status, setStatus] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const usernameRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const validateUsername = () => {
        setUsernameError(validator.email(usernameRef.current.value));
        return usernameError === validator.status.VALID;
    }

    const validatePassword = () => {
        setPasswordError(validator.notEmpty(passwordRef.current.value));
        return passwordError === validator.status.VALID;
    }

    const login = async (e) => {
        e.preventDefault();

        let validationResult;
        validationResult = validateUsername();
        validationResult = validatePassword() && validationResult;

        if (validationResult) {
            setStatus(fetchStatus.WAITING);
            try {
                await UserInfo.login(usernameRef.current.value, passwordRef.current.value, loginUrl);
                navigate(successUrl);
            } catch (error) {
                setStatus(error);
                console.error("[ERROR] Log in failed because: ", error);
            }
        }
    };

    const dismissDialog = () => {
        setStatus(null);
    };

    return (
        <>
            <form className="form-box" noValidate={true} onSubmit={login}>
                <h3 className={"header"}>{title}</h3>
                <div role="alert">
                    {usernameError === validator.status.EMPTY && "Please enter your email address"}
                    {usernameError === validator.status.INVALID && "Please enter a valid email"}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-envelope"/></span>
                    <input className="form-control" ref={usernameRef} onChange={validateUsername}
                           placeholder="Username.  This is your email"/>
                </div>
                <div role="alert">
                    {passwordError === validator.status.EMPTY && <>Please enter a Password</>}
                </div>
                <div className="input-group">
                    <span className="input-group-text"><i className="fa fa-key"/></span>
                    <input className="form-control" ref={passwordRef} placeholder="Password" type="password"
                           onChange={validatePassword}/>
                </div>
                <br/>
                <div className="form-group text-end">
                    <button className="btn btn-primary" type="submit">LOGIN</button>
                </div>
                {/* Optional Extension as used in Patient.js Login to add extra links */}
                {props.children}
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type="spinner">
                    Please wait while we connect you to your account.
                </StatusModal>
            }
            {status === fetchStatus.INVALID_CREDENTIALS &&
                <StatusModal type="warning" ok={dismissDialog}>
                    Unable to login because of incorrect Username or Password
                </StatusModal>
            }
            {status === fetchStatus.SYSTEM_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    We are currently experiencing problems. Please try again later
                </StatusModal>
            }
            {status === fetchStatus.NETWORK_ERROR &&
                <StatusModal type="error" ok={dismissDialog}>
                    Unable to contact server. Please try again later.
                </StatusModal>
            }
        </>);
}