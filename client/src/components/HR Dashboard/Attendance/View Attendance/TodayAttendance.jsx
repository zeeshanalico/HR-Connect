import React from 'react'
import { useState } from 'react';
import '../../BasicStyle.css'

const sampleAttendanceData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    department: 'Engineering',
    phoneNumber: '123-456-7890',
    email: 'john.doe@example.com',
    isPresent: true,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    department: 'HR',
    phoneNumber: '987-654-3210',
    email: 'jane.smith@example.com',
    isPresent: false,
  },
  {
    id: 3,
    firstName: 'Ali',
    lastName: 'Arshad',
    department: 'Engineering',
    phoneNumber: '987-654-3210',
    email: 'ali_xyz@example.com',
    isPresent: true,
  },
  {
    id: 4,
    firstName: 'Afraz',
    lastName: 'Asher',
    department: 'Engineering',
    phoneNumber: '987-654-3210',
    email: 'afraz_xyz@example.com',
    isPresent: true,
  },
  {
    id: 5,
    firstName: 'Ahmad',
    lastName: 'Ali',
    department: 'HR',
    phoneNumber: '987-654-3210',
    email: 'ahmad_xyz@example.com',
    isPresent: false,
  },
  // ... Add more sample attendance data
];

const TodayAttendance = () => {
  const [attendanceData, setAttendanceData] = useState(sampleAttendanceData);
  const [attendanceStatus, setAttendanceStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('');

  const handleAttendanceStatusChange = (status) => {
    setAttendanceStatus(status);
  };

  const handleFilterDepartmentChange = (department) => {
    setFilterDepartment(department);
  };

  const filteredAttendance = attendanceData.filter(employee => {
    const byStatus =
      attendanceStatus === 'all' || (attendanceStatus === 'present' && employee.isPresent) || (attendanceStatus === 'absent' && !employee.isPresent);
    const byDepartment = filterDepartment === '' || employee.department === filterDepartment;
    return byStatus && byDepartment;
  });

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Today's Attendance</h2>
<div id="content">
      <div className="mb-3">
        <label htmlFor="attendanceStatus" className="form-label">Filter by Status:</label>
        <select
          className="form-select"
          id="attendanceStatus"
          value={attendanceStatus}
          onChange={(e) => handleAttendanceStatusChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="filterDepartment" className="form-label">Filter by Department:</label>
        <select
          className="form-select"
          id="filterDepartment"
          value={filterDepartment}
          onChange={(e) => handleFilterDepartmentChange(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          {/* Add more department options */}
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Email Address</th>
            <th>Department</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.map(employee => (
            <tr
              key={employee.id}
              className={employee.isPresent ? 'table-success' : 'table-danger'}
            >
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.isPresent ? 'Present' : 'Absent'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TodayAttendance;
