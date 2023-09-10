import React from 'react'
import EmployeeSideBar from '../../Employee SideBar/EmployeeSideBar';
import AttendanceRecord from './AttendanceRecord';

export default function AttendanceRecordPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <AttendanceRecord/>
 </div>
 </div>  
  )
}
