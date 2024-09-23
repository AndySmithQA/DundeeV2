import "./Authentication.scss";
import LoginForm from "../../Common/Authentication/LoginForm";

const Authentication = () => {
    return (
        <main id="admin-authentication">
            <LoginForm title="Admin Login" loginUrl="/admin/session" successUrl="/admin/dashboard"/>
        </main>);
};

export default Authentication;
