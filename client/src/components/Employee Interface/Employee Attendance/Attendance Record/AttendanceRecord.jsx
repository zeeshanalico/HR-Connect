import React, { useState ,useEffect} from 'react';
import { Table } from 'react-bootstrap';
import { config,BaseUrl } from '../../../../constants';
import Toast from '../../../../UIModules/Toast/Toast';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const AttendanceRecord = () => {
  const [attendance,setAttendance]=useState([]);
  useEffect(()=>{
    const fetchData = async () => {
        try {
            const response = await axios.get(BaseUrl+`/attendanceRecord`,config)
            console.log(response.data);
            setAttendance(response.data)
        } catch (error) {
            Toast("Data not Loaded", 'error')
            console.log(error);
        }

    }

    fetchData();
}, [])




const [currentPage, setCurrentPage] = useState(0);
const [itemsPerPage, setItemsPerPage] = useState(5);


const offset = currentPage * itemsPerPage;
const currentApplications = attendance.slice(offset, offset + itemsPerPage);

const handleItemsPerPageChange = (e) => {
  const newItemsPerPage = parseInt(e.target.value, 10);
  setItemsPerPage(newItemsPerPage);
  setCurrentPage(0);

};
  return (
    <div id="full-content" className="container mt-4">
    <h2 className="mb-4">Current Month Attendance Record</h2>
    <div id="content">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Attendance ID</th>
            <th>Attendance Date </th>
           <th>Status</th>
          </tr>
        </thead>
        <tbody>
        {currentApplications.map((att)=>{return <tr>
          <td>{att.attendance_id}</td>
          <td>{att.attendance_date?.slice(0,10)}</td>
          <td>{att.status}</td>
        </tr>})}
        </tbody>
      </Table>
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
          pageCount={Math.ceil(attendance.length / itemsPerPage)} // Use filteredApplications.length
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
  </div >

  );
};

export default AttendanceRecord;
