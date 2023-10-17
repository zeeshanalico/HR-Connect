import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link as RouterLink } from "react-router-dom";
import hrconnect from '../../../assets/img/HR_Connect.jpg.jpg';
import './EmployeeSideBar.css';

   
 
export default function EmployeeSideBar() {
  return (
    <div id="sidebar" className="p-2" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-4 mt-2 " id="sidebar-content">
      <img className="ml-5 mb-4" src={hrconnect} alt="logo" height={90} width={90} />
        <li className="nav-item mb-2">
          <RouterLink to="/empdash">
            <a className="nav-link text-secondary" href="/">
              <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span>
            </a>
          </RouterLink>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-user font-weight-bold"></i> <span className="ml-3">My Profile</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
              <RouterLink to="/empdash/viewProfile">
                <Dropdown.Item href="/">
                  <i className="fas fa-eye"></i> View Profile
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Attendance</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
              <RouterLink to="/empdash/markAttendance">
                <Dropdown.Item href="/">
                  <i className="far fa-calendar-check"></i> Mark Attendance
                </Dropdown.Item>
              </RouterLink>
              <RouterLink to="/empdash/AttendanceRecord">
                <Dropdown.Item href="/">
                  <i className="far fa-calendar-alt"></i> Attendance Record
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Leave</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
              <RouterLink to="/empdash/submitLeave">
                <Dropdown.Item href="/">
                  <i className="far fa-envelope"></i> Submit Leave Application
                </Dropdown.Item>
              </RouterLink>
              <RouterLink to="/empdash/leaveStatus">
                <Dropdown.Item href="/">
                  <i className="far fa-list-alt"></i> View Leave Status
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
}
