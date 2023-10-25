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
const inputStyle = {
  backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" role=\"img\" fill=\"currentColor\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" class=\"css-v86lqu eac13zx0\"%3E%3Cpath fill-rule=\"evenodd\" d=\"M13.335 14.749a6.5 6.5 0 111.414-1.414l6.105 6.104a.5.5 0 010 .707l-.708.708a.5.5 0 01-.707 0l-6.104-6.105zM14 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z\" clip-rule=\"evenodd\"%3E%3C/path%3E%3C/svg%3E')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right calc(0.375em + 0.1875rem) center",
  backgroundSize: "calc(1em + 0.5rem) calc(1em + 0.5rem)",
  paddingRight: "2em" // Adjust this value as needed
};
export default function ViewJobApplications() {

  const [jobApplications, setJobApplications] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [showInterviewAllModal, setShowInterviewAllModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [email, setEmail] = useState('');
  const [app,setApp]=useState({});
  const [applicantName, setApplicantName] = useState('');
  const [applicantJobName, setApplicantJobName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [dep, setDep] = useState([]);
  const [appTit,setAppTit]=useState('');
  const [st,setS]=useState('');
  const [offerLetter, setOfferLetter] = useState(`
  Subject: Offer of Employment
 
Dear [Applicant Name],
I hope this message finds you well. We are delighted to extend an offer of employment for the [Job Title] position at HRConnect. Your performance during the interview process demonstrated that you are a highly qualified candidate who meets our hiring criteria, and we believe that you will be a valuable addition to our team.
Below, you will find the details of your employment offer:
Position: [Job Title] 
Start Date: [Start Date] 
Salary: [Salary] 
Probation Period: 6 months
Location: HRConnect, Lahore, Pakistan

Next Steps:
Please review this offer carefully to ensure that all details are accurate and meet your expectations.
If you accept this offer, please sign and date the enclosed copy of this letter and return it to us by [Acceptance Deadline].
If you have any questions or require further clarification, do not hesitate to reach out to our HR department details mentioned below.
Acceptance Deadline: [Acceptance Deadline]
We are excited about the prospect of you joining our team and contributing to HRConnect. Our organization values talent, dedication, and a commitment to excellence, and we believe that you embody these qualities.
Once again, congratulations on this significant milestone, and we look forward to your positive response. We are confident that you will make a meaningful impact in your new role, and we are excited to have you on board.
Thank you for choosing to be a part of HRConnect. We are excited to welcome you to our team.
  
Regards,
Muhammad Ihtisham
Senior HR
HRConnect, Lahore, Pakistan
+92 316 418 1458
muhammadihtisham269@gmail.com`);

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
  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      console.error('Error fetching data dep :', error);

    }
  };
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  // ------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({
    applicantName: '',
    jobTitle: '',
    status: '',
    experience: '',
    desired_salary: '',
    gender: '',
    startDate: '',
    endDate: '',
    department: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredApplications = jobApplications
    .filter((app) => app?.applicant_name?.toLowerCase()?.includes(filters.applicantName.toLowerCase()))
    .filter((emp) => emp?.gender.includes(filters.gender))
    .filter((app) => app?.title?.toLowerCase()?.includes(filters.jobTitle.toLowerCase()))
    .filter((app) => app?.experience?.toLowerCase()?.includes(filters.experience.toLowerCase()))
    .filter((app) => app?.desired_salary?.toLowerCase()?.includes(filters.desired_salary.toLowerCase()))
    .filter((app) => app?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
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
        callForInterviewId: applicationId, interviewDate: selectedDate, interviewTime: selectedTime, email, applicantName:app.applicant_name, applicantJobName:app.title
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
    console.log(st);
    try {
      console.log(app);
      console.log(app.applicant_name,app.title);
      const response = await axios.post(BaseUrl + "/rejectApplication", {
        rejectedApplicationId: applicationId, email, applicantName:app.applicant_name, applicantJobName,appTitle:app.title,st:st
      }, config);
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


  const toggleColumn = () => {
    setIsColumnOpen(!isColumnOpen);
  };




  const [selectedApplicants, setSelectedApplicants] = useState([])
  const [isColumnOpen, setIsColumnOpen] = useState(false);

  // const selectedCheck = (e, application) => {
  //   const { name, value } = e.target;
  //   setSelectedApplicants((prevState) => {
  //     const exists = prevState.some((applicant) => applicant.applicant_id === value);

  //     if (exists) {
  //       return prevState.filter((applicant) => applicant.applicant_id !== value);
  //     } else {
  //       return [...prevState, application];
  //     }
  //   });
  // };

  const selectedCheck = (e, application) => {
    const { name, value, checked } = e.target;
    console.log('checked ', checked, name, value);
    if (checked) {
      setSelectedApplicants((prevState) => [...prevState, application]);
    } else {
      console.log(checked);
      console.log(selectedApplicants[0].application_id, value);
      setSelectedApplicants((prevState) => prevState.filter((applicant) => applicant.application_id !== Number(value)));
    }
  };

  console.log('selectedApplicants', selectedApplicants);


  const handleAllSelectedApplicantsCall = async () => {
    console.log(selectedDate, selectedTime);
    console.log('selectedApplicants', selectedApplicants);
    try {

      const response = await axios.post(BaseUrl + '/callSelectedApplicantForInterview',
        { data: selectedApplicants, interviewDate: selectedDate, interviewTime: selectedTime },
        config)
      if (response.data.success) {
        Toast(`${response.data.message}`)
      } else {
        Toast(`${response.data.message}`, "error")
      }
    } catch (e) {
      console.log(e);
      Toast('catch Error', "error")

    }
    setShowInterviewAllModal(false);
    setSelectedDate('')
    setSelectedTime('')
    await fetchData();
  }

  return (
    <div id="full-content" className="container mt-4">
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
            style={{ ...inputStyle, width: '365px', marginRight: '10px' }}
          />
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Job Title                 "
            className="form-control"
            value={filters.jobTitle}
            onChange={(e) => handleFilter('jobTitle', e.target.value)}
            style={{ ...inputStyle, width: '350px', marginRight: '10px' }}
          />
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Experience                "
            className="form-control"
            value={filters.experience}
            onChange={(e) => handleFilter('experience', e.target.value)}
            style={{ ...inputStyle, width: '350px', marginRight: '10px' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Job Desired Salary                "
            className="form-control"
            value={filters.desired_salary}
            onChange={(e) => handleFilter('desired_salary', e.target.value)}
            style={{ ...inputStyle, width: '328px', marginRight: '10px' }}
          />
          <select
            value={filters.status}
            style={{ width: '315px' }}
            name="job_id"
            className="form-control round"
            onChange={(e) => handleFilter('status', e.target.value)}
          >
            <option value='' style={{ display: 'none' }}>Search by Status</option>
            <option value=''>All</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
          </select>
          <select
            value={filters.gender}
            style={{ width: '300px', marginLeft: '10px' }}
            className="form-control round"
            onChange={(e) => handleFilter('gender', e.target.value)}
          >
            <option value={''} style={{ display: 'none' }}>Search by Gender</option>
            <option value={''}>All</option>
            <option value={'Male'}>Male</option>
            <option value={'Female'}>Female</option>
          </select>
          <select
            style={{ width: '250px', marginLeft: '10px', marginRight: '10px', }}
            value={filters.department}
            className="form-control round"
            onChange={(e) => handleFilter('department', e.target.value)}
          >
            <option value={''} style={{ display: 'none' }}>Search by Department</option>
            <option value={''}>All</option>
            {dep.map((department) => (
              <option value={department.dep_name} key={department.dep_name}>
                {department.dep_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {selectedApplicants.length !== 0 &&
            <Button onClick={() => { setShowInterviewAllModal(true) }} style={{ fontWeight: 'bolder', float: 'left', margin: '10px' }} >
              Call Selected Applicants
            </Button>}

          <Button onClick={toggleColumn} style={{ fontWeight: 'bolder', float: 'right', margin: '10px' }} >
            {isColumnOpen ? ' < ' : '>'}
          </Button>
        </div>

        <Table striped bordered hover responsive className="custom-scrollbar-table">
          <thead>
            <tr style={{ borderBottom: '3px solid white' }}>
              <th>Select</th>
              <th >ID</th>
              <th>Applicant Name</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
              {isColumnOpen && <>
                <th>Apply for Job Position</th>
                <th>Experience</th>
                <th>Desired Salary</th>
                <th>Gender</th>
                <th>Applicant Email</th>
                <th>Applicant Phone</th>
                <th>CGPA</th>
                <th>University</th>
                <th>Qualification</th>
                <th>Degree</th>
                <th>Resume</th>
                <th>LinkedIn Profile</th>
                <th>Github Profile</th>
                <th>ZipCode</th>
              </>}
            </tr>
          </thead>
          <tbody>
            {currentApplications
              .map((application) => (
                <tr key={application.application_id}>
                  <td>
                    {application.status === "Pending" &&
                      <label style={{ display: "inline-block", position: "relative", paddingLeft: "25px" }}>
                        <input
                          name="applicant_id"
                          type="checkbox"
                          value={application.application_id}
                          onChange={(e) => {
                            selectedCheck(e, application);
                          }}
                          // checked={selectedApplicants.some(applicant => applicant.applicant_id === application.application_id)}
                          style={{
                            position: "absolute",
                            cursor: "pointer",
                            top: '0',
                            left: '0',
                            height: '22px',
                            width: '22px',
                            backgroundColor: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '3px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </label>}




                  </td>
                  <td>{application.application_id}</td>
                  <td><div style={{ width: '170px' }}>{application.applicant_name}</div></td>
                  <td><div style={{ width: '170px' }}>{application.dep_name}</div></td>
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
                            setApp(application)
                          }}
                          style={{
                            marginRight: '5px', width: '150px'
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
                            setApp(application)
                            setS(application.status)
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
                              setAppTit(application.title)
                              setS(application.status)
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
                              setApp(application)
                            }}
                          >Send Offer Letter</Button>
                        </div>
                      )
                    )}
                  </td>
                  {isColumnOpen && <>
                    <td><div style={{ width: '150px' }}>{application.title}</div></td>
                    <td>{application.experience}</td>
                    <td><div style={{ width: '100px' }}>{application.desired_salary} PKR</div></td>
                    <td><div style={{ width: 'fitcontent' }}>{application.gender}</div></td>

                    <td>{application.email}</td>
                    <td><div style={{ width: '170px' }}>{application.phone_number}</div></td>
                    <td><div style={{ width: 'fitcontent' }}>{application.cgpa}</div></td>
                    <td><div style={{ width: '200px' }}>{application.university}</div></td>
                    <td><div style={{ width: '170px' }}>{application.qualification}</div></td>
                    <td><div style={{ width: '200px' }}>{application.degree}</div></td>
                    <td> <div style={{ width: '170px' }}>
                      <ViewResume application_id={application.application_id} applicant_name={application.applicant_name} job_id={application.job_id} />
                    </div>
                    </td>
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
                    <td><div style={{ width: 'fitcontent' }}>{application.zipcode}</div></td>
                  </>}
                </tr>
              ))}
          </tbody>
        </Table>

        <div style={{ margin: '20px auto 0px auto', display: 'flex', alignItems: 'center' }}>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{
              borderRadius: '5px',
              outline: 'none',
              padding: '8px',
              marginTop: "-18px",
              marginRight: '10px',
              border: 'none',
              flex: '1', // Use flex to take up available space
            }}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <optgroup label="Items per page">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </optgroup>
          </select>
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


        <Modal
          show={showInterviewAllModal}
          onHide={() => setShowInterviewAllModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Call for Interview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to call these applicants for interview?
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
              onClick={() => setShowInterviewAllModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleAllSelectedApplicantsCall}>
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
            <Modal.Title>Offer of Employment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea name="" className="printable-content" style={{ outline: 'none', borderRadius: '10px', }} value={offerLetter.replace('[Job Title]',app.title)} cols="56" rows="17" onChange={(e) => { setOfferLetter(e.target.value) }} >
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
