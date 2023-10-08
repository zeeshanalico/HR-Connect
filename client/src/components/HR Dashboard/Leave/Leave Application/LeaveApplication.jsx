import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import './../../BasicStyle.css';
import axios from 'axios';
import Toast from '../../../../UIModules/Toast/Toast';
import { BaseUrl, config ,inputStyle} from '../../../../constants';
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
    status: '',
    startDate: '',
    endDate: ''
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  const filteredApplications = leaveApplications
    .filter((job) => job?.emp_name?.toLowerCase()?.includes(filters.employeeName.toLowerCase()))
    .filter((job) => job?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
    .filter((job) => job?.att_status?.toLowerCase()?.includes(filters.status.toLowerCase()))
    // .filter((job) => job?.applying_date >= filters?.startDate)
    // .filter((job) => !filters.endDate || job?.applying_date < filters.endDate);

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
      }, config);
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

  const [isColumnOpen, setIsColumnOpen] = useState(false);

  const toggleColumn = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Applications</h2>
      <div id="content">
        <div style={{ display: 'flex', alignItems: 'center',marginBottom:'10px' }}>
          <input
            type="text"
            id="employeeNameFilter"
            placeholder="Search by Employee Name"
            className="form-control"
            value={filters.employeeName}
            onChange={(e) => handleFilter('employeeName', e.target.value)}
            style={{ width: '33%', marginRight: '10px', marginBottom: '5px',...inputStyle,WebkitAppearance:'none' }}
          />
          <select
            className="form-control round"
            style={{ width: '33%', marginRight: '10px', marginBottom: '5px' ,...inputStyle,WebkitAppearance:'none'}}
            value={filters.department}
            onChange={(e) => handleFilter('department', e.target.value)}
          >
            <option value="" style={{ display: 'none' }}>Search by Department</option>
            <option value="">All</option>
            {dep.map((department) => (<option value={department.dep_name}>{department.dep_name}</option>))}
          </select>
          <select
            value={filters.status}
            style={{ width: '33%', marginRight: '10px', marginBottom: '5px',...inputStyle,WebkitAppearance:'none' }}
            s
            className="form-control round"
            onChange={(e) => handleFilter('status', e.target.value)}
          >
            <option value={''} style={{ display: 'none' }}>Status</option>
            <option value={''}>All</option>
            <option value={'Approved'}>Approved</option>
            <option value={'Rejected'}>Rejected</option>
            <option value={'Pending'}>Pending</option>
          </select>
        </div>
        {/* <DatePicker.RangePicker
          value={[
            filters.startDate ? new Date(filters.startDate) : null,
            filters.endDate ? new Date(filters.endDate) : null,
          ]}
          format={'YYYY-MM-DD'}
          onChange={(dates) => {
            const startDate = dates[0] ? dates[0].toISOString().split('T')[0] : '';
            const endDate = dates[1] ? dates[1].toISOString().split('T')[0] : '';
            handleFilter('startDate', startDate);
            handleFilter('endDate', endDate);
          }}
          style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
        /> */}
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={filters.startDate}
            onChange={(e) => handleFilter('startDate', e.target.value)}
            style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
          />
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={filters.endDate}
            onChange={(e) => handleFilter('endDate', e.target.value)}
            style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
          />
        </div> */}
        <Table striped bordered hover responsive>
          <thead>
            <tr style={{ borderBottom: '3px solid white' }}>
              <th>Emp ID</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Applying Date</th>
              <th>From/Leave Date</th>
              <th>To Date</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Action</th>
              {/* <th>

                <Button onClick={toggleColumn} style={{ width: '200px', margin: "5px 5px 5px 5px" }}>
                  {isColumnOpen ? 'Close Details' : 'Show Reason Details'}
                </Button>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {
              currentApplications
                .map((application) => {

                  return <tr key={application.emp_id}>
                    <td><div style={{ width: '60px' }}>{application.emp_id}</div></td>
                    <td><div style={{ width: '150px' }}>{application.emp_name}</div></td>
                    <td><div style={{ width: '220px' }}>{application.dep_name}</div></td>
                    <td><div style={{ width: '120px' }}>{application?.applying_date?.slice(0, 10)}</div></td>
                    <td><div style={{ width: '120px' }}>{application?.leave_date?.slice(0, 10)}</div></td>
                    <td><div style={{ width: '120px' }}>{application.toDate ? application?.toDate?.slice(0, 10) : 'N/A'}</div></td>
                    <td>{application.att_status}</td>
                    <td><div style={{ width: '200px' }}>{application.reason}</div></td>
                    <td>
                      <div style={{ width: '130px' }}>{application.att_status === 'Pending' && (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            style={{ margin: '0px' }}
                            onClick={() => {
                              setShowModal(true);
                              setEmpId(application.emp_id);
                              setReqID(application.leave_req_id);
                              setLeaveDate(application?.leave_date?.slice(0, 10));
                              setToDate(application?.toDate?.slice(0, 10));

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
                              setLeaveDate(application.leave_date.slice(0, 10));
                            }}
                          >
                            Reject
                          </Button>{' '}

                        </>
                      )}</div>
                    </td>
                    {isColumnOpen && (<td>
                      <div>
                        <p>This is your open column content.</p>
                      </div></td>)}

                  </tr>
                })
            }
          </tbody>
        </Table>
        <div style={{ margin: 'auto',display:'flex' ,margin:'10px auto'}}>
          <select
            name="itemsPerPage"
            id="itemsPerPage"
            style={{ height:'37px',borderRadius: '5px',marginTop:'0px',flex:'0', outline: 'none', padding: '8px', width: 'fitcontent', margin: '10px' ,border:'none'}}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
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
// import './../../BasicStyle.css';
// import axios from 'axios';
// import Toast from '../../../../UIModules/Toast/Toast';
// import { BaseUrl, config } from '../../../../constants';
// import ReactPaginate from 'react-paginate';
// import { DatePicker } from 'antd';
// import moment from 'moment'
// export default function LeaveApplication() {
//   const [leaveApplications, setLeaveApplications] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [req_id, setReqID] = useState();
//   const [empId, setEmpId] = useState('');
//   const [dep, setDep] = useState([]);
//   const [leaveDate, setLeaveDate] = useState('');
//   const [toDate, setToDate] = useState('');
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

//   // ------------------------------------------------------------------------------------------------

//   const [filters, setFilters] = useState({
//     employeeName: '',
//     department: '',
//     status: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   const formatDate = (date) => {
//     if (!date) return '';
//     const formattedDate = new Date(date).toISOString().split('T')[0];
//     return formattedDate;
//   };

//   const filteredApplications = leaveApplications
//     .filter((job) => job?.emp_name?.toLowerCase()?.includes(filters.employeeName.toLowerCase()))
//     .filter((job) => job?.dep_name?.toLowerCase()?.includes(filters.department.toLowerCase()))
//     .filter((job) => job?.att_status?.toLowerCase()?.includes(filters.status.toLowerCase()))
//     .filter((job) => {
//       const startDate = moment(job?.applying_date, 'YYYY-MM-DD');
//       const endDate = moment(job?.endDate, 'YYYY-MM-DD');
      
//       if (!filters.startDate && !filters.endDate) return true;
//       if (filters.startDate && !filters.endDate) {
//         return startDate >= moment(filters.startDate, 'YYYY-MM-DD');
//       }
//       if (!filters.startDate && filters.endDate) {
//         return endDate <= moment(filters.endDate, 'YYYY-MM-DD');
//       }
//       return startDate >= moment(filters.startDate, 'YYYY-MM-DD') && endDate <= moment(filters.endDate, 'YYYY-MM-DD');
//     });
//     console.log(filteredApplications);
//     // .filter((job) => {
//     //   const startDate = new Date(job?.applying_date);
//     //   const endDate = new Date(job?.endDate);
//     //   if (!filters.startDate && !filters.endDate) return true;
//     //   if (filters.startDate && !filters.endDate) {
//     //     return startDate >= new Date(filters.startDate);
//     //   }
//     //   if (!filters.startDate && filters.endDate) {
//     //     return endDate <= new Date(filters.endDate);
//     //   }
//     //   return startDate >= new Date(filters.startDate) && endDate <= new Date(filters.endDate);
//     // });

//   const offset = currentPage * itemsPerPage;
//   const currentApplications = filteredApplications.slice(offset, offset + itemsPerPage);

//   const handleFilter = (filterType, value) => {

//     console.log(filterType, value);
//     setFilters({ ...filters, [filterType]: value });
//     setCurrentPage(0);
//   };

//   const handleItemsPerPageChange = (e) => {
//     const newItemsPerPage = parseInt(e.target.value, 10);
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(0);
//   };

//   // ------------------------------------------------------------------------------------------------
//   const handleApprove = async () => {
//     try {
//       console.log('handleApprove', empId, leaveDate, toDate);
//       const response = await axios.put(BaseUrl + '/leaveApproved', {
//         emp_id: empId,
//         attendance_date: leaveDate,
//         toDate: toDate === 'NaN-NaN-NaN' ? '' : toDate,
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
//       }, config);
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

//   const [isColumnOpen, setIsColumnOpen] = useState(false);

//   const toggleColumn = () => {
//     setIsColumnOpen(!isColumnOpen);
//   };

//   return (
//     <div id="full-content" className="container mt-4">
//       <h2 className="mb-4">Leave Applications</h2>
//       <div id="content">
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <input
//             type="text"
//             id="employeeNameFilter"
//             placeholder="Search by Employee Name"
//             className="form-control"
//             value={filters.employeeName}
//             onChange={(e) => handleFilter('employeeName', e.target.value)}
//             style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
//           />
//           <select
//             className="form-control round"
//             style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
//             value={filters.department}
//             onChange={(e) => handleFilter('department', e.target.value)}
//           >
//             <option value="" style={{ display: 'none' }}>Department</option>
//             <option value="">All</option>
//             {dep.map((department) => (
//               <option value={department.dep_name}>{department.dep_name}</option>
//             ))}
//           </select>
//           <select
//             value={filters.status}
//             style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
//             s
//             className="form-control round"
//             onChange={(e) => handleFilter('status', e.target.value)}
//           >
//             <option value={''} style={{ display: 'none' }}>Status</option>
//             <option value={''}>All</option>
//             <option value={'Approved'}>Approved</option>
//             <option value={'Rejected'}>Rejected</option>
//             <option value={'Pending'}>Pending</option>
//           </select>
//         </div>
//         <DatePicker.RangePicker
//           value={[
//             (filters.startDate) ? moment(filters.startDate) : null,
//             filters.endDate ? moment(filters.endDate) : null,
//           ]}
//           format={'YYYY-MM-DD'}
//           onChange={(dates) => {
//             try {
//               if (Array.isArray(dates) && dates.length === 2) {
//                 const startDate = dates[0] ? dates[0].format('YYYY-MM-DD') : '';
//                 const endDate = dates[1] ? dates[1].format('YYYY-MM-DD') : '';
//                 handleFilter('startDate', startDate);
//                 handleFilter('endDate', endDate);
//               } else {
//                 console.error('Invalid dates array:', dates);
//               }
//             } catch (error) {
//               console.error('Error in DatePicker onChange handler:', error);
//             }
//           }}
//           style={{ width: '33%', marginRight: '10px', marginBottom: '5px' }}
//         />

//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <div style={{ margin: '0 10px 10px 790px', lineHeight: '1px' }}>items per page &ensp;</div>
//           <select
//             name="itemsPerPage"
//             id="itemsPerPage"
//             style={{ borderRadius: '5px', outline: 'none', padding: '8px', width: 'fitcontent', margin: '10px' }}
//             onChange={handleItemsPerPageChange}
//             value={itemsPerPage}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
//           </select>
//         </div>

//         <Table striped bordered hover responsive>
//           <thead>
//             <tr style={{ borderBottom: '3px solid white' }}>
//               <th>Emp ID</th>
//               <th>Employee Name</th>
//               <th>Department</th>
//               <th>Applying Date</th>
//               <th>From/Leave Date</th>
//               <th>To Date</th>
//               <th>Status</th>
//               <th>Reason</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentApplications.map((application) => (
//               <tr key={application.emp_id}>
//                 <td><div style={{ width: '60px' }}>{application.emp_id}</div></td>
//                 <td><div style={{ width: '150px' }}>{application.emp_name}</div></td>
//                 <td><div style={{ width: '220px' }}>{application.dep_name}</div></td>
//                 <td><div style={{ width: '120px' }}>{formatDate(application?.applying_date)}</div></td>
//                 <td><div style={{ width: '120px' }}>{formatDate(application?.leave_date)}</div></td>
//                 <td><div style={{ width: '120px' }}>{application.toDate ? formatDate(application?.toDate) : 'N/A'}</div></td>
//                 <td>{application.att_status}</td>
//                 <td><div style={{ width: '200px' }}>{application.reason}</div></td>
//                 <td>
//                   <div style={{ width: '130px' }}>
//                     {application.att_status === 'Pending' && (
//                       <>
//                         <Button
//                           variant="success"
//                           size="sm"
//                           style={{ margin: '0px' }}
//                           onClick={() => {
//                             setShowModal(true);
//                             setEmpId(application.emp_id);
//                             setReqID(application.leave_req_id);
//                             setLeaveDate(formatDate(application?.leave_date));
//                             setToDate(application.toDate ? formatDate(application?.toDate) : '');
//                           }}
//                         >
//                           Approve
//                         </Button>{' '}
//                         <Button
//                           variant="danger"
//                           size="sm"
//                           style={{ margin: '0px' }}
//                           onClick={() => {
//                             setShowRejectModal(true);
//                             setEmpId(application.emp_id);
//                             setReqID(application.leave_req_id);
//                             setLeaveDate(formatDate(application?.leave_date));
//                           }}
//                         >
//                           Reject
//                         </Button>{' '}
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//         <div style={{ margin: 'auto' }}>
//           <ReactPaginate
//             previousLabel={'Previous'}
//             nextLabel={'Next'}
//             pageCount={Math.ceil(filteredApplications.length / itemsPerPage)}
//             onPageChange={({ selected }) => setCurrentPage(selected)}
//             containerClassName={'pagination'}
//             activeClassName={'active'}
//             pageClassName={'page-item'}
//             pageLinkClassName={'page-link'}
//             previousClassName={'page-item'}
//             previousLinkClassName={'page-link'}
//             nextClassName={'page-item'}
//             nextLinkClassName={'page-link'}
//           />
//         </div>
//       </div>

//       {/* Approval Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Approve Leave</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Are you sure?</h4>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleApprove}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Reject Leave</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Are you sure?</h4>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
//             No
//           </Button>
//           <Button variant="primary" onClick={handleReject}>
//             Yes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }





