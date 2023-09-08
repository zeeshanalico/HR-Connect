import React from 'react'
import { useState } from 'react';
import '../../BasicStyle.css';

const sampleEmployeeData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
  },
  // ... Add more employees
];

const sampleAttendanceHistory = [
  { date: '2023-08-01', status: 'present', employeeId: 1 },
  { date: '2023-08-02', status: 'absent', employeeId: 1 },
  { date: '2023-08-03', status: 'present', employeeId: 2 },
  // ... Add more attendance history data for the month
];

const AttendanceHistory = () => {
  const [employeeList] = useState(sampleEmployeeData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState(sampleAttendanceHistory);
  const [selectedMonth, setSelectedMonth] = useState('');
  
  const handleEmployeeSearch = (searchTerm) => {
    const foundEmployee = employeeList.find(
      employee => `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedEmployee(foundEmployee);
  };

  const handleMonthFilter = (month) => {
    setSelectedMonth(month);
  };

  const filteredAttendance = attendanceHistory.filter(record => {
    const isMatchingEmployee = selectedEmployee ? record.employeeId === selectedEmployee.id : true;
    const isMatchingMonth = selectedMonth ? record.date.startsWith(selectedMonth) : true;
    return isMatchingEmployee && isMatchingMonth;
  });

  const totalPresents = filteredAttendance.filter(record => record.status === 'present').length;
  const totalAbsents = filteredAttendance.filter(record => record.status === 'absent').length;

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Employee Attendance History</h2>
      <div id="content">
        <div className="mb-3">
          <label htmlFor="employeeSearch" className="form-label">Search Employee:</label>
          <input
            type="text"
            className="form-control"
            id="employeeSearch"
            placeholder="Employee Name"
            onChange={(e) => handleEmployeeSearch(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="monthFilter" className="form-label">Select Month:</label>
          <input
            type="month"
            className="form-control"
            id="monthFilter"
            value={selectedMonth}
            onChange={(e) => handleMonthFilter(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <p>Total Presents: {totalPresents}</p>
          <p>Total Absents: {totalAbsents}</p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map(record => (
              <tr key={record.date} className={record.status === 'present' ? 'table-success' : 'table-danger'}>
                <td>{record.date}</td>
                <td>{record.status === 'present' ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;

