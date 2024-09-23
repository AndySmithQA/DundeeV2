import { Outlet } from "react-router-dom";

export default function TicketsLayout() {
    return (
        <div className="tickets-layout">
            <h2>Tickets</h2>
            <p>Lorem ipsum dolor sit amet.</p>

            <Outlet />
        </div>
    )
}