import React from 'react'
import EmployeeSideBar from '../../Employee SideBar/EmployeeSideBar'
import SubmitLeave from './SubmitLeave'

export default function SubmitLeavePage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <SubmitLeave/>
 </div>
 </div>  
  )
}
