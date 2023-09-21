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

  const [employees, setEmployees] = useState([]);
  const [dep, setDep] = useState([])
  const [jobPositions, setJobPositions] = useState([])
  const [empId, setEmpId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedJobRole, setSelectedJobRole] = useState('All');


  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getEmployees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching roles :', error);
      throw error;
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobPositions');
      setJobPositions(response.data);
    } catch (error) {
      console.error('Error fetching data jobpositons:', error);
      throw error;
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      console.error('Error fetching data dep :', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData2();
  }, [])


  const handleRemoveEmployee = async () => {
    console.log(empId);
    try {
      const response = await axios.post(BaseUrl + '/removeEmployee', { emp_id: empId })
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success')
        setShowConfirmation(false);
        await fetchData();
      }
      else {
        Toast(`Success : ${response.data.success} - Message : ${response.data.message}`)
        console.log("Error occured", response.data.message);
        setShowConfirmation(false);
      }
    } catch (e) {
      console.log(e);
    }
    setShowConfirmation(false);
  };

  const [searchName, setSearchName] = useState('');

  // pagination and itemsperpage
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this as needed

  const filteredEmployees = employees.filter((employee) =>
    (selectedGender === 'All' || employee.gender === selectedGender) &&
    (selectedDepartment === 'All' || employee.dep_name === selectedDepartment) &&
    (selectedJobRole === 'All' || employee.job_name === selectedJobRole) &&
    (searchName === '' || employee.name.toLowerCase().includes(searchName.toLowerCase()))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredEmployees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="full-content" className="container mt-3">
      <h2 className="mb-4">Manage Employee</h2>
      <div className="content">
        <div className="d-flex justify-content-start mb-3">
          <div className="d-flex justify-content-start mb-3">
            <input
              type="text"
              placeholder="Search by Name"
              style={{ width: '350px', marginLeft: "-10px" }}

              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="form-control"
            />
          </div>

          <label htmlFor="itemsPerPage" className="form-label me-2" style={{ marginLeft: "550px" }}>
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
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th style={{ lineHeight: '34px' }}>Ph. #</th>
            <th>
              <select
                value={selectedJobRole}
                style={{
                  border: "none",
                  height: "40px",
                  outline: "none",
                  width: "150px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                className="form-control round"
                onChange={(e) => setSelectedJobRole(e.target.value)}
              >                <option value={'All'}>Job Position</option>

                {jobPositions.map((job => { return <option value={job.job_name}>{job.job_name}</option> }))}
              </select>
            </th>
            <th>
              <select
                value={selectedDepartment}
                style={{
                  border: "none",
                  height: "40px",
                  outline: "none",
                  width: "150px",
                  backgroundColor: "transparent",
                }}
                className="form-control round"
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >                <option value={'All'}>Department</option>

                {dep.map((department => { return <option value={department.dep_name}>{department.dep_name}</option> }))}
              </select>
            </th>
            <th>
              <select
                value={selectedGender}
                style={{
                  border: "none",
                  height: "35px",
                  outline: "none",
                  width: "100px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                className="form-control round"
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value={'All'}>Gender</option>
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
              </select>
            </th>
            <th style={{ lineHeight: '34px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedEmployees
            .filter((employee) =>
              (selectedGender === 'All' || employee.gender === selectedGender) &&
              (selectedDepartment === 'All' || employee.dep_name === selectedDepartment) &&
              (selectedJobRole === 'All' || employee.job_name === selectedJobRole) &&
              (searchName === '' || employee.name.toLowerCase().includes(searchName.toLowerCase()))
            )
            .map(employee => (
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
                    Terminate
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
