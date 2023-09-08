import React from 'react'
import EmployeeSideBar from '../Employee SideBar/EmployeeSideBar'
import EmployeeDashboard from './EmployeeDashboard'

export default function EmployeeDashboardPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <EmployeeSideBar />
      <EmployeeDashboard />
 </div>
 </div>  
  )
}
   