import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../BasicStyle.css';
import './MarkAttendance.css';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl } from '../../../../constants';
import axios from 'axios';
const emp_id = 3;
export default function MarkAttendance() {

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(true);
  const [todayDate] = useState(new Date().toISOString().split('T')[0]);
  const [day] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }));

  const fetchData = async () => {
    try {
      const response = await axios.post(BaseUrl + '/getAttendencebyEmp',{emp_id,todayDate});
      console.log(response?.data[0]?.status);
      if(response?.data[0]?.status=='Absent'||response?.data[0]?.status=='Late'||response?.data[0]?.status=='Leave'||response?.data[0]?.status=='Present'){
        setAttendanceMarked(true);
      }else
      setAttendanceMarked(false);
    } catch (error) {
      console.error('Error fetching attendence :', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [])


  const handleAttendance= async(att_status)=>{
    console.log(att_status)
    try {
      const response=await axios.put(BaseUrl+'/updateAttendance', {emp_id,att_status});
      if(response.data.status){
        Toast('Attendence Markes as Present');
      }
    } catch (error) {
      Toast(`an error occured while Marking attendance: ${error}`,'error')
    }
    setAttendanceMarked(true);
    setShowConfirmationModal(false)

  }
  return (
    <div className="full-content" id="full-content">
      <h2 className='mb-4'>Mark Attendance</h2>
      <div id="content">
        <p>Date: {todayDate}</p>
        <p>Day: {day}</p>
        {attendanceMarked ? (
          <div className="alert alert-success" role="alert">
            You had marked your attendance for {todayDate} ({day}).
          </div>
        ) : (
          <Button variant="primary" onClick={() => { setShowConfirmationModal(true) }}>
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
          Mark your Attendance for the day {todayDate} ({day})!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleAttendance('Present')}>
            Present
          </Button>
          <Button variant="primary" onClick={() => handleAttendance('Absent')}>
            Absent
          </Button>
          <Button variant="primary" onClick={() => handleAttendance('leave')}>
            Leave
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}




