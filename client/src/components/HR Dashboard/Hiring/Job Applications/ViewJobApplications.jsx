import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./../../../BasicStyle.css";
import { BaseUrl, config } from "./../../../../constants.js";
import ViewResume from "./ViewResume";
import { Dropdown } from "react-bootstrap";
import { Link } from 'react-router-dom'
import Toast from "./../../../../UIModules/Toast/Toast.jsx";

export default function ViewJobApplications() {

  const [jobApplications, setJobApplications] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust this as needed
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + "/getJobApplications",config);
      setJobApplications(response.data);
      console.log(response.data);
    } catch (error) {
      Toast('cache error','error')
      console.error("Error fetching data jobs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleCallForInterview = async () => {
    console.log(applicationId, selectedDate, selectedTime);
    try {
      const response = await axios.post(BaseUrl + "/callForInterview", {
        callForInterviewId: applicationId, interviewDate: selectedDate, interviewTime: selectedTime, email
      });
      if (response.data.success) {
        Toast("applicant Called for interview Successfully");
        await fetchData();
        setShowInterviewModal(false);

      } else {
        console.log("Error occured", response.data.message);
        setShowInterviewModal(false);
      }
    } catch (e) {
      console.log(e);
    }
    setShowInterviewModal(false);
    setSelectedDate('')
    setSelectedTime('')
  };

  const handleRejectApplication = async () => {
    // console.log(applicationId);
    try {
      const response = await axios.post(BaseUrl + "/rejectApplication", {
        rejectedApplicationId: applicationId,
      });
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success')
        await fetchData();
      } else {
        console.log("Error occured", response.data.message);
        Toast(`${response.data.message}`, 'error')
      }
    } catch (e) {
      console.log(e);
    }
    setShowRejectModal(false);
  };

  // pagination and itemsperpage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedApplication = jobApplications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
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
          <label htmlFor="itemsPerPage" className="form-label me-2">
            Items Per Page : &ensp;{" "}
          </label>
          <Dropdown>
            <Dropdown.Toggle
              variant="info"
              id="itemsPerPageDropdown"
              style={{ width: "70px" }}
            >
              {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: "70px" }}>
              <Dropdown.Item onClick={() => setItemsPerPage(5)}>
                5
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(10)}>
                10
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(20)}>
                20
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setItemsPerPage(50)}>
                50
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Applicant Phone</th>
              <th>Resume</th>
              <th>Job Title</th>
              <th> <select
                value={selectedStatus}
                style={{
                  border: "none",
                  height: "30px",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                name="job_id"
                className="form-control round"
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value='All'>Status</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Interview">Interview</option>
                <option value="Hired">Hired</option>
              </select>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobApplications
              .filter((application) =>
                (selectedStatus === 'All' || application.status === selectedStatus)
              )
              .map((application) => (
                <tr key={application.application_id}>
                  <td>{application.application_id}</td>
                  <td>{application.applicant_name}</td>
                  <td>{application.email}</td>
                  <td>{application.phone_number}</td>
                  <td>
                    <ViewResume application_id={application.application_id} applicant_name={application.applicant_name} />
                  </td>
                  <td>{application.title}</td>
                  <td>{application.status}</td>
                  <td>
                    {application.status === "Pending" ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setApplicationId(application.application_id);
                            setShowInterviewModal(true);
                            setEmail(application.email)
                          }}
                        >
                          Call for Interview
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setApplicationId(application.application_id);
                            setShowRejectModal(true);
                          }}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      application.status === "Interview" && (
                        <div>

                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setShowAcceptModal(true);
                            }}
                            style={{
                              color: "black",
                              backgroundColor: 'yellow'
                            }}
                          >
                            Accepted For Job
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setShowRejectModal(true);
                            }}
                          >
                            Reject
                          </Button>
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${number === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>

        <Modal
          show={showInterviewModal}
          onHide={() => setShowInterviewModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Call for Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to call this applicant for an interview?
            <h2>Date and Time Picker</h2>
            <div>
              <label>Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control" // React Bootstrap styling class
              />
            </div>
            <div>
              <label>Time:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="form-control" // React Bootstrap styling class
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowInterviewModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleCallForInterview}>
              Call for Interview
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
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
            <Button variant="danger" onClick={() => handleRejectApplication()}>
              Reject
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showAcceptModal} onHide={() => setShowAcceptModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Accept Application</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to accept this applicant's application?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowAcceptModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" as={Link} to={`/hrdash/addEmployee/${applicationId}`} >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
