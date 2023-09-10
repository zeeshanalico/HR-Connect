import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../../../../constants';
import './../../../../../src/components/BasicStyle.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Toast from '../../../../UIModules/Toast/Toast';
const AttendanceRecord = () => {

  const [departmentList, setDepartmentList] = useState([]);
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

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">View Leaves</h2>
      <div id="content">

        {/* <Modal show={showAddForm} onHide={() => { setShowAddForm(false) }}>
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
        </Modal> */}
      </div>
    </div>
  );
};

export default AttendanceRecord;
