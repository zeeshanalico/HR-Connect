import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';
import axios from 'axios'
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl } from '../../../../constants';

const inputStyle = {
  border: "none",
  height: "30px",
  outline: "none",
  cursor: "pointer",
  backgroundColor: "transparent",
};

export default function LeaveApplication() {

  const [leaveApplications, setLeaveApplications] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [req_id, setReqID] = useState();
  const [empId, setEmpId] = useState('');
  const [dep, setDep] = useState([]);
  const [leaveDate, setLeaveDate] = useState('')
  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    applyingDate: '',
    leaveDate: '',
    applicationStatus: 'All',
  });

  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      console.error('Error fetching data dep :', error);
      throw error;
    }
  };

  
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getApplications');
      setLeaveApplications(response?.data[0]);
      console.log(response.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error fetching attendence :', error);
      Toast("An Error Occured", 'error')
      throw error;
    }
  };
  
  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleFilter = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value, });
  };


  const handleApprove = async () => {
    console.log(empId, leaveDate);
    try {
      const response = await axios.put(BaseUrl + '/leaveApproved', { emp_id: empId, attendance_date: leaveDate });
      if (response.data.success) {
        Toast(`${response.data.message}`)
      }
      else {
        Toast(`${response.data.message}`, 'error')
      }
    } catch (e) {
      console.log('error');
      console.log(e);
    }

    await fetchData();
    setShowModal(false)
  }
  const handleReject = async () => {
    console.log(empId);
    console.log('reqid', req_id);
    try {
      const response = await axios.put(BaseUrl + '/leaveRejected', { empId, req_id: req_id });
      if (response.data.success) {
        Toast(`${response.data.message}`, 'info')
        setShowModal(false)
      }
      else {
        Toast(`${response.data.message}`, 'error')
        setShowModal(false)

      }
    } catch (e) {
      Toast('Error occured in rejection', 'error')
    }
    await fetchData();
    setShowRejectModal(false)
  }

  function increaseDateByOneDay(dateString) {
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + 1);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div id="content">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                <input
                  type="text"
                  id="employeeNameFilter"
                  placeholder='Employees'
                  className="form-control"
                  value={filters.employeeName}
                  onChange={(e) => handleFilter('employeeName', e.target.value)}
                  style={inputStyle}
                />
              </th>
              <th>
                <select
                  className="form-control round"
                  style={inputStyle}
                  value={filters.department}
                  onChange={(e) => handleFilter('department', e.target.value)}
                >
                  {dep.map((department => {
                    return <option value={department.dep_name}>{department.dep_name}</option>
                  }))}
                </select>
              </th>
              <th>Reason</th>

              <th>Applying Date :
                <input
                  type="date"
                  id="applyingDateFilter"
                  placeholder='Applying Date'
                  className="form-control"
                  value={filters.applyingDate}
                  onChange={(e) => handleFilter('applyingDate', e.target.value)}
                  style={inputStyle}
                />
              </th>
              <th>Leave Date :
                <input
                  type="date"
                  id="leaveDateFilter"
                  placeholder='Leave Date'
                  className="form-control"
                  value={filters.leaveDate}
                  onChange={(e) => handleFilter('leaveDate', e.target.value)}
                  style={inputStyle}
                />
              </th>
              <th> <select
                style={inputStyle}
                className="form-control round"
                value={filters.applicationStatus}
                onChange={(e) => handleFilter('applicationStatus', e.target.value)}
              >
                <option value="All">Status</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
              </select></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveApplications
              .filter((application) => {
                const {
                  employeeName,
                  department,
                  applyingDate,
                  leaveDate,
                  applicationStatus,
                } = filters;

                return (
                  (employeeName === '' || application.emp_name.includes(employeeName)) &&
                  (department === '' || application.dep_name.includes(department)) &&
                  (applyingDate === '' || application.applying_date.includes(applyingDate)) &&
                  (leaveDate === '' || application.leave_date.includes(leaveDate)) &&
                  (applicationStatus === 'All' || application.att_status === applicationStatus)
                );
              })
              .map(application => (
                <tr key={application.emp_id}>
                  <td>{application.emp_name}</td>
                  <td>{application.dep_name}</td>
                  <td>{application.reason}</td>
                  <td>{increaseDateByOneDay(application.applying_date.slice(0, 10))}</td>
                  <td>{increaseDateByOneDay(application.leave_date.slice(0, 10))}</td>
                  <td>{application.att_status}</td>

                  <td>
                    {application.att_status === 'Pending' && (
                      <>
                        <Button variant="success" size="sm" onClick={() => {
                          setShowModal(true)
                          setEmpId(application.emp_id);
                          setReqID(application.leave_req_id)
                          setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)))
                        }}>
                          Approve
                        </Button>{' '}

                        <Button variant="danger" size="sm" onClick={() => {
                          setShowRejectModal(true)
                          setEmpId(application.emp_id);
                          setReqID(application.leave_req_id)
                          setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)))
                        }
                        }>
                          Reject
                        </Button>{' '}
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div >

      {/* Approval Modal */}
      <Modal Modal show={showModal} onHide={() => { setShowModal(false) }} >
        <Modal.Header closeButton>
          <Modal.Title>Approve Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowModal(false)
          }}>
            No
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal Modal show={showRejectModal} onHide={() => { setShowRejectModal(false) }} >
        <Modal.Header closeButton>
          <Modal.Title>Reject Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShowRejectModal(false)
          }}>
            No
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}


