import React from 'react'
import { useState, useEffect } from 'react';
import { config } from './../../../../constants.js';
// import '../../BasicStyle.css'
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { BaseUrl } from './../../../../constants.js'
import Toast from '../../../../UIModules/Toast/Toast';
import ReactPaginate from 'react-paginate';
// import './ManageEmployee.css'
import styles from './ManageEmployee.module.css'
const ManageEmployee = () => {

  const [employees, setEmployees] = useState([]);
  const [dep, setDep] = useState([])
  const [jobPositions, setJobPositions] = useState([])
  const [empId, setEmpId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getEmployees', config);
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching roles :', error);
      Toast('Error catch :', 'error');
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobPositions');
      setJobPositions(response.data);
    } catch (error) {
      console.error('Error fetching data jobpositons:', error);
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

  // ------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    gender: '',
    jobPosition: '',
    empId: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const filteredEmployees = employees
    .filter((emp) => emp?.name?.toLowerCase()?.includes(filters.employeeName.toLowerCase()))
    .filter((emp) => emp?.gender?.toLowerCase()?.includes(filters.gender.toLowerCase()))
    .filter((emp) => emp?.job_name?.toLowerCase()?.includes(filters.jobPosition.toLowerCase()))
    .filter((emp) => emp?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
  const offset = currentPage * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(offset, offset + itemsPerPage);
  console.log('filteredEmployee ', filteredEmployees);
  const handleFilter = (filterType, value) => {
    console.log(filterType, value);
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(0);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);

  };
  // ------------------------------------------------------------------------------------------------
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
  
  return (
    <div id="full-content" className={`${styles.container}`}>
      <h2 className="mb-4">Manage Employee</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          id="employeeNameFilter"
          placeholder="Search by Employee Name                 🔍"
          className="form-control"
          value={filters.employeeName}
          onChange={(e) => handleFilter('employeeName', e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <div style={{ margin: '0 0 10px 500px' }}>items per page &ensp;</div>
        <select
          name="itemsPerPage"
          id="itemsPerPage"
          style={{ borderRadius: '8px', outline: 'none', padding: '9px', width: 'fitcontent', }}
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>


      <table className="table">
        <thead className={`${styles.header}`}>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th style={{ lineHeight: '34px' }}>Ph. #</th>
            <th>
              <select
                value={filters.employeeName}
                style={{
                  border: "none",
                  height: "40px",
                  outline: "none",
                  width: "150px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                autoComplete='off'
                className={`form-control round ${styles.searchin}`}
                onChange={(e) => handleFilter('jobPosition', e.target.value)}
              >
                <option value={'All'}>Job Position</option>
                {jobPositions.map((job => { return <option value={job.job_name}>{job.job_name}</option> }))}
              </select>
            </th>
            <th>
              <select
                value={filters.department}
                style={{
                  border: "none",
                  height: "40px",
                  outline: "none",
                  width: "150px",
                  backgroundColor: "transparent",
                }}
                className="form-control round"
                onChange={(e) => handleFilter('department', e.target.value)}
              >
                <option value={'All'}>Department</option>
                {dep.map((department => { return <option value={department.dep_name}>{department.dep_name}</option> }))}
              </select>
            </th>
            <th>
              <select
                value={filters.gender}
                style={{
                  border: "none",
                  height: "35px",
                  outline: "none",
                  width: "fitcontent",
                  cursor: "pointer",
                  backgroundColor: "transparent",

                }}
                className="form-control round"
                onChange={(e) => handleFilter('gender', e.target.value)}
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
          {currentEmployees
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
      <div style={{ margin: 'auto' }}>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(filteredEmployees.length / itemsPerPage)} // Use filteredApplications.length
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={'pagination'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
        />
      </div>

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
    </div>
  );
};

export default ManageEmployee;
