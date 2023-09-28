import React from 'react';
import SideBar from '../../SideBar';
import ViewJobApplications from './ViewJobApplications';

export default function ViewApplicationsPage() {
  return (
<div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <ViewJobApplications />
      
 </div>
 </div>  
  )
}
