import LoginForm from "../../Common/Authentication/LoginForm";
import {Link} from "react-router-dom";

export default function Login() {
    return (
        <LoginForm title="Paitent Login" loginUrl="/patient/session" successUrl="/patient/dashboard">
            <hr/>
            <div className="form-group">
                <Link to="register" className="link">Don't have an account? Register</Link>
                <br/>
                <Link to="forgottenpassword" className="link">Forgotten password</Link>
            </div>
        </LoginForm>
    );
}