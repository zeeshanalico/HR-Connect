import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';
import axios from 'axios';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl, config } from '../../../../constants';
import ReactPaginate from 'react-paginate';
export default function LeaveApplication() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [req_id, setReqID] = useState();
  const [empId, setEmpId] = useState('');
  const [dep, setDep] = useState([]);
  const [leaveDate, setLeaveDate] = useState('');
  const [toDate, setToDate] = useState('');
  const currentDate = new Date().toISOString().split('T')[0]
  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      Toast('cache error', 'error');
      console.error('Error fetching data dep:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getApplications', config);
      setLeaveApplications(response?.data[0]);
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      Toast('cache error', 'error');
    }
  };

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);
  // ------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({
    employeeName: '',
    department: '',
    applyingDateOrder: 'asc',
    leaveDateOrder: 'asc',
    applicationStatus: 'All',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredApplications = leaveApplications
    .filter((job) => job?.emp_name?.toLowerCase()?.includes(filters.employeeName.toLowerCase()))
    .filter((job) => job?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
    .filter((job) => job?.leave_date >= currentDate);
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
  const handleApprove = async () => {
    try {
      console.log('handleApprove', empId, leaveDate, toDate);
      const response = await axios.put(BaseUrl + '/leaveApproved', {
        emp_id: empId,
        attendance_date: leaveDate, toDate: toDate === 'NaN-NaN-NaN' ? '' : ''
      }, config);
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
      },config);
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

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div id="content">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Employee Name                 "
            className="form-control"
            value={filters.employeeName}
            onChange={(e) => handleFilter('employeeName', e.target.value)}
            style={{ width: '300px', marginRight: '10px', marginBottom: '5px' }}
          /> 
          <select
            className="form-control round"
            style={{width:'300px',marginBottom:'7px'}}
            value={filters.department}
            onChange={(e) => handleFilter('department', e.target.value)}
          >
            <option value="">Department</option>
            {dep.map((department) => (<option value={department.dep_name}>{department.dep_name}</option>))}
          </select>
          <div style={{ margin: '0 0 10px 200px' }}>items per page &ensp;</div>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{ borderRadius: '5px', outline: 'none', padding: '8px', width: 'fitcontent', }}
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
            <tr  style={{ borderBottom: '3px solid white' }}>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Reason</th>
              <th>Applying Date</th>
              <th>From/Leave Date</th>
              <th>To Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentApplications
                .map((application) => {

                  return <tr key={application.emp_id}>
                    <td>{application.emp_id}</td>
                    <td>{application.emp_name}</td>
                    <td>{application.dep_name}</td>
                    <td>{application.reason}</td>
                    <td>{increaseDateByOneDay(application?.applying_date?.slice(0, 10))}</td>
                    <td>{increaseDateByOneDay(application?.leave_date?.slice(0, 10))}</td>
                    <td>{application.toDate ? increaseDateByOneDay(application?.toDate?.slice(0, 10)) : 'N/A'}</td>
                    <td>{application.att_status}</td>
                    <td>
                      {application.att_status === 'Pending' && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            style={{ margin: '0px' }}
                            onClick={() => {
                              setShowModal(true);
                              setEmpId(application.emp_id);
                              setReqID(application.leave_req_id);
                              setLeaveDate(increaseDateByOneDay(application?.leave_date?.slice(0, 10)));
                              setToDate(increaseDateByOneDay(application?.toDate?.slice(0, 10)));

                            }}
                          >
                            Approve
                          </Button>{' '}
                          <Button
                            variant="danger"
                            size="sm"
                            style={{ margin: '0px' }}
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
                })
            }
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

// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Table from 'react-bootstrap/Table';
// import axios from 'axios';
// import Toast from '../../../../UIModules/Toast/Toast';
// import { BaseUrl, config } from '../../../../constants';
// import ReactPaginate from 'react-paginate';
// import DatePicker from 'react-datepicker'; // Import the DatePicker component
// import 'react-datepicker/dist/react-datepicker.css';

// const inputStyle = {
//   border: 'none',
//   height: '30px',
//   outline: 'none',
//   width: 'fitcontent',
//   cursor: 'pointer',
//   backgroundColor: 'transparent',
// };

// export default function LeaveApplication() {
//   const [leaveApplications, setLeaveApplications] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [req_id, setReqID] = useState();
//   const [empId, setEmpId] = useState('');
//   const [dep, setDep] = useState([]);
//   const [leaveDate, setLeaveDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [startDate, setStartDate] = useState(null); // State for the start date
//   const [endDate, setEndDate] = useState(null); // State for the end date
//   const currentDate = new Date().toISOString().split('T')[0];

//   const fetchData2 = async () => {
//     try {
//       const response = await axios.get(BaseUrl + '/getDepartment');
//       setDep(response.data);
//     } catch (error) {
//       Toast('cache error', 'error');
//       console.error('Error fetching data dep:', error);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(BaseUrl + '/getApplications', config);
//       setLeaveApplications(response?.data[0]);
//       console.log(response.data[0]);
//     } catch (error) {
//       console.error('Error fetching attendance:', error);
//       Toast('cache error', 'error');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchData2();
//   }, []);

//   const [filters, setFilters] = useState({
//     employeeName: '',
//     department: '',
//     applyingDateOrder: 'asc',
//     leaveDateOrder: 'asc',
//     applicationStatus: 'All',
//   });

//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [filteredApplications, setFilteredApplications] = useState([]); // State for filtered data

//   const offset = currentPage * itemsPerPage;

//   useEffect(() => {
//     // Update the filtered data whenever startDate or endDate changes
//     const filteredData = leaveApplications.filter((application) => {
//       const applicationDate = new Date(application.leave_date);
//       return (
//         applicationDate >= startDate &&
//         applicationDate <= endDate
//       );
//     });

//     setFilteredApplications(filteredData);
//   }, [startDate, endDate, leaveApplications]);

//   const handleFilter = (filterType, value) => {
//     setFilters({ ...filters, [filterType]: value });
//     setCurrentPage(0);
//   };

//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value, 10);
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(0);
//   };

//   const handleApprove = async () => {
//     try {
//       console.log('handleApprove', empId, leaveDate, toDate);
//       const response = await axios.put(BaseUrl + '/leaveApproved', {
//         emp_id: empId,
//         attendance_date: leaveDate,
//         toDate: toDate === 'NaN-NaN-NaN' ? '' : '',
//       }, config);
//       if (response.data.success) {
//         Toast(`${response.data.message}`);
//       } else {
//         Toast(`${response.data.message}`, 'error');
//       }
//     } catch (e) {
//       console.log('Error:', e);
//     }

//     await fetchData();
//     setShowModal(false);
//   };

//   const handleReject = async () => {
//     try {
//       const response = await axios.put(BaseUrl + '/leaveRejected', {
//         empId,
//         req_id: req_id,
//       });
//       if (response.data.success) {
//         Toast(`${response.data.message}`, 'info');
//         setShowModal(false);
//       } else {
//         Toast(`${response.data.message}`, 'error');
//         setShowModal(false);
//       }
//     } catch (e) {
//       Toast('Error occurred in rejection', 'error');
//     }
//     await fetchData();
//     setShowRejectModal(false);
//   };

//   function increaseDateByOneDay(dateString) {
//     const currentDate = new Date(dateString);
//     currentDate.setDate(currentDate.getDate() + 1);
//     const year = currentDate.getFullYear();
//     const month = String(currentDate.getMonth() + 1).padStart(2, '0');
//     const day = String(currentDate.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }
// // ... (previous code)

// return (
//   <div id="full-content" className="container mt-4">
//     <h2 className="mb-4">Leave Applications</h2>
//     <div id="content">
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <input
//           type="text"
//           id="employeeNameFilter"
//           placeholder="Search by Employee Name"
//           className="form-control"
//           value={filters.employeeName}
//           onChange={(e) => handleFilter('employeeName', e.target.value)}
//           style={{ width: '300px', marginRight: '10px', marginBottom: '5px' }}
//         />
//         <div style={{ margin: '0 0 10px 500px' }}>Items per page &ensp;</div>
//         <select
//           name="itemsPerPage"
//           id="itemsPerPage"
//           style={{ borderRadius: '8px', outline: 'none', padding: '9px', width: 'fitcontent' }}
//           onChange={handleItemsPerPageChange}
//           value={itemsPerPage}
//         >
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//         </select>
//       </div>
//       <div>
//         {/* Date Range Filter */}
//         <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             placeholderText="Start Date"
//             dateFormat="yyyy-MM-dd"
//             className="form-control"
//           />
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             placeholderText="End Date"
//             dateFormat="yyyy-MM-dd"
//             className="form-control"
//             style={{ marginLeft: '10px' }}
//           />
//         </div>
//       </div>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Emp ID</th>
//             <th>Employee Name</th>
//             <th>
//               <select
//                 className="form-control round"
//                 style={inputStyle}
//                 value={filters.department}
//                 onChange={(e) => handleFilter('department', e.target.value)}
//               >
//                 <option value="">Department</option>
//                 {dep.map((department) => (<option value={department.dep_name}>{department.dep_name}</option>))}
//               </select>
//             </th>
//             <th>Reason</th>
//             <th>Applying Date</th>
//             <th>From/Leave Date</th>
//             <th>To Date</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredApplications.map((application) => { // Use filteredApplications instead of currentApplications
//             return (
//               <tr key={application.emp_id}>
//                 <td>{application.emp_id}</td>
//                 <td>{application.emp_name}</td>
//                 <td>{application.dep_name}</td>
//                 <td>{application.reason}</td>
//                 <td>{increaseDateByOneDay(application?.applying_date?.slice(0, 10))}</td>
//                 <td>{increaseDateByOneDay(application?.leave_date?.slice(0, 10))}</td>
//                 <td>{application.toDate ? increaseDateByOneDay(application?.toDate?.slice(0, 10)) : 'N/A'}</td>
//                 <td>{application.att_status}</td>
//                 <td>
//                   {application.att_status === 'Pending' && (
//                     <>
//                       <Button
//                         variant="success"
//                         size="sm"
//                         style={{ margin: '0px' }}
//                         onClick={() => {
//                           setShowModal(true);
//                           setEmpId(application.emp_id);
//                           setReqID(application.leave_req_id);
//                           setLeaveDate(increaseDateByOneDay(application?.leave_date?.slice(0, 10)));
//                           setToDate(increaseDateByOneDay(application?.toDate?.slice(0, 10)));
//                         }}
//                       >
//                         Approve
//                       </Button>{' '}
//                       <Button
//                         variant="danger"
//                         size="sm"
//                         style={{ margin: '0px' }}
//                         onClick={() => {
//                           setShowRejectModal(true);
//                           setEmpId(application.emp_id);
//                           setReqID(application.leave_req_id);
//                           setLeaveDate(increaseDateByOneDay(application.leave_date.slice(0, 10)));
//                         }}
//                       >
//                         Reject
//                       </Button>{' '}
//                     </>
//                   )}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </Table>
//       <div style={{ margin: 'auto' }}>
//         <ReactPaginate
//           previousLabel={'Previous'}
//           nextLabel={'Next'}
//           pageCount={Math.ceil(filteredApplications.length / itemsPerPage)}
//           onPageChange={({ selected }) => setCurrentPage(selected)}
//           containerClassName={'pagination'}
//           activeClassName={'active'}
//           pageClassName={'page-item'}
//           pageLinkClassName={'page-link'}
//           previousClassName={'page-item'}
//           previousLinkClassName={'page-link'}
//           nextClassName={'page-item'}
//           nextLinkClassName={'page-link'}
//         />
//       </div>
//     </div>

//     {/* Approval Modal */}
//     <Modal show={showModal} onHide={() => setShowModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Approve Leave</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Are you sure?</h4>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowModal(false)}>
//           No
//         </Button>
//         <Button variant="primary" onClick={handleApprove}>
//           Yes
//         </Button>
//       </Modal.Footer>
//     </Modal>

//     <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
//       <Modal.Header closeButton>
//         <Modal.Title>Reject Leave</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Are you sure?</h4>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
//           No
//         </Button>
//         <Button variant="primary" onClick={handleReject}>
//           Yes
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   </div>
// );
// }

