import React, { useState, useEffect } from 'react';
import { BaseUrl, config } from '../../../../constants';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Toast from '../../../../UIModules/Toast/Toast';
import ReactPaginate from 'react-paginate';

const TodayAttendance = () => {
  const [todayAllAttendance, setTodayAllAttendance] = useState([]);
  const [status, setStatus] = useState('All');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getTodayAllAttendance', config);
      setTodayAllAttendance(response.data);
    } catch (error) {
      Toast('catch Error', 'error')
      console.error('Error fetching data jobpositions:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(0); // Reset to first page when changing items per page
  };

  // Apply filtering to the entire dataset
  const filteredAttendance = todayAllAttendance.filter((employee) =>
    status === 'All' || employee.status.toLowerCase() === status.toLowerCase()
  );

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Today's Attendance</h2>
      <div id="content">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' ,margin:'10px' }}>
          <select name="status" className="form-control round" style={{width:'250px'}} onChange={(e) => setStatus(e.target.value)}>
            <option value={''} style={{display:'none'}}>Search by Attendance Status</option>
            <option value={'All'}>All</option>
            <option value={'Absent'}>Absent</option>
            <option value={'Leave'}>Leave</option>
            <option value={'Present'}>Present</option>
          </select>

          <label htmlFor="itemsPerPageSelect" style={{ marginRight: '-100px',marginLeft:'500px' }}>Items per Page:</label>
          <select
            id="itemsPerPageSelect"
            className="form-control"
            value={itemsPerPage}
            style={{ width: '70px', marginLeft: '70px' }}
            onChange={handleItemsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>


        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Phone Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(employee => (
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
        <div style={{ margin: 'auto' }}>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredAttendance.length / itemsPerPage)}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"} // Add this class
            pageLinkClassName={"page-link"} // Add this class
            previousClassName={"page-item"} // Add this class
            previousLinkClassName={"page-link"} // Add this class
            nextClassName={"page-item"} // Add this class
            nextLinkClassName={"page-link"} // Add this class
          />
        </div>
      </div>
    </div>
  );
};

export default TodayAttendance;
