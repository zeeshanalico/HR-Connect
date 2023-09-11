import React from 'react'
import { useState, useEffect } from 'react';
import '../../BasicStyle.css'
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { BaseUrl } from './../../../../constants.js'
import Toast from '../../../../UIModules/Toast/Toast';
import { Dropdown } from 'react-bootstrap';
import FilterSearch from '../../../../UIModules/FilterSearch';


const ManageEmployee = () => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleFilter = (filteredData) => {
    setFilteredResults(filteredData);
  };

  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState('');
  // const [searchName, setSearchName] = useState('');
  // const [filterDepartment, setFilterDepartment] = useState('');
  // const [searchId, setSearchId] = useState('');
  // const [employeeToRemove, setEmployeeToRemove] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getEmployees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching roles :', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [])



  // const filteredEmployees = employees.filter(employee => {
  //   return (
  //     employee.firstName.toLowerCase().includes(searchName.toLowerCase()) &&
  //     (filterDepartment === '' || employee.department === filterDepartment) &&
  //     (searchId === '' || employee.id.toString() === searchId)
  //   );
  // });

  const handleRemoveEmployee = async () => {
    console.log(empId);
    try {
      const response = await axios.post(BaseUrl + '/removeEmployee', { emp_id: empId })
      if (response.data.success) {
        Toast("Employee Removed from Database", 'info')
        await fetchData();
      }
      else {
        Toast(`Success : ${response.data.success} - Message : ${response.data.message}`)
        console.log("Error occured", response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setShowConfirmation(false)
  };

  // pagination and itemsperpage
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // const handleConfirmRemove = () => {
  //   const updatedEmployees = employees.filter(employee => employee.id !== employeeToRemove);
  //   setEmployees(updatedEmployees);
  //   setEmployeeToRemove(null);
  //   setShowConfirmation(false);
  // };

  // const handleCancelRemove = () => {
  //   setEmployeeToRemove(null);
  //   setShowConfirmation(false);
  // };

  return (
    <div id="full-content" className="container mt-3">
      <h2 className="mb-4">Manage Employee</h2>
      {/* <div id="content">
        <div className="mb-3">
          <label htmlFor="searchName" className="form-label">Search by Name:</label>
          <input
            type="text"
            className="form-control"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div> */}

      {/* <div className="mb-3">
          <label htmlFor="filterDepartment" className="form-label">Filter by Department:</label>
          <br />
          <select
            className="form-select"
            id="filterDepartment"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
          <option value="">All</option>
            <option value="Engineering">Engineering</option>
            <option value="HR">HR</option>
          </select>
        </div> */}

      {/* <div className="mb-3">
        <label htmlFor="searchId" className="form-label">Search by Employee ID:</label>
        <input
          type="text"
          className="form-control"
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div> */}
      <div className="content">
        <div className="d-flex justify-content-start mb-3">
          <FilterSearch style={{ width: '300px' }} data={employees} onFilter={handleFilter} className="float-right" onFocus={() => { setFocus(true) }} />
          <label htmlFor="itemsPerPage" className="form-label me-2">
            Items Per Page:
          </label>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="itemsPerPageDropdown" style={{ width: '70px' }}>
              {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '70px', left: 'auto', right: '0' }}>
              <Dropdown.Item onClick={() => setItemsPerPage(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(50)}>50</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>




      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Job</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {focus ? (filteredResults.map(employee => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.job_name}</td>
              <td>{employee.dep_name}</td>
              <td>{employee.gender}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setEmpId(employee.emp_id)
                    setShowConfirmation(true)
                  }
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          ))) : (displayedEmployees.map(employee => (
            <tr key={employee.emp_id}>
              <td>{employee.emp_id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.job_name}</td>
              <td>{employee.dep_name}</td>
              <td>{employee.gender}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setEmpId(employee.emp_id)
                    setShowConfirmation(true)
                  }
                  }
                >
                  Remove
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
      {/* </div> */}

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmation}
        onHide={() => { setShowConfirmation(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this employee?  <br /> Because it will also remove the Account of Employee.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
            handleRemoveEmployee()
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEmployee;
