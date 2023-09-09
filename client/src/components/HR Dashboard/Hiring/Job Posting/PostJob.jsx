import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import '../../../BasicStyle.css';
import axios from 'axios'
import { BaseUrl } from './../../../../constants.js'
export default function PostJob() {
  const [showModal, setShowModal] = useState(false);
  const [jobDetails, setJobDetails] = useState([])

  const [alljobs, setAllJobs] = useState([]);//get
  const [confirmationModal, setConfirmationModal] = useState(false); // State for the confirmation modal

  const [jobToRemove, setJobToRemove] = useState(null); // State to track the job to be removed

  const [dep, setDep] = useState([])

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
        // Toast('job posted succeessfuly','info');
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
          fetchData()
        } else {
          console.error('Error deleting job:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
    setConfirmationModal(false);
    setJobToRemove(null);
  }

  return (
    <div id="full-content">
      <h2 className='mb-4'>Post a New Job</h2>

      <div id="content">
        {/* Modal for posting a new job */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Post a New Job</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <Form.Group controlId="jobTitle">
                <Form.Label className='mt-3'>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  name='title'
                  placeholder="Enter job title"
                  value={jobDetails.title || ''}
                  onChange={changeHandler}
                  required
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
        <h2 className='mb-4'>Posted Jobs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Experience Required</th>
              <th>Date Posted</th>
              <th>Expiration Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {alljobs.map((job) => (
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
            ))}
          </tbody>
        </table>
        <Button className="mt-4" style={{ width: '150px', alignSelf: 'center' }} variant="primary" onClick={() => setShowModal(true)}>
          Post a New Job
        </Button>

        {/* Confirmation Modal */}
        <Modal show={confirmationModal} onHide={() => { setConfirmationModal(false) }}>
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
