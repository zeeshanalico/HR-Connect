import React from 'react'
import '../../BasicStyle.css'
import { useState, useEffect } from 'react';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl } from '../../../../constants';
import axios from 'axios';
import { InputGroup, FormControl } from 'react-bootstrap';




const TodayAttendance = () => {
  const [todayAllAttendance, setTodayAllAttendence] = useState([]);
  const [status, setStatus] = useState('All');

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getTodayAllAttendance');
      setTodayAllAttendence(response.data);
    } catch (error) {
      console.error('Error fetching data jobpositons:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Today's Attendance</h2>
      <div id="content">
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>
                <select style={{ border: "none", height: "30px", outline: " none", cursor: 'pointer', backgroundColor: "transparent" }} name="status" className="form-control round" onChange={(e) => setStatus(e.target.value)}>
                  <option value={'All'}>Status</option>
                  <option value={'Late'} >Late</option>
                  <option value={'Leave'} >Leave</option>
                  <option value={'Present'} >present</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {todayAllAttendance
              .filter((employee) =>
                status === 'All' || employee.status.toLowerCase() === status.toLowerCase()
              )
              .map(employee => (
                <tr
                  key={employee.emp_id}
                  className={employee.status === 'Leave' ? 'table-warning' : employee.status === 'Present' ? 'table-success' : 'table-danger'}
                >
                  <td>{employee.emp_id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.dep_name}</td>
                  <td>{employee.phone_number}</td>
                  <td style={{ color: employee.status === 'Leave' ? 'grey' : employee.status === 'Present' ? 'green' : 'red' }}>{employee.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodayAttendance;
