import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl, config } from '../../../constants';
import '../BasicStyle.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Toast from '../../../UIModules/Toast/Toast';

const ViewDepartment = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const [newJob, setNewJob] = useState('');

  const [depId, setDepId] = useState('');
  const [depName, setDepName] = useState('');
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [newDegrees, setNewDegrees] = useState([]); // Array to store new degrees
  const [degrees, setDegrees] = useState([]); // Array to store new degrees
  const [editingDepId, setEditingDepId] = useState(null); // Department ID being edited
  const [editedDepName, setEditedDepName] = useState(''); // Edited department name
  const [allJobs, setAllJobs] = useState([])
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepInfo', config);
      setDepartmentList(response.data[0]);
    } catch (error) {
      Toast('cache error', 'error');
      console.error('Error fetching deplist:', error);
    }
  };

  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDegrees', config);
      setDegrees(response.data);
    } catch (error) {
      Toast('cache error', 'error');
      console.error('Error fetching deplist:', error);
    }
  };
  // const fetchData2 = async () => {
  //   try {
  //     const response = await axios.get(BaseUrl + '/getJobPositions', config);
  //     setAllJobs(response.data);
  //     console.log(response.data);
  //   } catch (error) {
  //     Toast('cache error', 'error');
  //     console.error('Error fetching getJobPositions:', error);
  //   }
  // };

  useEffect(() => {
    fetchData();
    fetchData1();
    // fetchData2();
  }, []);

  const handleAddDepartment = (e) => {
    setNewDepartmentName(e);
  };

  const handleAddDegree = (e) => {
    setNewDegrees([...newDegrees, e]);
  };

  const handleRemoveDegree = (index) => {
    const updatedDegrees = [...newDegrees];
    updatedDegrees.splice(index, 1);
    setNewDegrees(updatedDegrees);
  };

  const handleEditDepartment = (depId, depName) => {
    setEditingDepId(depId);
    setEditedDepName(depName);
  };

  const handleSaveEditedDepartment = async () => {
    console.log(depId, depName);
    if (editedDepName.trim() === '') {
      Toast('Department name cannot be empty.', 'error');
      return;
    }

    try {
      const response = await axios.post(BaseUrl + '/updateDepartment', {
        depId: editingDepId,
        depName: editedDepName,
      });
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success');
        setEditingDepId(null);
        await fetchData();
      }
    } catch (e) {
      console.error('Error updating department:', e);
      Toast('Error updating department.', 'error');
    }
  };

  const handleCancelEdit = () => {
    // Cancel editing and reset the edited department name
    setEditingDepId(null);
    setEditedDepName('');
  };

  const submitHandler = async (event) => {
    // event.preventDefault();
    if (!newDepartmentName || newDepartmentName.trim() === '' || newDegrees.some(degree => !degree)) {
      Toast('Department and degree cannot be empty.', 'error');
      return;
    }
    if (newDegrees.length === 0 || newDegrees.some(degree => !degree)) {
      Toast('At least one valid degree is required.', 'error');
      return;
    }
    console.log(newDepartmentName, newDegrees);
    try {
      const response = await axios.post(BaseUrl + '/addDepartment', {
        newDepartmentName,
        newDegrees,
      });
      if (response.data.success) {
        Toast(` ${response.data.message}`, 'success');
      }
    } catch (e) {
      console.log(e);
      Toast('Error: -', 'error');
    }
    await fetchData();
    setShowAddForm(false);
    setNewDepartmentName('');
    setNewDegrees([]);
  };

  const handleRemoveDepartment = async () => {
    try {
      const response = await axios.post(BaseUrl + '/deleteDep', { dep_id: depId }, config);
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success');
        setShowConfirmation(false);
        await fetchData();
      } else {
        Toast(`${response.data.message}`, 'error');
        console.log('Error occurred', response.data.message);
        setShowConfirmation(false);
      }
    } catch (e) {
      console.log(e);
    }
    setShowConfirmation(false);
  };


  const handleAddNewDegree = async () => {
    try {
      console.log(newJob);
      console.log(`${BaseUrl}/addNewDegree/${newJob}`);
      const response = await axios.get(`${BaseUrl}/addNewDegree/${newJob}`)
      console.log("Response : ", response);
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success');
      }
      else {
        Toast(`${response.data.message}`, 'error');

      }
    } catch (error) {
      console.log(error);

    }
    setNewJob('')
    await fetchData1();
    setShowAddJob(false)
  }
  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">View Departments</h2>
      <div id="content">
        <div className="mb-3"></div>

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
            {departmentList.map((department) => (
              <tr key={department.dep_id}>
                <td>{department.dep_id}</td>
                <td>
                  {editingDepId === department.dep_id ? (
                    <div>
                      <input
                        type="text"
                        value={editedDepName}
                        style={{ background: ' rgb(48, 164, 255)', width: '300px', border: 'none', padding: '5px', marginRight: '5px', outline: 'none' }}
                        onChange={(e) => setEditedDepName(e.target.value)}
                      />
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={handleSaveEditedDepartment}
                      >
                        Save
                      </button>
                      <button
                        style={{ marginLeft: '5px' }}
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <span
                      onDoubleClick={() => handleEditDepartment(department.dep_id, department.dep_name)}
                    >
                      {department.dep_name}
                    </span>
                  )}
                </td>
                <td>{department.total_employees}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info"
                    style={{ marginRight: '5px' }}
                    onClick={() => {
                      handleEditDepartment(department.dep_id, department.dep_name)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setDepId(department.dep_id);
                      setDepName(department.dep_name);
                      setShowConfirmation(true);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowAddForm(true);
            }}
          >
            Add New Department
          </button>
          <button
            style={{ marginLeft: '5px' }}
            className="btn btn-secondary"
            onClick={() => {
              setShowAddJob(true);
            }}
          >
            Add Degree
          </button>
        </div>

        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ color: 'red', fontWeight: 'bold' }}>Warning!</span>
            <span style={{ color: 'red', fontSize: '12px' }}>
              <strong>
                {' '}
                If you Remove the Department it will also remove all its employees and their related records like attendance etc.
              </strong>
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

        <Modal show={showAddJob} onHide={() => setShowAddJob(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Degrees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <ol>
                {degrees.map((deg, index) => (
                  <li key={index}>{++index} . {deg.name}</li>
                ))}
              </ol>
            <input
              type="text"
              placeholder='write degree name...'
              value={newJob}
              style={{ padding: '5px', marginRight: '5px', outline: 'none' }}
              onChange={(e) => setNewJob(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddJob(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleAddNewDegree}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
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
                  onChange={(e) => {
                    handleAddDepartment(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Add Degrees</Form.Label>
                <div>
                  {newDegrees.map((degree, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>

                      <Form.Control
                        as="select"
                        name='degree'
                        required
                        style={{ padding: '0px 12px', height: '30px', marginRight: '5px' }}
                        value={degree}
                        onChange={(e) => {
                          const updatedDegrees = [...newDegrees];
                          updatedDegrees[index] = e.target.value;
                          setNewDegrees(updatedDegrees);
                        }}                >
                        <option style={{ display: 'none', padding: '-15px 5px' }}>Degree</option>
                        {degrees.map((deg) => (
                          <option key={deg.deg_id} value={deg.deg_id}>
                            {deg.name}
                          </option>
                        ))}
                      </Form.Control>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveDegree(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleAddDegree('')}
                  >
                     Degree's
                  </button>
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddForm(false)}>
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
