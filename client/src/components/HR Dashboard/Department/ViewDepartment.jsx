import React from 'react'
import { useState } from 'react';
import '../BasicStyle.css';
import { Modal, Button, Form } from 'react-bootstrap';

const sampleDepartmentData = [
    {
      id: 1,
      name: 'Sales',
      employees: [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
      ],
    },
    {
      id: 2,
      name: 'Marketing',
      employees: [
        { id: 3, firstName: 'Alice', lastName: 'Johnson' },
        { id: 4, firstName: 'Bob', lastName: 'Williams' },
      ],
    },
    {
      id: 3,
      name: 'Finance',
      employees: [
        { id: 5, firstName: 'Michael', lastName: 'Brown' },
        { id: 6, firstName: 'Emily', lastName: 'Davis' },
      ],
    },
    // ... Add more departments
  ];


const ViewDepartment = () => {
  const [departmentList, setDepartmentList] = useState(sampleDepartmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [departmentToRemove, setDepartmentToRemove] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDepartmentEmployees, setNewDepartmentEmployees] = useState(0);
 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowConfirmation = (departmentId) => {
    setDepartmentToRemove(departmentId);
    setShowConfirmation(true);
  };

  const handleHideConfirmation = () => {
    setDepartmentToRemove(null);
    setShowConfirmation(false);
  };

  const handleRemoveDepartment = () => {
    const updatedDepartments = departmentList.filter(department => department.id !== departmentToRemove);
    setDepartmentList(updatedDepartments);
    handleHideConfirmation();
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
    setNewDepartmentName('');
    setNewDepartmentEmployees(0);
  };

  const handleAddDepartment = () => {
    const newDepartment = {
      id: departmentList.length + 1,
      name: newDepartmentName,
      employees: Array.from({ length: newDepartmentEmployees }, (_, index) => ({
        id: index + 1,
        firstName: `Employee ${index + 1}`,
      })),
    };
    setDepartmentList([...departmentList, newDepartment]);
    handleHideAddForm();
  };



  const filteredDepartments = departmentList.filter(
    department => department.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">View Departments</h2>
<div id="content">
      <div className="mb-3">
        {/* Search input */}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number of Employees</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map(department => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.employees.length}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleShowConfirmation(department.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleShowAddForm}>
          Add New Department
        </button>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleHideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this department?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRemoveDepartment}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddForm} onHide={handleHideAddForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Number of Employees</Form.Label>
              <Form.Control
                type="number"
                value={newDepartmentEmployees}
                onChange={(e) => setNewDepartmentEmployees(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideAddForm}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddDepartment}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
    </div>
  );
};

export default ViewDepartment;
