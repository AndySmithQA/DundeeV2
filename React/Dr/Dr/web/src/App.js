import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import "./App.scss";

import FrontPage from "./Features/FrontPage/Frontpage";

import PatientLogin from "./Features/Patient/Authentication/Login";
import PatientRegister from "./Features/Patient/Authentication/Register";
import PatientForgottenPassword from "./Features/Patient/Authentication/ForgottenPassword";
import PatientResetPassword from "./Features/Patient/Authentication/ResetPassword";
import PatientAuthentication from "./Features/Patient/Authentication/Authentication";
import PatientTermsOfUse from "./Features/Common/Notices/TermsOfUse";
import PatientDashboard from "./Features/Patient/Dashboard/Dashboard";
import PatientHome from "./Features/Patient/Dashboard/PatientHome";
import PatientAppointment from "./Features/Patient/Appointment/Appointment";
import BloodPressureChart from "./Features/Patient/HealthMonitoring/BloodPressureLineChart/BloodPressureLineChart";

import AdminAuthentication from "./Features/Admin/Authentication/Authentication";
import AdminDashboard from "./Features/Admin/Dashboard/Dashboard";
import AdminHome from "./Features/Admin/Dashboard/AdminHome";
import AdminAppointments from "./Features/Admin/Manage/Appointment";
import AdminPatients from "./Features/Admin/Manage/Patient";

import DoctorAuthentication from "./Features/Doctor/Authentication/Authentication";
import DoctorLogin from "./Features/Doctor/Authentication/Login";
import DoctorActivate from "./Features/Doctor/Authentication/Activation";
import DoctorDashboard from "./Features/Doctor/Dashboard/Dashboard";
import DoctorHome from "./Features/Doctor/Dashboard/DoctorHome";
import DoctorAppointments from "./Features/Doctor/Dashboard/Appointment";
import DoctorPatients from "./Features/Doctor/Dashboard/Patient";
import ManageDoctor from "./Features/Admin/Manage/ManageDoctor";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<FrontPage/>}></Route>

                <Route path="/patient" element={<PatientAuthentication/>}>
                    <Route index element={<PatientLogin/>}/>
                    <Route path="register" element={<PatientRegister/>}/>
                    <Route path="forgottenpassword" element={<PatientForgottenPassword/>}/>
                    <Route path="resetpassword/:token" element={<PatientResetPassword/>}/>
                    <Route path="termsofuse" element={<PatientTermsOfUse/>}/>
                </Route>
                <Route path="/patient/dashboard" element={<PatientDashboard/>}>
                    <Route index element={<PatientHome/>}/>
                    <Route path="appointment" element={<PatientAppointment/>}/>
                    <Route path="monitoring" element={<BloodPressureChart/>}/>
                </Route>

                <Route path="/admin" element={<AdminAuthentication/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}>
                    <Route index element={<AdminHome/>}/>
                    <Route path="manage-doctor" element={<ManageDoctor/>}/>
                    <Route path="appointments" element={<AdminAppointments/>}/>
                    <Route path="patients" element={<AdminPatients/>}/>
                </Route>

                <Route path="/doctor" element={<DoctorAuthentication/>}>
                    <Route index element={<DoctorLogin/>}/>
                    <Route path="activate/:token" element={<DoctorActivate/>}/>
                </Route>
                <Route path="/doctor/dashboard" element={<DoctorDashboard/>}>
                    <Route index element={<DoctorHome/>}/>
                    <Route path="appointments" element={<DoctorAppointments/>}/>
                    <Route path="patients" element={<DoctorPatients/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}