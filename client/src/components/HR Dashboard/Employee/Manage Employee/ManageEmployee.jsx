import React from 'react'
import { useState } from 'react';
import '../../BasicStyle.css'
import { Modal, Button, Form } from 'react-bootstrap';


const sampleEmployees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    department: 'Engineering',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    department: 'HR',
    email: 'jane.smith@example.com',
    phoneNumber: '987-654-3210',
  },
  // ... Add more sample employees
];

const ManageEmployee = () => {
  const [employees, setEmployees] = useState(sampleEmployees);
  const [searchName, setSearchName] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [searchId, setSearchId] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [employeeToRemove, setEmployeeToRemove] = useState(null);


  const filteredEmployees = employees.filter(employee => {
    return (
      employee.firstName.toLowerCase().includes(searchName.toLowerCase()) &&
      (filterDepartment === '' || employee.department === filterDepartment) &&
      (searchId === '' || employee.id.toString() === searchId)
    );
  });

  const handleRemoveEmployee = (employeeId) => {
    setEmployeeToRemove(employeeId);
    setShowConfirmation(true);
  };

  const handleConfirmRemove = () => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeToRemove);
    setEmployees(updatedEmployees);
    setEmployeeToRemove(null);
    setShowConfirmation(false);
  };

  const handleCancelRemove = () => {
    setEmployeeToRemove(null);
    setShowConfirmation(false);
  };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Manage Employee</h2>
      <div id="content">
      <div className="mb-3">
        <label htmlFor="searchName" className="form-label">Search by Name:</label>
        <input
          type="text"
          className="form-control"
          id="searchName"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="filterDepartment" className="form-label">Filter by Department:</label>
        <br/>
        <select
          className="form-select"
          id="filterDepartment"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">All</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
          {/* Add more department options */}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="searchId" className="form-label">Search by Employee ID:</label>
        <input
          type="text"
          className="form-control"
          id="searchId"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.department}</td>
              <td>
              <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveEmployee(employee.id)}
                  >
                    Remove
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

 {/* Confirmation Modal */}
 <Modal show={showConfirmation} onHide={handleCancelRemove}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this employee?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelRemove}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ManageEmployee;
