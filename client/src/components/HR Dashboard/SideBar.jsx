import React from 'react';
import './SideBar.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link as RouterLink } from "react-router-dom";
import hrconnect from '../../assets/img/HR_Connect.jpg.jpg';
{/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';*/}

   
 
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
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-users font-weight-bold"></i> <span className="ml-3">Employee</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
              <RouterLink to="/hrdash/addEmployee">
                <Dropdown.Item href="/">
                  <i className="fas fa-user-plus"></i> Add Employee
                </Dropdown.Item>
              </RouterLink>
           {/*   <Dropdown.Item href="#">
                <i className="fas fa-user-minus"></i> Remove Employee
  </Dropdown.Item> */}
              <RouterLink to="/hrdash/manageEmployee">
                <Dropdown.Item href="/">
                  <i className="fas fa-users"></i> Manage Employee
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
              <RouterLink to="/hrdash/todayAttendance">
                <Dropdown.Item href="/">
                  <i className="far fa-calendar-check"></i> Today's Attendance
                </Dropdown.Item>
              </RouterLink>
              <RouterLink to="/hrdash/attendanceHistory">
                <Dropdown.Item href="/">
                  <i className="far fa-calendar-alt"></i> Employee Attendance History
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
        <li className="nav-item mb-2">
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-sitemap font-weight-bold"></i> <span className="ml-3">Departments</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
        {/*      <Dropdown.Item href="#">
                <i className="fas fa-plus-circle"></i> Add Department
</Dropdown.Item> */}
              <RouterLink to="/hrdash/viewDepartment">
                <Dropdown.Item href="/">
                  <i className="fas fa-sitemap"></i> View Departments
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
              <RouterLink to="/hrdash/leaveApplication">
                <Dropdown.Item href="/">
                  <i className="far fa-envelope font-weight-bold"></i> Leave Application
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
         <li className="nav-item mb-2">
          <Dropdown as="div" className="position-static">
            <Dropdown.Toggle variant="link" className="nav-link text-secondary">
              <i className="fas fa-briefcase font-weight-bold"></i> <span className="ml-3">Hiring</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute">
              {/* Add the Post a Job link */}
              <RouterLink to="/hrdash/postJob">
                <Dropdown.Item href="/">
                  <i className="fas fa-plus-circle"></i> Post a Job
                </Dropdown.Item>
              </RouterLink>
              <RouterLink to="/hrdash/viewJobApplications">
                <Dropdown.Item href="/">
                <RouterLink to="/hrdash/viewApplications"><i className="fas fa-eye"></i> View Job Applications</RouterLink>
                </Dropdown.Item>
              </RouterLink>
            </Dropdown.Menu>
          </Dropdown>
        </li>
      </ul>
    </div>
  );
}


  
   
   
   
   
   /* <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <li className="nav-item mb-2">
    <a className="nav-link text-secondary" href="#"><i className="fas fa-home font-weight-bold"></i> <span className="ml-3">Dashboard</span></a>
</li>
<li className="nav-item mb-2">
    <button className="nav-link text-secondary" id="employeeDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-users font-weight-bold"></i> <span className="ml-3">Employees▾</span>
    </button>
    <div className="dropdown-menu" aria-labelledby="employeeDropdown">
        <a className="dropdown-item" href=""><i className="fas fa-user-plus"></i> Add Employees</a>
        <a className="dropdown-item" href=""><i className="fas fa-user-minus"></i> Remove Employees</a>
        <a className="dropdown-item" href=""><i className="fas fa-users"></i> View Employees</a>
    </div>
</li>
<li className="nav-item mb-2">
    <a className="nav-link text-secondary" href="#" id="attendanceDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Attendance▾</span>
    </a>
    <div className="dropdown-menu" aria-labelledby="attendanceDropdown">
        <a className="dropdown-item" href=""><i className="far fa-calendar-check"></i> View Today's Attendance</a>
        <a className="dropdown-item" href=""><i className="far fa-calendar-alt"></i> Employee Attendance History</a>
    </div>
</li>
<li className="nav-item mb-2">
    <a className="nav-link text-secondary" href="#" id="departmentDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-sitemap font-weight-bold"></i> <span className="ml-3">Departments▾</span>
    </a>
    <div className="dropdown-menu" aria-labelledby="departmentDropdown">
        <a className="dropdown-item" href=""><i className="fas fa-plus-circle"></i> Add Department</a>
        <a className="dropdown-item" href=""><i className="fas fa-sitemap"></i> View Departments</a>
    </div>
</li>
<li className="nav-item mb-2"><a className="nav-link text-secondary" href="#"><i className="far fa-calendar-alt font-weight-bold"></i> <span className="ml-3">Leaves</span></a></li>
  */