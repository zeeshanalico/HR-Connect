import React from 'react'
import EmployeeSideBar from '../../Employee SideBar/EmployeeSideBar'
import MarkAttendance from './MarkAttendance'

export default function MarkAttendancePage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <MarkAttendance />
 </div>
 </div>  
  )
}
