import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';
import axios from 'axios';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl,config } from '../../../../constants';

const inputStyle = {
  border: 'none',
  height: '30px',
  outline: 'none',
  width:'fitcontent',
  cursor: 'pointer',
  backgroundColor: 'transparent',
};

export default function LeaveApplication() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [req_id, setReqID] = useState();
  const [empId, setEmpId] = useState('');
  const [dep, setDep] = useState([]);
  const [leaveDate, setLeaveDate] = useState('');
  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    applyingDateOrder: 'asc', 
    leaveDateOrder: 'asc', 
    applicationStatus: 'All',
  });

  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      Toast('cache error','error');
      console.error('Error fetching data dep:', error);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getApplications',config);
      setLeaveApplications(response?.data[0]);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      Toast('cache error','error');
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const handleFilter = (filterType, value) => {
    console.log(filterType,value);
    setFilters({ ...filters, [filterType]: value });
  };

  const handleApprove = async () => {
    try {
      const response = await axios.put(BaseUrl + '/leaveApproved', {
        emp_id: empId,
        attendance_date: leaveDate,
      });
      if (response.data.success) {
        Toast(`${response.data.message}`);
      } else {
        Toast(`${response.data.message}`, 'error');
      }
    } catch (e) {
      console.log('Error:', e);
    }

    await fetchData();
    setShowModal(false);
  };

  const handleReject = async () => {
    try {
      const response = await axios.put(BaseUrl + '/leaveRejected', {
        empId,
        req_id: req_id,
      });
      if (response.data.success) {
        Toast(`${response.data.message}`, 'info');
        setShowModal(false);
      } else {
        Toast(`${response.data.message}`, 'error');
        setShowModal(false);
      }
    } catch (e) {
      Toast('Error occurred in rejection', 'error');
    }
    await fetchData();
    setShowRejectModal(false);
  };

  function increaseDateByOneDay(dateString) {
    const currentDate = new Date(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const applySorting = (list, order) => {
    if (order === 'asc') {
      return list.sort();
    } else if (order === 'desc') {
      return list.sort().reverse();
    }
    return list;
  };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div id="content">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>emp ID</th>
              <th>
                <input
                  type="text"
                  id="employeeNameFilter"
                  placeholder="Employees"
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
                  <option value="">Department</option>
                  {dep.map((department) => (
                    <option value={department.dep_name}>{department.dep_name}</option>
                  ))}
                </select>
              </th>
              <th>Reason</th>
              <th>
                <select
                  style={inputStyle}
                  className="form-control round"
                  value={filters.applyingDateOrder}
                  onChange={(e) => handleFilter('applyingDateOrder', e.target.value)}
                >
                  <option value="asc" style={{display:'none'}}>Applying Date</option>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </th>
              <th>
                <select
                  style={inputStyle}
                  className="form-control round"
                  value={filters.leaveDateOrder}
                  onChange={(e) => handleFilter('leaveDateOrder', e.target.value)}
                >
                  <option value="asc" style={{display:'none'}}>Leave Date</option>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </th>
              <th>
                <select
                  style={inputStyle}
                  className="form-control round"
                  value={filters.applicationStatus}
                  onChange={(e) => handleFilter('applicationStatus', e.target.value)}
                >
                  <option value="All">Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                </select>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applySorting(
              leaveApplications
                .filter((application) => {
                  const {
                    employeeName,
                    department,
                    applyingDateOrder,
                    leaveDateOrder,
                    applicationStatus,
                  } = filters;

                  return (
                    (employeeName === '' || application.emp_name.includes(employeeName)) &&
                    (department === '' || application.dep_name.includes(department)) &&
                    (applicationStatus === 'All' || application.att_status === applicationStatus)
                  );
                }),
              filters.applyingDateOrder
            )
              .map((application) => (
                <tr key={application.emp_id}>
                  <td>{application.emp_id}</td>
                  <td>{application.emp_name}</td>
                  <td>{application.dep_name}</td>
                  <td>{application.reason}</td>
                  <td>{increaseDateByOneDay(application.applying_date.slice(0, 10))}</td>
                  <td>{increaseDateByOneDay(application.leave_date.slice(0, 10))}</td>
                  <td>{application.att_status}</td>
                  <td>
                    {application.att_status === 'Pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => {
                            setShowModal(true);
                            setEmpId(application.emp_id);
                            setReqID(application.leave_req_id);
                            setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)));
                          }}
                        >
                          Approve
                        </Button>{' '}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            setShowRejectModal(true);
                            setEmpId(application.emp_id);
                            setReqID(application.leave_req_id);
                            setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)));
                          }}
                        >
                          Reject
                        </Button>{' '}
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* Approval Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Leave</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={handleReject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
