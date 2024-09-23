import LoginForm from "../../Common/Authentication/LoginForm";

export default function Login() {
    return (
        <LoginForm title="Doctor Login" loginUrl="/doctor/session" successUrl="/doctor/dashboard"/>
    );
}