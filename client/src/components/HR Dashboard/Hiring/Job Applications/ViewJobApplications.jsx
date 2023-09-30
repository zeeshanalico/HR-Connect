import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "./../../../BasicStyle.css";
import { BaseUrl, config } from "./../../../../constants.js";
import ViewResume from "./ViewResume";
import { Link } from 'react-router-dom'
import Toast from "./../../../../UIModules/Toast/Toast.jsx";
import ReactPaginate from "react-paginate";
export default function ViewJobApplications() {

  const [jobApplications, setJobApplications] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [email, setEmail] = useState('');
  const [offerLetter, setOfferLetter] = useState(`
  Congratulations, 
  Dear Candidate,
      We are pleased to extend an offer of employment at HRConnect. We were impressed with your qualifications and experience, and we believe that you will be a valuable addition to our team.
        
  Sincerely,
  Muhammad Ihtisham(HR)
  HRConnect`);
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false)
  const sendOfferLetter = async () => {
    try {
      const response = await axios.post(BaseUrl + "/sendOfferLetter", { offerLetter, application_id: applicationId }, config);
      if (response.data.success) {
        Toast(`${response.data.message}`);
      } else {
        Toast(`${response.data.message}`);
      }
      console.log(response.data);
    } catch (error) {
      Toast('Error sending Offer Letter', 'error')
      console.error("Error sending Offer Letter", error);
    }
    setShowOfferLetterModal(false)

  }
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + "/getJobApplications", config);
      setJobApplications(response.data);
      console.log(response.data);
    } catch (error) {
      Toast('cache error', 'error')
      console.error("Error fetching data jobs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({
    applicantName: '',
    jobTitle: '',
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredApplications = jobApplications
    .filter((app) => app?.applicant_name?.toLowerCase()?.includes(filters.applicantName.toLowerCase()))
    .filter((app) => app?.title?.toLowerCase()?.includes(filters.jobTitle.toLowerCase()))
    .filter((app) => app?.status?.toLowerCase()?.includes(filters.status.toLowerCase())) || []
  const offset = currentPage * itemsPerPage;
  const currentApplications = filteredApplications.slice(offset, offset + itemsPerPage);

  const handleFilter = (filterType, value) => {
    console.log(filterType, value);
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(0);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0);

  };
  // ------------------------------------------------------------------------------------------------

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
      }, config);
      if (response.data.success) {
        Toast(`${response.data.message}`, 'success')
        console.log(`${response.data.message}`, 'success')

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

  return (
    <div id="full-content" className="container mt-4">
      {/* <ToastContainer /> */}
      <h2 className="mb-4">Job Applications</h2>

      <div id="content">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Employee Name                 "
            className="form-control"
            value={filters.applicantName}
            onChange={(e) => handleFilter('applicantName', e.target.value)}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Job Title                 "
            className="form-control"
            value={filters.jobTitle}
            onChange={(e) => handleFilter('jobTitle', e.target.value)}
            style={{ width: '300px', marginRight: '10px' }}
          />
          <div style={{ margin: '20px 0 10px 200px' }}>items per page &ensp;</div>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{ borderRadius: '8px', outline: 'none', padding: '9px', width: 'fitcontent', }}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
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
                value={filters.status}
                style={{
                  border: "none",
                  height: "30px",
                  outline: "none",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
                name="job_id"
                className="form-control round"
                onChange={(e) => handleFilter('status', e.target.value)}
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
            {currentApplications
              .map((application) => (
                <tr key={application.application_id}>
                  <td>{application.application_id}</td>
                  <td>{application.applicant_name}</td>
                  <td>{application.email}</td>
                  <td>{application.phone_number}</td>
                  <td>
                    <ViewResume application_id={application.application_id} applicant_name={application.applicant_name} job_id={application.job_id} />
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
                              backgroundColor: 'yellow',
                              // marginBottom:'3px'
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
                            style={{ margin: '4px' }}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setShowOfferLetterModal(true);
                            }}
                          >
                            Offer letter
                          </Button>
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{ margin: 'auto' }}>

          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={Math.ceil(filteredApplications.length / itemsPerPage)} // Use filteredApplications.length
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

        <Modal
          show={showInterviewModal}
          onHide={() => setShowInterviewModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Call for Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to call this applicant for an interview?
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
            <Button variant="danger" as={Link} to={`/ hrdash / addEmployee / ${applicationId}`} >
              Accept
            </Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showOfferLetterModal} onHide={() => setShowOfferLetterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Offer Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea name="" style={{ outline: 'none', borderRadius: '10px', }} value={offerLetter} cols="56" rows="17" onChange={(e) => { setOfferLetter(e.target.value) }} />

          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowOfferLetterModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={sendOfferLetter} >
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
