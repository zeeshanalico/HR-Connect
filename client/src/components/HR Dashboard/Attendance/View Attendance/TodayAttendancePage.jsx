import React from 'react'
import TodayAttendance from './TodayAttendance'
import SideBar from '../../SideBar'

export default function TodayAttendancePage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <TodayAttendance />
 </div>
 </div>  
  )
}
