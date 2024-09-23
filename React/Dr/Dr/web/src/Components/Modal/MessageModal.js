import "./MessageModal.scss";

export default function MessageModal(props) {
    return (
        <div className="messageModal">
            <main>
                {props.children}
            </main>
        </div>);
}