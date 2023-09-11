import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';
import axios from 'axios'
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl } from '../../../../constants';

export default function LeaveApplication() {

  const [leaveApplications, setLeaveApplications] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const [empId, setEmpId] = useState('')
  const [leaveDate, setLeaveDate] = useState('')

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getApplications');
      setLeaveApplications(response?.data[0]);
      console.log(response.data[0]);
      console.log(response.data[0][2].leave_date);
    } catch (error) {
      console.error('Error fetching attendence :', error);
      Toast("An Error Occured", 'error')
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleApprove = async () => {
    console.log(empId, leaveDate);
    try {
      const response = await axios.put(BaseUrl + '/leaveApproved', { emp_id: empId, attendance_date: leaveDate });
      if (response.date.success) {
        Toast(`${response.data.message}`, 'info')
      }
      else {
        Toast(`${response.data.message}`, 'error')

      }
    } catch (e) {
      Toast('Error occured in submission', 'error')
    }

    await fetchData();
    setShowModal(false)
  }
  const handleReject = async () => {
    console.log(empId, leaveDate);
    try {
      const response = await axios.put(BaseUrl + '/leaveRejected', { emp_id: empId });
      if (response.date.success) {
        Toast(`${response.data.message}`, 'info')
      }
      else {
        Toast(`${response.data.message}`, 'error')

      }
    } catch (e) {
      Toast('Error occured in rejection', 'error')
    }
    await fetchData();
    setShowModal(false)
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
              <th>Employee Name</th>
              <th>Department</th>
              <th>Reason</th>

              <th>Application Status</th>
              <th>Leave Date</th>
              <th>Applying Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveApplications?.map(application => (
              <tr key={application.emp_id}>
                <td>{application.emp_name}</td>
                <td>{application.dep_name}</td>
                <td>{application.reason}</td>
                <td>{application.att_status}</td>
                <td>{increaseDateByOneDay(application.leave_date.slice(0, 10))}</td>
                <td>{increaseDateByOneDay(application.applying_date.slice(0, 10))}</td>

                <td>
                  {application.att_status === 'Pending' && (
                    <>
                      <Button variant="success" size="sm" onClick={() => {
                        setShowModal(true)
                        setEmpId(application.emp_id);
                        setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)))
                      }}>
                        Approve
                      </Button>{' '}

                      <Button variant="danger" size="sm" onClick={() => {
                        setShowRejectModal(true)
                        setEmpId(application.emp_id);
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

          {/*<Form>
             <Form.Group controlId="approvedDays">
              <Form.Label>Approved Days</Form.Label>
              <Form.Control
                type="number"
                value={approvedDays}
                onChange={(e) => setApprovedDays(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="approvedStartDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                value={approvedStartDate}
                onChange={(e) => setApprovedStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="approvedEndDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                value={approvedEndDate}
                onChange={(e) => setApprovedEndDate(e.target.value)}
              />
            </Form.Group> 
          </Form>*/}
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


