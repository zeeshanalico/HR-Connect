import React, { useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import './../../../BasicStyle.css';
import { BaseUrl } from './../../../../constants.js';

// const sampleJobApplications = [
//   {
//     id: 1,
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phoneNumber: '123-456-7890',
//     resume: 'Link to Resume 1',
//     jobTitle: 'Web Developer',
//     status: 'Pending',
//   },
//   {
//     id: 2,
//     name: 'Jane Smith',
//     email: 'jane.smith@example.com',
//     phoneNumber: '987-654-3210',
//     resume: 'Link to Resume 2',
//     jobTitle: 'Graphic Designer',
//     status: 'Pending',
//   },
//   // Add more job applications as needed
// ];

export default function ViewJobApplications() {
  const [jobApplications, setJobApplications] = useState([]);
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

  // const [jobApplications, setJobApplications] = useState(sampleJobApplications);
  // const [selectedApplication, setSelectedApplication] = useState(null);
  // const [showResumeModal, setShowResumeModal] = useState(false);
  // const [showInterviewModal, setShowInterviewModal] = useState(false);
  // const [showRejectModal, setShowRejectModal] = useState(false);

  // const handleShowResume = (resumeLink) => {
  //   setSelectedApplication(resumeLink);
  //   setShowResumeModal(true);
  // };

  // const handleCallForInterview = (applicationId) => {
  //   // Update the status of the selected application to "Interview"
  //   const updatedApplications = jobApplications.map((application) => {
  //     if (application.id === applicationId) {
  //       return { ...application, status: 'Interview' };
  //     }
  //     return application;
  //   });

  //   setJobApplications(updatedApplications);
  //   setShowInterviewModal(false);
  // };

  // const handleRejectApplication = (applicationId) => {
  //   // Update the status of the selected application to "Rejected"
  //   const updatedApplications = jobApplications.map((application) => {
  //     if (application.id === applicationId) {
  //       return { ...application, status: 'Rejected' };
  //     }
  //     return application;
  //   });

  //   setJobApplications(updatedApplications);
  //   setShowRejectModal(false);
  // };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Job Applications</h2>
      <div id="content">
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
            {jobApplications.map((application) => (
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
                {/*   {application.status === 'Pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowInterviewModal(true);
                        }}
                      >
                        Call for Interview
                      </Button>{' '}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          setSelectedApplication(application);
                          setShowRejectModal(true);
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}*/}
                </td> 
              </tr>
            ))}
          </tbody> 
        </Table>




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

        {/* <Modal
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
              onClick={() => handleCallForInterview(selectedApplication.id)}
            >
              Call for Interview
            </Button>
          </Modal.Footer>
        </Modal> */}



        {/* Reject Modal */}

        {/* <Modal
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
              onClick={() => handleRejectApplication(selectedApplication.id)}
            >
              Reject
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </div>
  );
}


