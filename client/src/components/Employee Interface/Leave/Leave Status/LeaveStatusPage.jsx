import React from 'react'
import EmployeeSideBar from '../../Employee SideBar/EmployeeSideBar'
import LeaveStatus from './LeaveStatus'

export default function LeaveStatusPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <LeaveStatus/>
   
 </div>
 </div>  
  )
}
