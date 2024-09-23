import { useParams, useLoaderData } from 'react-router-dom'

export default function TicketDetails() {
    const { id } = useParams()
    const ticket = useLoaderData()

    return (
        <div className="ticket-details">
            <h2>Ticket Details - {ticket.title}</h2>
            <p>User - {ticket.user}</p>
            <p>Located in - {ticket.location}</p>
            <div className="details">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Voluptatibus, similique non recusandae ducimus quaerat ipsum adipisci odit pariatur impedit 
                corporis assumenda dolore et doloremque temporibus delectus repellat amet? Facilis, quibusdam?
            </div>
        </div>
    )
}

export const ticketDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch(`http://localhost:4000/tickets/` + id)

    return res.json()
}