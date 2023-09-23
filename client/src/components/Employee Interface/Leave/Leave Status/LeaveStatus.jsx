import React, { useEffect, useState } from 'react'
import { employeeId, BaseUrl } from '../../../../constants'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Toast from '../../../../UIModules/Toast/Toast';

const LeaveStatus = () => {

    const [emp_leave_history, setEmpLev] = useState()

    useEffect(()=>{
        const fetchData = async () => {

            try {
                // Fetching Employee's Leave History
                const response = await axios.get(BaseUrl+`/empLeaveHistory/${employeeId}`)
                console.log(response.data);

                setEmpLev(response.data)
            } catch (error) {
                Toast("Data not Loaded", 'error')
                console.log(error);
            }

        }

        fetchData();
    }, [])

    return (
        <div id="full-content" className="container mt-4">
          <h2 className="mb-4">Leave Application History</h2>
          <div id="content">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Applying Date</th>
                  <th>Leave Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                    emp_leave_history && emp_leave_history.map((h) => {
                        return (
                            <tr>
                                <td>{h.applying_date.slice(0, 10)}</td>
                                <td>{h.leave_date.slice(0, 10)}</td>
                                <td>{h.reason}</td>
                                <td>{h.att_status}</td>
                            </tr>
                        )
                    })
                }
              </tbody>
            </Table>
          </div >
        </div >
    )
}

export default LeaveStatus;