import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl, config } from '../../../constants';
import '../BasicStyle.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Toast from '../../../UIModules/Toast/Toast';
const ViewDepartment = () => {
  const [departmentList, setDepartmentList] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [departmentToRemove, setDepartmentToRemove] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [depId, setDepId] = useState('');
  const [depName, setDepName] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepInfo', config);
      setDepartmentList(response.data[0]);
    } catch (error) {
      Toast('cache error', 'error')
      console.error('Error fetching deplist :', error);
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
        Toast(` ${response.data.message}`, 'success')
      }
    } catch (e) {
      console.log(e);
      Toast("Error : -", 'error')
    }
    await fetchData();
    setShowAddForm(false);
    setNewDepartmentName("");
  }

  const handleRemoveDepartment = async () => {
    try {
      const response = await axios.post(BaseUrl + '/deleteDep', { dep_id: depId }, config)
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success')
        setShowConfirmation(false);
        await fetchData();
      }
      else {
        Toast(`${response.data.message}`, "error")
        console.log("Error occured", response.data.message);
        setShowConfirmation(false);
      }
    } catch (e) {
      console.log(e);
    }
    setShowConfirmation(false)
  };


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
            {departmentList.map(department => (
              <tr key={department.dep_id}>
                <td>{department.dep_id}</td>
                <td>{department.dep_name}</td>
                <td>{department.total_employees}</td>
                <td><button
                  type="button"
                  className="btn btn-danger"
                  // style={{backgroundColor:'#FF2400'}}
                  onClick={() => {
                    setDepId(department.dep_id)
                    setDepName(department.dep_name)
                    setShowConfirmation(true)
                  }
                  }
                >
                  Remove
                </button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={() => { setShowAddForm(true) }}>
            Add New Department
          </button>
        </div>


        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <span style={{color:'red',fontWeight:'bold'}}>Warning!</span><span style={{ color: "red", fontSize: "12px" }}>
            <strong> If you Remove the Department it will also remove  all its employees and their related records like attendence etc.</strong>
            </span>
            <br />
            Are you sure you want to remove <strong>{depName}</strong> Department?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
              No
            </Button>
            <Button variant="danger" onClick={handleRemoveDepartment}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

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
