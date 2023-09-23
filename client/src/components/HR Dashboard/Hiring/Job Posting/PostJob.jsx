import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import '../../../BasicStyle.css';
import axios from 'axios'
import { BaseUrl } from './../../../../constants.js'
import Toast from '../../../../UIModules/Toast/Toast';
import { Dropdown } from 'react-bootstrap';
const inputStyle = {
  border: "none",
  height: "30px",
  outline: "none",
  cursor: "pointer",
  backgroundColor: "transparent",
};
export default function PostJob() {
  const [showModal, setShowModal] = useState(false);
  const [jobDetails, setJobDetails] = useState([])
  const [jobTitle, setJobTitle] = useState("")


  const [alljobs, setAllJobs] = useState([]);//get
  const [dep, setDep] = useState([])//get

  const [confirmationModal, setConfirmationModal] = useState(false); // State for the confirmation modal
  const [jobToRemove, setJobToRemove] = useState(null); // State to track the job to be removed

  console.log(alljobs);



  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedExpiryDate, setSelectedExpiryDate] = useState('');
  const [selectedPostDate, setSelectedPostDate] = useState('');


  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobs');
      setAllJobs(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
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
    fetchData2();
  }, [])

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setJobDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  // -------------------------------------------submit data ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobDetails);

    try {
      const response = await axios.post(BaseUrl + '/jobPost', jobDetails);
      if (response.data.success) {
        Toast('job posted succeessfuly', 'info');
        setShowModal(false);
        await fetchData();
        setJobDetails({});
      } else {
        console.error('Error deleting job:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // ------------------------------------------------removing single job------------------------------------------------
  const handleRemoveJob = (id) => {
    setJobToRemove(id);
    setConfirmationModal(true);
  };

  const confirmDeletion = async () => {
    if (jobToRemove !== null) {
      console.log('Deleting job with ID:', jobToRemove);
      try {
        const response = await axios.post(BaseUrl + '/deleteJob', { job_id: jobToRemove });
        if (response.data.success) {
          console.log('Job with ID', jobToRemove, 'deleted successfully.');
          Toast('Job Removed Successfully','success');
          await fetchData()
        } else {
          console.error('Error deleting job:', response.data.error);
          Toast(`Error deleting job, ${response.data.error}`)
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        Toast(`Error , ${error}`)
      }
    }
    setConfirmationModal(false);
    setJobToRemove(null);
  }

  // pagination and itemsperpage
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this as needed

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(alljobs.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const filteredJobs = alljobs
    .filter(job => (selectedDepartment === 'All' || job.dep_name === selectedDepartment))
    .filter(job => (selectedExpiryDate === '' || job.expiry_date.slice(0, 10) === new Date(selectedExpiryDate).toISOString().slice(0, 10)))
    .filter(job => (selectedPostDate === '' || job.date_posted.slice(0, 10) === new Date(selectedPostDate).toISOString().slice(0, 10)))
    .filter((job) => job.title.toLowerCase().includes(jobTitle.toLowerCase()));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div id="full-content">
      <h2 className='mb-4'>Post a New Job</h2>
      <div id="content">
        {/* Modal for posting a new job */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title >Post a New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form.Group controlId="jobTitle">
                <Form.Label className='mt-3'>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name='title'
                  placeholder="Job Title"
                  value={jobDetails.title || ''}
                  onChange={changeHandler}
                />
              </Form.Group>
              <Form.Group controlId="jobDescription">
                <Form.Label className='mt-3'>Job Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name='description'
                  rows={3}
                  placeholder="Enter job description"
                  value={jobDetails.description || ''}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="experienceRequired">
                <Form.Label className='mt-3'>Experience Required</Form.Label>
                <Form.Control
                  type="text"
                  name='experience'
                  placeholder="Enter experience required"
                  value={jobDetails.experience || ''}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="locationrequired">
                <Form.Label className='mt-3'>Location</Form.Label>
                <Form.Control
                  type="text"
                  name='location'
                  placeholder="Job location"
                  value={jobDetails.location || ''}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>
              <Form.Group controlId="">
                <Form.Label className='mt-3'>salary</Form.Label>
                <Form.Control
                  type="text"
                  name='salary'
                  placeholder="Salary"
                  value={jobDetails.salary || ''}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label className='mt-3'>Select Department</Form.Label>
                <Form.Control
                  as="select"
                  name='dep_id'
                  value={jobDetails.dep_id || ''}
                  onChange={changeHandler}
                >
                  <option >Select...</option>
                  {dep.map((dept) => (
                    <option key={dept.dep_id} value={dept.dep_id}>
                      {dept.dep_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="expiration">
                <Form.Label className='mt-3'>Expiration Date</Form.Label>
                <Form.Control
                  type="date"
                  name='expiry_date'
                  value={jobDetails.expiry_date || ''}
                  onChange={changeHandler}
                  required
                />
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => { setShowModal(false) }}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Post Job
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Display the list of posted jobs */}
        <h2 className='mb-4 mr-4'>Posted Jobs<Button className="float-right" style={{ width: '130px', alignSelf: 'center' }} variant="primary" onClick={() => setShowModal(true)}>
          Post a New Job
        </Button></h2>
        <div className="d-flex align-items-center mb-3">
          <Form.Control
            type="text"
            name='title'
            placeholder="Search job By Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={{ width: '300px', float: 'right' }}
          />
          <label htmlFor="itemsPerPage" className="form-label me-2" style={{ marginLeft: "530px" }}>
            Items Per Page : &ensp;
          </label>
          <Dropdown>
            <Dropdown.Toggle className='mr-4' variant="info" id="itemsPerPageDropdown" style={{ width: '70px' }}>
              {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '70px' }}>
              <Dropdown.Item onClick={() => setItemsPerPage(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(50)}>50</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
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
                >
                  <option value={'All'}>Department</option>
                  {dep.map((department => { return <option value={department.dep_name}>{department.dep_name}</option> }))}
                </select>
              </th>
              <th>Experience Required</th>
              <th>Date Posted
                <input
                  type="date"
                  id="jobPostedDateFilter"
                  placeholder='Posted Date'
                  className="form-control"
                  value={selectedPostDate}
                  onChange={(e) => setSelectedPostDate(e.target.value)}
                  style={inputStyle}
                />
              </th>
              <th>Expiry Date
                <input
                  type="date"
                  id="applyingDateFilter"
                  placeholder='Applying Date'
                  className="form-control"
                  value={selectedExpiryDate}
                  onChange={(e) => setSelectedExpiryDate(e.target.value)}
                  style={inputStyle}
                />
              </th>
              <th></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              displayedJobs
                .filter(job => (selectedDepartment === 'All' || job.dep_name === selectedDepartment))
                .filter(job => (selectedExpiryDate === '' || job.expiry_date.slice(0, 10) === new Date(selectedExpiryDate).toISOString().slice(0, 10)))
                .filter(job => (selectedPostDate === '' || job.date_posted.slice(0, 10) === new Date(selectedPostDate).toISOString().slice(0, 10)))
                .filter((job) => job.title.toLowerCase().includes(jobTitle.toLowerCase()))
                .map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.title}</td>
                    <td>{job.dep_name}</td>
                    <td>{job.experience}</td>
                    <td>{job.date_posted.slice(0, 10)}</td>
                    <td>{job.expiry_date.slice(0, 10)}</td>
                    <td>{job?.status}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleRemoveJob(job.job_id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <ul className='pagination'>
            {pageNumbers.map(number => (
              <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(number)}>
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>



        {/* Confirmation Modal */}
        <Modal show={confirmationModal} onHide={() => { setConfirmationModal(false) }} >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to remove this job?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setConfirmationModal(false) }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => { confirmDeletion() }} >
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
