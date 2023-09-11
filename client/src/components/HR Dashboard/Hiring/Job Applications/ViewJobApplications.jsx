import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './../../../BasicStyle.css';
import { BaseUrl } from './../../../../constants.js';
import { Dropdown } from 'react-bootstrap';
import FilterSearch from '../../../../UIModules/FilterSearch';

import Toast from './../../../../UIModules/Toast/Toast.jsx'

export default function ViewJobApplications() {
  const [jobApplications, setJobApplications] = useState([]);

  const [filteredResults, setFilteredResults] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleFilter = (filteredData) => {
    setFilteredResults(filteredData);
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobApplications');
      setJobApplications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
  }, []);

  // const notify = () => Toast("Wow so easy!");
  // const [jobApplications, setJobApplications] = useState(sampleJobApplications);
  // const [selectedApplication, setSelectedApplication] = useState(null);
  // const [showResumeModal, setShowResumeModal] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [applicationId, setApplicationId] = useState('');


  // const handleShowResume = (resumeLink) => {
  //   setSelectedApplication(resumeLink);
  //   setShowResumeModal(true);
  // };

  const handleCallForInterview = async () => {
    console.log(applicationId);

    try {
      const response = await axios.post(BaseUrl + '/callForInterview', { callForInterviewId: applicationId })
      if (response.data.success) {
        console.log("applicant Called for interview Successfully");
        await fetchData();
      }
      else {
        console.log("Error occured", response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setShowInterviewModal(false);
  };

  const handleRejectApplication = async () => {
    // console.log(applicationId);
    try {
      const response = await axios.post(BaseUrl + '/rejectApplication', { rejectedApplicationId: applicationId })
      if (response.data.success) {
        console.log("application rejected successfully");
        await fetchData();
      }
      else {
        console.log("Error occured", response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
    setShowRejectModal(false);
  };

  // pagination and itemsperpage
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this as needed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedApplication = jobApplications.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobApplications.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="full-content" className="container mt-4">
      {/* <ToastContainer /> */}
      <h2 className="mb-4">Job Applications</h2>
      <div id="content">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <FilterSearch style={{ width: '300px' }} data={jobApplications} onFilter={handleFilter} className="float-right" onFocus={() => { setFocus(true) }} />
          <label htmlFor="itemsPerPage" className="form-label me-2">
            Items Per Page : &ensp; </label>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="itemsPerPageDropdown" style={{ width: '70px' }}>
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
        <Table striped bordered hover responsive>
          {/* ... Table header */}
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Applicant Phone</th>
              <th>Resume</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {focus ? (filteredResults.map((application) => (
              <tr key={application.application_id}>
                <td>{application.applicant_name}</td>
                <td>{application.email}</td>
                <td>{application.phone_number}</td>
                <td>
                  <Button
                    variant="link"
                  // onClick={() => handleShowResume(application.resume)}
                  >
                    View Resume
                  </Button>
                </td>
                <td>{application.title}</td>
                <td>{application.status}</td>
                <td>
                  {application.status === 'Pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          setApplicationId(application.application_id)
                          setShowInterviewModal(true);
                        }}
                      >
                        Call for Interview
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          // setApplicationId(application.application_id)
                          // setShowRejectModal(true);

                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))) : (jobApplications.map((application) => (
              <tr key={application.application_id}>
                <td>{application.applicant_name}</td>
                <td>{application.email}</td>
                <td>{application.phone_number}</td>
                <td>
                  <Button
                    variant="link"
                  // onClick={() => handleShowResume(application.resume)}
                  >
                    View Resume
                  </Button>
                </td>
                <td>{application.title}</td>
                <td>{application.status}</td>
                <td>
                  {application.status === 'Pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          setApplicationId(application.application_id)
                          setShowInterviewModal(true);
                        }}
                      >
                        Call for Interview
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          // setApplicationId(application.application_id)
                          // setShowRejectModal(true);

                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </Table>
        <ul className='pagination justify-content-center'>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(number)}>
                {number}
              </button>
            </li>
          ))}
        </ul>





        {/* Resume Modal */}

        {/* <Modal
          show={showResumeModal}
          onHide={() => {
            setSelectedApplication(null);
            setShowResumeModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Applicant Resume</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {// Display the resume content here }
            {selectedApplication && (
              <a href={selectedApplication} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setSelectedApplication(null);
                setShowResumeModal(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal> */}



        {/* Call for Interview Modal */}

        <Modal
          show={showInterviewModal}
          onHide={() => setShowInterviewModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Call for Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to call this applicant for an interview?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowInterviewModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={() => handleCallForInterview()}
            >
              Call for Interview
            </Button>
          </Modal.Footer>
        </Modal>



        {/* Reject Modal */}

        <Modal
          show={showRejectModal}
          onHide={() => setShowRejectModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Reject Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to reject this applicant's application?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleRejectApplication()}
            >
              Reject
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}


