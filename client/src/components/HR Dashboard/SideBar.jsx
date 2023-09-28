import React from 'react';
import './SideBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link as RouterLink } from "react-router-dom";
import hrconnect from '../../assets/img/HR_Connect.jpg.jpg';

export default function SideBar() {
  return (
    <div id="sidebar" role="navigation" style={{ backgroundColor: "#e9ecef" }}>
      <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-2 " id="sidebar-content">

        <img className="ml-5 mb-4" src={hrconnect} alt="logo" height={90} width={90} />

        <li className="nav-item mb-2">
          <RouterLink to="/hrdash">
            <a className="nav-link text-secondary" href="/">
              <i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span>
            </a>
          </RouterLink>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-users font-weight-bold"></i> <span className="ml-3">Employee</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={RouterLink} to="/hrdash/addEmployee">
                <i className="fas fa-user-plus"></i> Add Employee
              </Dropdown.Item>
              <Dropdown.Item as={RouterLink} to="/hrdash/manageEmployee">
                <i className="fas fa-users"></i> Manage Employee
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Attendance</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={RouterLink} to="/hrdash/todayAttendance">
                <i className="far fa-calendar-check"></i> Today's Attendance
              </Dropdown.Item>
              <Dropdown.Item as={RouterLink} to="/hrdash/attendanceHistory">
                <i className="far fa-calendar-alt"></i> Employee Attendance History
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-sitemap font-weight-bold"></i> <span className="ml-3">Departments</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={RouterLink} to="/hrdash/viewDepartment">
                <i className="fas fa-sitemap"></i> View Departments
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Leave</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={RouterLink} to="/hrdash/leaveApplication">
                <i className="far fa-envelope font-weight-bold"></i> Leave Application
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-briefcase font-weight-bold"></i> <span className="ml-3">Hiring</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={RouterLink} to="/hrdash/postJob">
                <i className="fas fa-plus-circle"></i> Post a Job
              </Dropdown.Item>
              <Dropdown.Item as={RouterLink} to="/hrdash/viewApplications">
                <i className="fas fa-eye"></i> View Job Applications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        {/* Uncomment this section if needed */}
        {/* <li className="nav-item mb-2">
          <RouterLink to="/RegisterEmployee">
            <a className="nav-link text-secondary" href="/">
              <i className="fas fa-user font-weight-bold"></i> <span className="ml-3">Register User</span>
            </a>
          </RouterLink>
        </li> */}
      </ul>
    </div>
  );
}
