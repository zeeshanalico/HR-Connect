import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl, config, inputStyle } from '../../../../constants';
import '../../BasicStyle.css';
import Toast from '../../../../UIModules/Toast/Toast';
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
      const response = await axios.get(BaseUrl + '/getattendancehistory', config);
      setAttendanceHistory(response.data);
    } catch (error) {
      Toast('Error catch', 'error');
      console.error('Error fetching data attendance history:', error);
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
        (status === 'All' || emp.status?.toLowerCase() === status?.toLowerCase()) &&
        (date === '' || emp.attendance_date?.includes(date)) &&
        (emp_id === '' || emp.emp_id.toString().includes(emp_id)) &&
        (name === '' || emp?.name?.toLowerCase().includes(name.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortByDate === 'asc') {
        return a.attendance_date?.localeCompare(b.attendance_date) || 0; // Add null/undefined check
      } else if (sortByDate === 'desc') {
        return b.attendance_date?.localeCompare(a.attendance_date) || 0; // Add null/undefined check
      } else {
        return 0; // No sorting by date
      }
    }); const indexOfLastItem = currentPage * itemsPerPage;
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
        <div>
          <input
            type="text"
            placeholder="Search by Employee Name"
            name="name"
            value={filters.name}
            style={{ width: "48%", display: 'inline', ...inputStyle }}
            className="form-control"

            onChange={handleFilterChange}
          />
          <input
            type="text"
            placeholder="Search by Employee ID"
            style={{ width: "48%", display: 'inline', marginLeft: '20px', ...inputStyle }}
            className="form-control"
            name="emp_id"
            value={filters.emp_id}
            onChange={handleFilterChange}
          />
        </div>
        <div className="items-per-page">
          <select
            name="status"
            value={filters.status}
            style={{ display: 'inline', width: '475px', margin: '8px 20px 8px 0', ...inputStyle, WebkitAppearance: 'none' }}
            onChange={handleFilterChange}
            className="form-control"
          >
            <optgroup>Items/Page</optgroup>
            <option value={'All'}>Search by Status</option>
            <option value={'Absent'}>Absent</option>
            <option value={'Leave'}>Leave</option>
            <option value={'Present'}>Present</option>
          </select>
          <select
            className="form-control"
            style={{ display: 'inline', width: '475px' }}
            value={sortByDate}
            onChange={handleSortByDateChange}
          >
            <option style={{ display: 'none' }} value="All">Sort By Attendence Date</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                Employee ID
              </th>
              <th>
                Employee Name
              </th>
              <th>Attendence Date</th>
              <th>Status</th>
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
        <div style={{ display: 'flex', margin: 'auto' }}>
          <select
            style={{ display: 'inline', flex: '0', width: '70px', marginRight: '5px' }}
            className="form-control"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <optgroup label='Items/Page'></optgroup>
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pagination" style={{ flex: "1" }}>
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
    </div>
  );
};

export default AttendanceHistory;
