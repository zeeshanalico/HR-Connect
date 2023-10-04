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
import './ViewJobApplications.css'
export default function ViewJobApplications() {

  const [jobApplications, setJobApplications] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [email, setEmail] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [applicantJobName, setApplicantJobName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [offerLetter, setOfferLetter] = useState(`
  Subject: Offer of Employment
 
Dear [Applicant Name],
I hope this message finds you well. We are delighted to extend an offer of employment for the [Job Title] position at HRConnect. Your performance during the interview process demonstrated that you are a highly qualified candidate who meets our hiring criteria, and we believe that you will be a valuable addition to our team.
Below, you will find the details of your employment offer:
Position: [Job Title] Start Date: [Start Date] Location: [Location] Salary: [Salary] Probation Period: [Probation Period, if applicable]
Next Steps:
Please review this offer carefully to ensure that all details are accurate and meet your expectations.
If you accept this offer, please sign and date the enclosed copy of this letter and return it to us by [Acceptance Deadline].
If you have any questions or require further clarification, do not hesitate to reach out to our HR department details mentioned below.
Acceptance Deadline: [Acceptance Deadline]
We are excited about the prospect of you joining our team and contributing to HRConnect. Our organization values talent, dedication, and a commitment to excellence, and we believe that you embody these qualities.
Once again, congratulations on this significant milestone, and we look forward to your positive response. We are confident that you will make a meaningful impact in your new role, and we are excited to have you on board.
Thank you for choosing to be a part of HRConnect. We are excited to welcome you to our team.
  
Signed By:_____________________`);

  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false)
  const handlePrint = () => {
    const printableContent = document.querySelector(".printable-content"); // Replace with an appropriate class or ID
    if (printableContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
          </head>
          <body>
            ${printableContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
      setShowOfferLetterModal(false)
    }
  };

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
    experience: '',
    desired_salary: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredApplications = jobApplications
    .filter((app) => app?.applicant_name?.toLowerCase()?.includes(filters.applicantName.toLowerCase()))
    .filter((app) => app?.title?.toLowerCase()?.includes(filters.jobTitle.toLowerCase()))
    .filter((app) => app?.experience?.toLowerCase()?.includes(filters.experience.toLowerCase()))
    .filter((app) => app?.desired_salary?.toLowerCase()?.includes(filters.desired_salary.toLowerCase()))
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
        callForInterviewId: applicationId, interviewDate: selectedDate, interviewTime: selectedTime, email, applicantName, applicantJobName
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
        rejectedApplicationId: applicationId, email, applicantName, applicantJobName
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
            placeholder="Search by Applicant Name                 "
            className="form-control"
            value={filters.applicantName}
            onChange={(e) => handleFilter('applicantName', e.target.value)}
            style={{ width: '365px', marginRight: '10px' }}
          />
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Job Title                 "
            className="form-control"
            value={filters.jobTitle}
            onChange={(e) => handleFilter('jobTitle', e.target.value)}
            style={{ width: '350px', marginRight: '10px' }}
          />
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Experience                "
            className="form-control"
            value={filters.experience}
            onChange={(e) => handleFilter('experience', e.target.value)}
            style={{ width: '350px', marginRight: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Job Desired Salary                "
            className="form-control"
            value={filters.desired_salary}
            onChange={(e) => handleFilter('desired_salary', e.target.value)}
            style={{ width: '328px', marginRight: '10px' }}
          />
          <select
            value={filters.status}
            style={{ width: '315px' }}
            name="job_id"
            className="form-control round"
            onChange={(e) => handleFilter('status', e.target.value)}
          >
            <option value='' style={{ display: 'none' }}>Status</option>
            <option value=''>All</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
          </select>
          <span style={{ margin: '20px 0 10px 140px' }}>items per page &ensp;</span>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{ borderRadius: '5px', margin: '5px', outline: 'none', padding: '9px', width: 'fitcontent', }}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <Table striped bordered hover responsive className="custom-scrollbar-table">
          <thead>
            <tr style={{ borderBottom: '3px solid white' }}>
              <th style={{ fontWeight: 'bold' }}>ID</th>
              <th>Applicant Name</th>
              <th>Applicant Email</th>
              <th>Applicant Phone</th>
              <th>Resume</th>
              <th>Job Title</th>
              <th>Experience</th>
              <th>Desired Salary</th>
              <th>Status</th>
              <th>Action</th>
              <th>CGPA</th>
              <th>University</th>
              <th>Degree</th>
              <th>Major</th>
              <th>LinkedIn Profile</th>
              <th>Github Profile</th>
              <th>Gender</th>
              <th>ZipCode</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications
              .map((application) => (
                <tr key={application.application_id}>
                  <td>{application.application_id}</td>
                  <td><div style={{ width: '170px' }}>{application.applicant_name}</div></td>
                  <td>{application.email}</td>
                  <td><div style={{ width: '170px' }}>{application.phone_number}</div></td>
                  <td> <div style={{ width: '170px' }}>
                    <ViewResume application_id={application.application_id} applicant_name={application.applicant_name} job_id={application.job_id} />
                  </div>
                  </td>
                  <td><div style={{ width: '150px' }}>{application.title}</div></td>
                  <td>{application.experience}</td>
                  <td><div style={{ width: '100px' }}>{application.desired_salary}</div></td>
                  <td>{application.status}</td>
                  <td>
                    {application.status === "Pending" ? (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setApplicationId(application.application_id);
                            setShowInterviewModal(true);
                            setEmail(application.email);
                            setApplicantName(application.applicant_name);
                            setApplicantJobName(application.title);
                          }}
                          style={{
                            marginRight: '5px',width: '150px' }} // Add margin between buttons
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
                      </div>

                    ) : (
                      application.status === "Interview" && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setShowAcceptModal(true);
                              setEmail(application.email);
                              setApplicantName(application.applicant_name)
                              setApplicantJobName(application.title)
                            }}
                            style={{
                              color: "black",
                              backgroundColor: 'yellow',
                              width: '150px',
                              fontWeight: 'bold',
                              marginRight: '5px'
                              // marginBottom:'3px'
                            }}
                          >
                            Accept&ensp;for&ensp;job
                          </Button>
                          <Button
                            variant="danger"
                            style={{ marginRight: '5px' }}
                            size="sm"
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setShowRejectModal(true);
                            }}

                          >Reject</Button>
                          <Button
                            variant="info"
                            size="sm"
                            style={{
                              width: '150px',
                            }}
                            onClick={() => {
                              setApplicationId(application.application_id);
                              setOfferLetter((prevData) => {
                                return prevData.replace('[Applicant Name]', application.applicant_name).replace('[Job Title]', application.title).replace('[department name]', application.dep_name);
                              });
                              setShowOfferLetterModal(true);
                            }}
                          >Send Offer Letter</Button>
                        </div>
                      )
                    )}
                  </td>
                  <td><div style={{ width: 'fitcontent' }}>{application.cgpa}</div></td>
                  <td><div style={{ width: '200px' }}>{application.university}</div></td>
                  <td><div style={{ width: 'fitcontent' }}>{application.degree}</div></td>
                  <td><div style={{ width: 'fitcontent' }}>{application.major}</div></td>
                  <td>
                    <div style={{ width: '130px' }}>
                      <a className="nav-link text-secondary" target="_blank" rel='noreferrer' href={application.linkedin_profile_url.toString()}>
                        LinkedIn Link
                      </a>
                    </div>
                  </td>
                  <td>
                    <div style={{ width: '130px' }}>
                      <a className="nav-link text-secondary" target="_blank" rel='noreferrer' href={application.github_profile_url.toString()}>
                        github Link
                      </a>
                    </div>
                  </td>
                  <td><div style={{ width: 'fitcontent' }}>{application.gender}</div></td>
                  <td><div style={{ width: 'fitcontent' }}>{application.zipcode}</div></td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{ margin: '20px auto 0px auto' }}>

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
            Are you sure you want to hire applicant?
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


        <Modal show={showOfferLetterModal} onHide={() => setShowOfferLetterModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Offer Letter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea name="" className="printable-content" style={{ outline: 'none', borderRadius: '10px', }} value={offerLetter} cols="56" rows="17" onChange={(e) => { setOfferLetter(e.target.value) }} >
              This is <strong>bold</strong> text.
              This is <em>italic</em> text.
            </textarea>

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
            <Button variant="primary" onClick={handlePrint}>
              Print
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
