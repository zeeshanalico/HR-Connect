import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../BasicStyle.css';
import './MarkAttendance.css';

export default function MarkAttendance() {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [todayDate] = useState(new Date().toLocaleDateString());
  const [day] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));

  const handleMarkAttendance = () => {
    setShowConfirmationModal(true);
  };

  const handleConfirmAttendance = () => {
    setAttendanceMarked(true);
    setShowConfirmationModal(false);
  };

  return (
    <div className="full-content" id="full-content">
      <h2 className='mb-4'>Mark Attendance</h2>
      <div id="content">
        <p>Date: {todayDate}</p>
        <p>Day: {day}</p>
        {attendanceMarked ? (
          <div className="alert alert-success" role="alert">
            You have successfully marked attendance for {todayDate} ({day}).
          </div>
        ) : (
          <Button variant="primary" onClick={handleMarkAttendance}>
            Mark Attendance
          </Button>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Attendance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark attendance for {todayDate} ({day})?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmAttendance}>
            Confirm Attendance
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}




