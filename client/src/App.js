import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ContainerToast from './UIModules/Toast/ContainerToast'

// Screens 
import Landing from "./screens/Landing.jsx";
import LoginPage from "./components/Login/LoginPage.jsx";
import ApplyPage from "./components/ApplyNow/ApplyPage.jsx";
import HrDashboard from "./components/HR Dashboard/HrDashboard.jsx";
import AddEmployee from "./components/HR Dashboard/Employee/Add Employee/AddEmployee.jsx";
import ManageEmployeePage from "./components/HR Dashboard/Employee/Manage Employee/ManageEmployeePage.jsx";
import TodayAttendancePage from "./components/HR Dashboard/Attendance/View Attendance/TodayAttendancePage.jsx";
import AttendanceHistoryPage from "./components/HR Dashboard/Attendance/AttendanceHistory/AttendanceHistoryPage.jsx";
import ViewDepartmentPage from "./components/HR Dashboard/Department/ViewDepartmentPage.jsx";
import LeaveApplicationPage from "./components/HR Dashboard/Leave/Leave Application/LeaveApplicationPage.jsx";
import ViewApplicationsPage from "./components/HR Dashboard/Hiring/Job Applications/ViewApplicationsPage.jsx";
import EmployeeDashboardPage from "./components/Employee Interface/Employee Dashboard/EmployeeDashboardPage.jsx";
import ViewProfilePage from "./components/Employee Interface/My Profile/ViewProfilePage.jsx";
import MarkAttendancePage from "./components/Employee Interface/Employee Attendance/Mark Attendance/MarkAttendancePage.jsx";
import AttendanceRecordPage from "./components/Employee Interface/Employee Attendance/Attendance Record/AttendanceRecordPage.jsx";
import SubmitLeavePage from "./components/Employee Interface/Leave/Submit Leave/SubmitLeavePage.jsx";
import LeaveStatusPage from "./components/Employee Interface/Leave/Leave Status/LeaveStatusPage.jsx";
import PostJobPage from "./components/HR Dashboard/Hiring/Job Posting/PostJobPage.jsx";
import RegisterUser from './components/RegisterUser/RegisterUser.js'
import ApplyNow from "./components/ApplyNow/ApplyNow.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { config, BaseUrl } from "./constants";
import axios from 'axios'
import Toast from "./UIModules/Toast/Toast";

export default function App() {

  const [loggedIn, updateStatus] = useState(false);
  console.log('loggedIn',loggedIn);
  const [roleID, setRoleID] = useState(null);

  useEffect(()=>{
    const Authenticate = async () => {

      try {
        const response = await axios.get(BaseUrl + '/decodeToken', config);
        if (response.data.success) {
          setRoleID(response.data.role_id)
          updateStatus(true);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Error while decoding token:', error);
        return false;
      }
    }
    Authenticate();
  }, []);

  const renderRoute = (element, allowedRole) => {
    if (roleID === allowedRole) {
      return element;
    } else {
      return <Navigate to="/Login" />; // Redirect to a different route if not allowed
    }
  };

  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Khula:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap" rel="stylesheet" />

      </Helmet>

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

      <Router>
        <Routes>

          <Route path="/" element={<Landing />} />
           <Route path="/login" element={<LoginPage/>} />
          <Route path="/applyPage" element={<ApplyPage />} />
          <Route path="/hrdash" element={<HrDashboard />} />
          <Route path="/empdash" element={<EmployeeDashboardPage />} />
          <Route path="/applyPage/applyNow" element={<ApplyNow />} />

          {/* //Employee's side routes */}
          <Route path="/empdash/viewProfile" element={renderRoute(<ViewProfilePage />, 2)} />
          <Route path="/empdash/markAttendance" element={renderRoute(<MarkAttendancePage />, 2)} />
          <Route path="/empdash/AttendanceRecord" element={renderRoute(<AttendanceRecordPage />, 2)} />
          <Route path="/empdash/submitLeave" element={renderRoute(<SubmitLeavePage />, 2)} />
          <Route path="/empdash/leaveStatus" element={renderRoute(<LeaveStatusPage />, 2)} />


          <Route path="/hrdash/addEmployee" element={<AddEmployee />} />
          <Route path="/hrdash/addEmployee" element={renderRoute(<AddEmployee />, 1)} />
          <Route path="/hrdash/manageEmployee" element={renderRoute(<ManageEmployeePage />, 1)} />
          <Route path="/hrdash/todayAttendance" element={renderRoute(<TodayAttendancePage />, 1)} />
          <Route path="/hrdash/attendanceHistory" element={renderRoute(<AttendanceHistoryPage />, 1)} />
          <Route path="/hrdash/viewDepartment" element={renderRoute(<ViewDepartmentPage />, 1)} />
          <Route path="/hrdash/leaveApplication" element={renderRoute(<LeaveApplicationPage />, 1)} />
          <Route path="/hrdash/viewApplications" element={renderRoute(<ViewApplicationsPage />, 1)} />
          <Route path="/hrdash/postJob" element={renderRoute(<PostJobPage />, 1)} />

          <Route path="/RegisterEmployee" element={<RegisterUser />} />

          <Route path="*" element={<PageNotFound />} />

        </Routes>
      </Router>
      <ContainerToast />
    </>
  );
}
