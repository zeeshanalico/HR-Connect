import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';

const sampleLeaveApplications = [
  {
    id: 1,
    employeeName: 'John Doe',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2023-08-15',
    endDate: '2023-08-20',
    status: 'Pending',
    action: null,
    approvedDays: 0,
    approvedStartDate: null,
    approvedEndDate: null,
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    department: 'HR',
    leaveType: 'Vacation',
    startDate: '2023-09-10',
    endDate: '2023-09-15',
    status: 'Approved',
    action: 'Approved by HR Manager',
    approvedDays: 6,
    approvedStartDate: '2023-09-10',
    approvedEndDate: '2023-09-15',
  },
  // ... Add more sample leave applications
];

export default function LeaveApplication() {
  const [leaveApplications, setLeaveApplications] = useState(sampleLeaveApplications);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [approvedDays, setApprovedDays] = useState(0);
  const [approvedStartDate, setApprovedStartDate] = useState(null);
  const [approvedEndDate, setApprovedEndDate] = useState(null);

  const handleApprove = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowModal(true);
  };

  const handleReject = (applicationId) => {
    const updatedApplications = leaveApplications.map(application => {
      if (application.id === applicationId) {
        return { ...application, status: 'Rejected', action: 'Rejected' };
      }
      return application;
    });

    setLeaveApplications(updatedApplications);
  };

  const handleEdit = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedApplicationId(null);
    setApprovedDays(0);
    setApprovedStartDate(null);
    setApprovedEndDate(null);
  };

  const handleModalSave = () => {
    const updatedApplications = leaveApplications.map(application => {
      if (application.id === selectedApplicationId) {
        return {
          ...application,
          status: 'Approved',
          action: 'Approved',
          approvedDays,
          approvedStartDate,
          approvedEndDate,
        };
      }
      return application;
    });

    setLeaveApplications(updatedApplications);
    setShowModal(false);
    setSelectedApplicationId(null);
    setApprovedDays(0);
    setApprovedStartDate(null);
    setApprovedEndDate(null);
  };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div id="content">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Approved Start Date</th>
              <th>Approved End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveApplications.map(application => (
              <tr key={application.id}>
                <td>{application.employeeName}</td>
                <td>{application.department}</td>
                <td>{application.leaveType}</td>
                <td>{application.startDate}</td>
                <td>{application.endDate}</td>
                <td>{application.status}</td>
                <td>{application.approvedStartDate}</td>
                <td>{application.approvedEndDate}</td>
                <td>
                  {application.status === 'Pending' && (
                    <>
                      <Button variant="success" size="sm" onClick={() => handleApprove(application.id)}>
                        Approve
                      </Button>{' '}
                      <Button variant="danger" size="sm" onClick={() => handleReject(application.id)}>
                        Reject
                      </Button>{' '}
                    </>
                  )}
                  {(application.status === 'Approved' || application.status === 'Rejected') && (
                    <Button variant="primary" size="sm" onClick={() => handleEdit(application.id)}>
                      Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Approval Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


