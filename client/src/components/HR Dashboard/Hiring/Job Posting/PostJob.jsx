import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../../BasicStyle.css';
import axios from 'axios'
import { BaseUrl } from './../../../../constants.js'
import Toast from '../../../../UIModules/Toast/Toast';
import { config } from './../../../../constants.js';
import ReactPaginate from 'react-paginate';
import styles from './PostJob.module.css'
// import './PostJob.css'
export default function PostJob() {
  const [showModal, setShowModal] = useState(false);
  const [jobDetails, setJobDetails] = useState([])
  const [alljobs, setAllJobs] = useState([]);//get
  const [dep, setDep] = useState([])//get
  const [getExperience, setExperience] = useState([])
  const [confirmationModal, setConfirmationModal] = useState(false); // State for the confirmation modal
  const [jobToRemove, setJobToRemove] = useState(null); // State to track the job to be removed
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobs', config);
      setAllJobs(response.data);
    } catch (error) {
      Toast('catch error', 'error');
      console.error('Error fetching data jobs:', error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      Toast('error fetching departments', 'error')
      console.error('Error fetching data dep :', error);
    }
  };
  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getExperience');
      setExperience(response.data);
    } catch (error) {
      console.error('Error fetching Experience:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData1();
  }, [])

  const changeHandler = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    // if(name==='dep_id'){
    //   const response=await axios.get(BaseUrl+`/getDegreesById/${value}`)
    //   console.log(response.data);
    //   setDegrees(response.data)
    //   setJobDetails((prevState) => {
    //     return { ...prevState, [name]: value };
    //   });
    // }
    setJobDetails((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  // -------------------------------------------submit data ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobDetails);

    try {
      const response = await axios.post(BaseUrl + '/jobPost', jobDetails, config);
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success');
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
        const response = await axios.post(BaseUrl + '/deleteJob', { job_id: jobToRemove }, config);
        if (response.data.success) {
          console.log('Job with ID', jobToRemove, 'deleted successfully.');
          Toast('Job Removed Successfully', 'success');
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
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  const [filters, setFilters] = useState({
    jobTitle: '',
    experienceRequired: '',
    datePosted: '',
    expiryDate: '',
    department: ''
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    setCurrentPage(0);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);
  }; console.log('filters.expiryDate:', filters.expiryDate);
  console.log('alljobs:', alljobs);
  const filteredJobs = alljobs
    .filter((job) =>
      job.title.toLowerCase().includes(filters.jobTitle.toLowerCase()) &&
      job.dep_name.toLowerCase().includes(filters.department.toLowerCase()) &&
      job.date_posted.slice(0, 10).toLowerCase().includes(filters.datePosted.toLowerCase()) &&
      job.expiry_date.slice(0, 10).toLowerCase().includes(filters.expiryDate.toLowerCase()) &&
      job.experience.toLowerCase().includes(filters.experienceRequired.toLowerCase()))
  console.log('filteredJobs:', filteredJobs);

  const offset = currentPage * itemsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + itemsPerPage);

  // --------------------------------------------------------------------------

  return (
    <div id="full-content">
      <h2 className='mb-4'>Posted Jobs</h2>
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
                  required
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
                  required
                  as="select"
                  name='experience'
                  value={jobDetails.experience || ''}
                  onChange={changeHandler}
                >
                  <option style={{ display: 'none' }}>Experience</option>
                  {getExperience.map((exp) => (
                    <option key={exp.experience} value={exp.experience}>
                      {exp.experience}
                    </option>
                  ))}
                </Form.Control>
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
                  required
                  value={jobDetails.salary || ''}
                  onChange={changeHandler}
                />
              </Form.Group>

              <Form.Group controlId="department">
                <Form.Label className='mt-3'>Select Department</Form.Label>
                <Form.Control
                  as="select"
                  required
                  name='dep_id'
                  value={jobDetails.dep_id || ''}
                  onChange={changeHandler}
                >
                  <option style={{ display: 'none' }}>Department</option>
                  {dep.map((dept) => (
                    <option key={dept.dep_id} value={dept.dep_id}>
                      {dept.dep_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="degrees">
                <Form.Label className='mt-3'>Select Degree</Form.Label>
                <Form.Control
                  as="select"
                  name='deg_id'
                  required
                  value={jobDetails.deg_id|| ''}
                  onChange={changeHandler}
                >
                  <option style={{ display: 'none' }}>Degree</option>
                  {degrees.map((deg) => (
                    <option key={deg.deg_id} value={deg.deg_id}>
                      {deg.degree}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group> */}

                    

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
        <Button className="float-right" style={{ width: '130px', alignSelf: 'left' }} variant="primary" onClick={() => setShowModal(true)}>
          Post a New Job
        </Button>

        <Row className={`mb-2 ${styles.slideIn}`} style={{ marginTop: '10px', marginBottom: '-30px' }}>
          <Col style={{ marginBottom: '-30px' }} >
            <InputGroup className="filter-inputs">
              <select
                name="department"
                style={{ margin: '7px 7px 7px 0', borderRadius: '0px', width: '20%', outline: "none" }}
                className="formcont"
                value={filters.department}
                onChange={handleFilterChange}
              >
                <option value={''} style={{ display: 'none' }}>Department</option>
                <option value={''}>All</option>
                {dep.map((department, index) => (
                  <option value={department.dep_name} key={index}>
                    {department.dep_name}
                  </option>
                ))}
              </select>
              <InputGroup style={{ width: 'calc(37% - 20px)' }}>
                <FormControl
                  placeholder="Posted Date"
                  style={{
                    margin: '7px -30px 7px 0',
                    paddingBottom: '6px',
                    paddingRight: '0px',
                    backgroundColor: '##F7D6A5',
                    height: '40px',
                    width: '20%',
                  }}
                  disabled
                />
                <FormControl
                  type="date"
                  style={{ margin: '7px 7px 7px 0' }}
                  id="jobPostedDateFilter"
                  placeholder="Posted Date"
                  name="datePosted"
                  className="formcont"
                  value={filters.datePosted}
                  onChange={handleFilterChange}
                />
              </InputGroup>
              <InputGroup style={{ width: 'calc(36% - 20px)' }}>
                <FormControl
                  placeholder="Expiry Date"
                  style={{
                    margin: '7px -30px 7px 0',
                    paddingBottom: '6px',
                    paddingRight: '0px',
                    backgroundColor: '##F7D6A5',
                    height: '40px',
                    width: '20%',
                  }}
                  disabled
                />
                <FormControl
                  type="date"
                  id="applyingDateFilter"
                  name="expiryDate"
                  style={{ margin: '7px 7px 7px 0', borderRadius: '0px', width: '80%' }}
                  className="formcont"
                  value={filters.expiryDate}
                  onChange={handleFilterChange}
                />
              </InputGroup>
            </InputGroup>
          </Col>
        </Row>
        <Row className={`mb-3 ${styles.slideIn}`}>
          <Col style={{ margin: '0px' }}>
            <InputGroup className="filter-inputs">
              <FormControl
                className="formcont"
                name="jobTitle"
                placeholder="Filter by Job Title"
                value={filters.jobTitle}
                style={{ margin: '7px 7px 7px 0' }}
                onChange={handleFilterChange}
                autoComplete="off"
              />
              <FormControl
                className="formcont"
                name="experienceRequired"
                style={{ margin: '7px 7px 7px 0' }}
                placeholder="Search By Experience"
                value={filters.experienceRequired}
                onChange={handleFilterChange}
                autoComplete="off"
              />
              <label htmlFor="itemsPerPage" style={{ marginTop: '10px', color: 'black' }}>
                Items Per Page:&ensp;
              </label>
              <select
                style={{ margin: '7px 7px 7px 0' }}
                name="itemsPerPage"
                id="itemsPerPage"
                onChange={handleItemsPerPageChange}
                value={itemsPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </InputGroup>
          </Col>
        </Row>

        <table className={`table ${styles.table}`}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Department</th>
              <th>Experience Required</th>
              <th>Date Posted</th>
              <th>Expiry Date</th>
              <th></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentJobs
                .map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.title}</td>
                    <td>{job.dep_name}</td>
                    <td>{job.experience}</td>
                    <td>{job?.date_posted.slice(0, 10)}</td>
                    <td>{job?.expiry_date?.slice(0, 10)}</td>
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
        <div style={{ margin: 'auto' }}>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={Math.ceil(filteredJobs.length / itemsPerPage)}
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
