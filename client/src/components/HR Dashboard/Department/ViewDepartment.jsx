import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../constants';
import '../BasicStyle.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Toast from '../../../UIModules/Toast/Toast';
const ViewDepartment = () => {
  const [departmentList, setDepartmentList] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  // const [showConfirmation, setShowConfirmation] = useState(false);
  // const [departmentToRemove, setDepartmentToRemove] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepInfo');
      setDepartmentList(response.data[0]);
    } catch (error) {
      console.error('Error fetching deplist :', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleAddDepartment = (e) => {
    setNewDepartmentName(e);
  };

  const submitHandler = async (event) => {
    // event.preventDefault();
    console.log(newDepartmentName);
    try {
      const response = await axios.post(BaseUrl + '/addDepartment', { newDepartmentName });
      if (response.data.success) {
        Toast(`Success ${response.data.success}, -  Message : ${response.data.message}`, 'info')
      }
    } catch (e) {
      console.log(e);
      Toast("Error : -", 'error')
    }
    await fetchData();
    setShowAddForm(false);
    setNewDepartmentName("");
  }

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleShowConfirmation = (departmentId) => {
  //   setDepartmentToRemove(departmentId);
  //   setShowConfirmation(true);
  // };

  // const handleHideConfirmation = () => {
  //   setDepartmentToRemove(null);
  //   setShowConfirmation(false);
  // };

  // const handleRemoveDepartment = () => {
  //   const updatedDepartments = departmentList.filter(department => department.id !== departmentToRemove);
  //   setDepartmentList(updatedDepartments);
  //   handleHideConfirmation();
  // };

  // const handleShowAddForm = () => {
  //   setShowAddForm(true);
  // };

  // const handleHideAddForm = () => {
  //   setShowAddForm(false);
  //   setNewDepartmentName('');
  //   setNewDepartmentEmployees(0);
  // };




  // const filteredDepartments = departmentList.filter(
  //   department => department.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );   

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
            </tr>
          </thead>
          <tbody>
            {departmentList.map(department => (
              <tr key={department.dep_id}>
                <td>{department.dep_id}</td>
                <td>{department.dep_name}</td>
                <td>{department.total_employees}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => { setShowAddForm(true) }}>
            Add New Department
          </button>
        </div>

        {/* 
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
      </Modal> */}

        <Modal show={showAddForm} onHide={() => { setShowAddForm(false) }}>
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
                  onChange={(e) => { handleAddDepartment(e.target.value) }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowAddForm(false) }}>
              Cancel
            </Button>
            <Button variant="primary" onClick={submitHandler}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ViewDepartment;
