import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ApplyNow from "./components/ApplyNow/ApplyNow.jsx";


export default function App() {
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

          {/* //landing page routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/applyPage" element={<ApplyPage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/hrdash" element={<HrDashboard />} />
          <Route path="/empdash" element={<EmployeeDashboardPage />} />
          <Route path="/applyPage/applyNow" element={<ApplyNow />} />

          {/* //Employee's side routes */}
          <Route path="/empdash/viewProfile" element={<ViewProfilePage />} />
          <Route path="/empdash/markAttendance" element={<MarkAttendancePage />} />
          <Route path="/empdash/AttendanceRecord" element={<AttendanceRecordPage />} />
          <Route path="/empdash/submitLeave" element={<SubmitLeavePage />} />
          <Route path="/empdash/leaveStatus" element={<LeaveStatusPage />} />

          {/* // HR's side routes */}
          <Route path="/hrdash/addEmployee" element={<AddEmployee />} />
          <Route path="/hrdash/manageEmployee" element={<ManageEmployeePage />} />
          <Route path="/hrdash/todayAttendance" element={<TodayAttendancePage />} />
          <Route path="/hrdash/attendanceHistory" element={<AttendanceHistoryPage />} />
          <Route path="/hrdash/viewDepartment" element={<ViewDepartmentPage />} />
          <Route path="/hrdash/leaveApplication" element={<LeaveApplicationPage />} />
          <Route path="/hrdash/viewApplications" element={<ViewApplicationsPage />} />
          <Route path="/hrdash/postJob" element={<PostJobPage />} />
        </Routes>
      </Router>
      <ContainerToast/>
    </>
  );
}
