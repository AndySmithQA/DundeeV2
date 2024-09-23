import "./Alert.scss";

export const alertType = {SPINNER: "spinner", INFO: "info", ERROR: "error", WARNING: "warning", SUCCESS: "success"};
export default function Alert(props) {
    const text = props.children;
    const type = props.type === undefined ? "info" : props.type;

    return (
        <div className="alert-box alert alert-primary" role="alert">
            {type === alertType.SPINNER && <i className="fa-solid fa-spinner fa-spin"/>}
            {type === alertType.INFO && <i className="fa-solid fa-circle-info"/>}
            {type === alertType.ERROR && <i className="fa-solid fa-circle-exclamation"/>}
            {type === alertType.WARNING && <i className="fa-solid fa-triangle-exclamation"/>}
            {type === alertType.SUCCESS && <i className="fa-regular fa-circle-check"/>}
            {text}
        </div>
    );
}