import "./BookingForm.scss";
import qa_logo from "../../../../Resources/qa.png";
import {useState} from "react";
import StatusModal, {statusType} from "../../../../Components/Modal/StatusModal";
import {api, fetchStatus, httpMethod} from "../../../../Services/HTTP";
import * as userService from "../../../../Services/UserService";

export default function BookingForm(props) {
    const surgeryDoctors = props.bookingData.doctorsInSurgery;
    const appointmentDate = props.bookingData.appointmentDate;
    const appointmentDoctors = props.bookingData.appointmentDoctors;
    const appointmentTime = props.bookingData.time;

    const close = props.cancel;
    const addAppointmentHandler = props.addAppointmentHandler;

    const [selectedDoctor, setSelectedDoctor] = useState();
    const [status, setStatus] = useState("");

    const bookAppointment = async (e) => {
        e.preventDefault();

        try {
            const startTime = new Date(appointmentDate);
            const offsetInMs = startTime.getTimezoneOffset() * 60000;
            const [startHour, startMinute] = appointmentTime.split(":");

            startTime.setHours(startHour, startMinute, 0);
            startTime.setTime(startTime.getTime() - offsetInMs);

            const appointment = {
                patientId: userService.getUserInfo().userinfoid,
                staffId: selectedDoctor.id,
                startTime: startTime.toISOString(),
                endTime: startTime.toISOString(),
            };
            setStatus(fetchStatus.WAITING);
            await api(httpMethod.POST, "/patient/appointments", appointment);
            setStatus(fetchStatus.SUCCESS);
            addAppointmentHandler({
                date: appointmentDate,
                time: appointmentTime,
                doctor: selectedDoctor
            });
        } catch (error) {
            setStatus(error);
            console.error("[ERROR] Log in failed because: ", error);
        }
    };

    const dismissDialog = () => {
        setStatus(null);
    };

    return (
        <div id={"booking-input"}>
            <form autoFocus={true}>
                <h3><img src={qa_logo} alt={"logo"}/>Doctor Appointment Request</h3>
                <hr/>
                <div className={"date-time"}>
                    {appointmentDate.toISOString().substring(0, 10)}&nbsp;{appointmentTime}&nbsp;,&nbsp;Doctor:&nbsp;
                    <span className={"prompt"}>
                    {selectedDoctor ? selectedDoctor.name : <>Please select a doctor</>}
                    </span>
                </div>
                <hr/>
                <ul>  {/* Doctor list with availability status for this timeslot */}
                    {surgeryDoctors.map(doctor =>
                        // A doctor is available for this timeslot if it is not already assigned to this appointment timeslot
                        appointmentDoctors.find((appointmentDoctor) => appointmentDoctor.id === doctor.id) ?
                            <li className={"na"} key={doctor.id}>
                                <i className={"fa fa-ban"}/>Doctor {doctor.name} (Not Available)
                            </li>
                            :
                            <li onClick={() => setSelectedDoctor(doctor)} key={doctor.id}>
                                <i className={"fa-solid fa-check " + (selectedDoctor?.id !== doctor.id && " invisible")}/>Doctor {doctor.name}
                            </li>
                    )}
                </ul>
                <hr/>
                <div className={"text-end"}>
                    <button className={"btn btn-primary"} type="button" onClick={bookAppointment}>Book Appointment
                    </button>
                    &nbsp;
                    <button className={"btn btn-secondary"} type="button" onClick={close}>Cancel</button>
                </div>
            </form>

            {status === fetchStatus.WAITING &&
                <StatusModal type={statusType.SPINNER}>
                    Please wait while we submit your appointment request
                </StatusModal>
            }
            {status === fetchStatus.SUCCESS &&
                <StatusModal type={statusType.SUCCESS} ok={close}>
                    An appointment has been made with Doctor {selectedDoctor.name} on {appointmentDate.toLocaleString().substring(0,10)}
                </StatusModal>
            }
            {status === fetchStatus.SYSTEM_ERROR &&
                <StatusModal type={statusType.ERROR} ok={dismissDialog}>
                    We are currently experiencing some issues. Please try again later.
                </StatusModal>
            }
            {status === fetchStatus.NETWORK_ERROR &&
                <StatusModal type={statusType.ERROR} ok={dismissDialog}>
                    Unable to contact server. Please try again later.
                </StatusModal>
            }
        </div>
    );
};