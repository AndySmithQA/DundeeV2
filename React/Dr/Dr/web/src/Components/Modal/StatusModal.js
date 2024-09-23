import "./StatusModal.scss";

export const statusType = {SPINNER: "spinner", INFO: "info", ERROR: "error", WARNING: "warning", SUCCESS: "success"};
export default function StatusModal(props) {
    const ok = props.ok;
    const cancel = props.cancel;
    const text = props.children;
    const type = props.type === undefined ? "info" : props.type;

    const buttonStyle = {
        "info": "btn-primary",
        "error": "btn-danger",
        "warning": "btn-warning",
        "success": "btn-success"
    };

    return (
        <div className={"status-modal"} autoFocus={!ok}>
            <div className={"message-box " + type}>
                <div className={"message-table"}>
                    <div className={"icon"}>
                        {type === statusType.SPINNER && <i className="fa-solid fa-spinner fa-spin"/>}
                        {type === statusType.INFO && <i className="fa-solid fa-circle-info"/>}
                        {type === statusType.ERROR && <i className="fa-solid fa-circle-exclamation"/>}
                        {type === statusType.WARNING && <i className="fa-solid fa-triangle-exclamation"/>}
                        {type === statusType.SUCCESS && <i className="fa-regular fa-circle-check"/>}
                    </div>
                    <div className={"message"}>{text}</div>
                </div>
                {(ok || cancel) &&
                    <div className={"text-center"}>
                        <hr/>
                        {cancel && <button className="btn btn-secondary" onClick={cancel}>Cancel</button>}
                        {ok && <button className={"btn " + buttonStyle[type]} onClick={ok} autoFocus>OK</button>}
                    </div>
                }
            </div>
        </div>
    );
}