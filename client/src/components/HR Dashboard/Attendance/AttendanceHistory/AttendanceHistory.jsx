import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../../constants';
import '../../BasicStyle.css';

const inputStyle = {
  border: 'none',
  height: '30px',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

const AttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [filters, setFilters] = useState({
    status: 'All',
    date: '',
    name: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const itemsPerPageOptions = [5, 20, 50, 100]; // Options for items per page

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getattendancehistory');
      setAttendanceHistory(response.data);
    } catch (error) {
      console.error('Error fetching data attendance history:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  // Filter the attendanceHistory based on filters
  const filteredAttendanceHistory = attendanceHistory.filter((emp) => {
    const { status, date, name } = filters;
    return (
      (status === 'All' || emp.status.toLowerCase() === status.toLowerCase()) &&
      (date === '' || emp.attendance_date.includes(date)) &&
      (name === '' || emp.name.toLowerCase().includes(name.toLowerCase()))
    );
  });

  // Calculate the range of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAttendanceHistory.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAttendanceHistory.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Employee Attendance History</h2>
      <div id="content">
        <div className="items-per-page">
          <label style={{marginLeft:"760px"}} className="mr-2">Show items per page:</label>
          <select style={{display:'inline',width:"70px"}}
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>
                <input
                  type="text"
                  placeholder="Employee Name"
                  name="name"
                  value={filters.name}
                  style={inputStyle}
                  onChange={handleFilterChange}
                />
              </th>
              <th>Attendance Date:</th>
              <th>
                <select
                  name="status"
                  value={filters.status}
                  style={inputStyle}
                  onChange={handleFilterChange}
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
            {currentItems.map((emp, index) => (
              <tr
                key={index}
                className={
                  emp.status === 'Leave'
                    ? 'table-warning'
                    : emp.status === 'Present'
                      ? 'table-success'
                      : 'table-danger'
                }
              >
                <td>{emp.emp_id}</td>
                <td>{emp.name}</td>
                <td>{emp.attendance_date ? emp.attendance_date.slice(0, 10) : ''}</td>
                <td
                  style={{
                    color:
                      emp.status === 'Leave'
                        ? 'grey'
                        : emp.status === 'Present'
                          ? 'green'
                          : 'red',
                  }}
                >
                  {emp.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
