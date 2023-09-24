import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../../constants';
import '../../BasicStyle.css';

const inputStyle = {
  border: 'none',
  height: '30px',
  outline: 'none',
  width:'fit-content',
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

const AttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [filters, setFilters] = useState({
    status: 'All',
    date: '',
    name: '',
    emp_id: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const itemsPerPageOptions = [5, 20, 50, 100];
  const [sortByDate, setSortByDate] = useState(''); // State for sorting by date

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
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    const selectedItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1);
  };

  const handleSortByDateChange = (e) => {
    const selectedSortByDate = e.target.value;
    setSortByDate(selectedSortByDate);
    setCurrentPage(1);
  };

  const filteredAndSortedAttendanceHistory = attendanceHistory
    .filter((emp) => {
      const { status, date, name, emp_id } = filters;
      return (
        (status === 'All' || emp.status.toLowerCase() === status.toLowerCase()) &&
        (date === '' || emp.attendance_date.includes(date)) &&
        (emp_id === '' || emp.emp_id.toString().includes(emp_id)) &&
        (name === '' || emp.name.toLowerCase().includes(name.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortByDate === 'asc') {
        return a.attendance_date.localeCompare(b.attendance_date);
      } else if (sortByDate === 'desc') {
        return b.attendance_date.localeCompare(a.attendance_date);
      } else {
        return 0; // No sorting by date
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedAttendanceHistory.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredAndSortedAttendanceHistory.length / itemsPerPage);

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
          <label style={{ marginLeft: '760px' }} className="mr-2">
            Show items per page:
          </label>
          <select
            style={{ display: 'inline', width: '70px' }}
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
              <th>
                <input
                  type="text"
                  placeholder="Employee id"
                  name="emp_id"
                  value={filters.emp_id}
                  style={inputStyle}
                  onChange={handleFilterChange}
                />
              </th>
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
              <th>
                <select
                  style={inputStyle}
                  className="form-control"

                  value={sortByDate}
                  onChange={handleSortByDateChange}
                >
                  <option style={{ display: 'none' }} value="All">Attedence Date</option>
                  {/* <option value="">All</option> */}
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select></th>
              <th>
                <select
                  name="status"
                  value={filters.status}
                  style={inputStyle}
                  onChange={handleFilterChange}
                >
                  <option value={'All'}>Status</option>
                  <option value={'Absent'}>Absent</option>
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
        <div className="pagination" style={{ margin: 'auto' }}>
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
              className={`page-link ${index + 1 === currentPage ? 'active-button' : ''}`}
              style={{
                backgroundColor: index + 1 === currentPage ? '#007BFF' : 'white',
                color: index + 1 === currentPage ? 'white' : 'black',
              }}
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
