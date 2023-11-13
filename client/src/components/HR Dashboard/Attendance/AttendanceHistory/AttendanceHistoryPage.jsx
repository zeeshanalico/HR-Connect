import React from 'react'
import SideBar from '../../SideBar'
import AttendanceHistory from './AttendanceHistory'

export default function AttendanceHistoryPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <AttendanceHistory />
      
 </div>
 </div>  
  )
}
