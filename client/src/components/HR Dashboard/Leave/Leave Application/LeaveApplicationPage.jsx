import React from 'react';
import SideBar from '../../SideBar';
import LeaveApplication from './LeaveApplication';

export default function LeaveApplicationPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <LeaveApplication />
      
 </div>
 </div>  
  )
}
