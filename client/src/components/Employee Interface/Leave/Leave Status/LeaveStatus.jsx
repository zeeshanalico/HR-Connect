import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../../../constants'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Toast from '../../../../UIModules/Toast/Toast';
import { config } from '../../../../constants';
import ReactPaginate from 'react-paginate';

const LeaveStatus = () => {

  const [emp_leave_history, setEmpLev] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BaseUrl + `/empLeaveHistory`, config)
        console.log(response.data);

        setEmpLev(response.data)
      } catch (error) {
        Toast("Data not Loaded", 'error')
        console.log(error);
      }
    }
    fetchData();
  }, [])

  // ------------------------------------------------------------------------------------------------

  const [filters, setFilters] = useState({
    status: '',
    applyingDate: '',
    fromDate: '',
    toDate: '',
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredApplications = emp_leave_history
    .filter((job) => job?.att_status?.toLowerCase()?.includes(filters.status.toLowerCase()))
    .filter((job) => job?.applying_date.includes(filters.applyingDate))
    // .filter((job) => job?.leave_date.includes(filters.fromDate))
    // .filter((job) => job?.toDate.includes(filters.toDate))

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
  //------------------------------------------------------------------------------------------------

  return (
    <div id="full-content" className="container mt-4">
      <h2 className="mb-4">Leave Application History</h2>
      <div id="content">
        <div style={{ display: 'flex', alignItems: 'center',marginBottom: '10px',gap:'10px' }}>
          <input
          value="Applying Date"
          disabled
          style={{flexBasis:'1px',borderRadius:'6px 0 0 6px',backgroundColor:'#5DBCC2',marginRight:'-70px',padding:'6px',border:'none',outline:'none'}}
          />
          <input
            type="date"
            id="applyingDate"
            className="form-control"
            value={filters.applyingDate}
            style={{borderRadius:'0 6px 6px 0'}}
            onChange={(e) => handleFilter('applyingDate', e.target.value)}
          />
          <select
            value={filters.status}
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
        {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="date"
            id="fromDate"
            className="form-control"
            value={filters.fromDate}
            onChange={(e) => handleFilter('fromDate', e.target.value)}
          />

          <input
            type="date"
            id="toDate"
            className="form-control"
            value={filters.toDate}
            onChange={(e) => handleFilter('toDate', e.target.value)}
          />
        </div> */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Applying Date</th>
              <th>Leave Date/From Date</th>
              <th>To Date</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              currentApplications?.map((h) => {
                return (
                  <tr>
                    <td>{h?.applying_date?.slice(0, 10)}</td>
                    <td>{h?.leave_date?.slice(0, 10)}</td>
                    <td>{h.toDate ? h?.toDate?.slice(0, 10) : 'N/A'}</td>
                    <td>{h.reason}</td>
                    <td>{h.att_status}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div >
      <div style={{ display: 'flex', margin: '10px auto' }}>
        <select
          name="itemsPerPage"
          style={{height:'38px',flex: '1',flexBasis:"200px",border:'none',outline:'none',borderRadius:'5px',marginRight:'5px'}}
          id="itemsPerPage"
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
    </div >
  )
}

export default LeaveStatus;