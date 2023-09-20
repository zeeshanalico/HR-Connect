import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../../constants';
import { FormControl, InputGroup } from 'react-bootstrap';
import '../../BasicStyle.css';

const AttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [status, setStatus] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [empIdFilter, setEmpIdFilter] = useState('');

  console.log(status);
  console.log(attendanceHistory);

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getattendancehistory');
      setAttendanceHistory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data attendence history:', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData()
  }, []);
  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Employee Attendance History</h2>
      <InputGroup className="mb-4">
      </InputGroup >
      <div id="content">
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>
                <input
                  type="text"
                  placeholder="Employee Name      "
                  value={nameFilter}
                  style={{
                    border: "none",
                    height: "30px",
                    outline: "none",
                    "::placeholder": {
                      color: 'blue'
                  },
                    backgroundColor: "transparent",
                  }}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </th>
              <th>Date : 
                <input
                  type="date"
                  style={{
                    border: "none",
                    height: "30px",
                    outline: "none",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    ":placeholder": {
                      color: 'black'
                    },
                  }}
                  placeholder="Select Date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </th>
              <th>
                <select
                  value={status}
                  style={{
                    border: "none",
                    height: "30px",
                    outline: "none",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                  className="form-control round"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={'All'}>Status</option>
                  <option value={'Late'}>Late</option>
                  <option value={'Leave'}>Leave</option>
                  <option value={'Present'}>Present</option>
                </select>

              </th>
            </tr>
          </thead>
          <tbody>
            {attendanceHistory
              // .filter((emp) =>
              //   status === 'All' || emp.status.toLowerCase() === status.toLowerCase()
              // )
              .filter((emp) =>
                (status === 'All' || emp.status.toLowerCase() === status.toLowerCase()) &&
                (dateFilter === '' || emp.attendance_date.includes(dateFilter)) &&
                (nameFilter === '' || emp.name.toLowerCase().includes(nameFilter.toLowerCase()))
              )
              .map((emp, index) => (
                <tr key={index}
                  className={emp.status === 'Leave' ? 'table-warning' : emp.status === 'Present' ? 'table-success' : 'table-danger'}
                >
                  <td>{emp.emp_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.attendance_date.slice(0, 10)}</td>
                  <td style={{ color: emp.status === 'Leave' ? 'grey' : emp.status === 'Present' ? 'green' : 'red' }}>
                    {emp.status}
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;

