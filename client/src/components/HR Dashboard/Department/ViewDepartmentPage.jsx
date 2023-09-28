import React from 'react'
import SideBar from '../SideBar'
import ViewDepartment from './ViewDepartment'

export default function ViewDepartmentPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <ViewDepartment />
      
 </div>
 </div>  
  )
}
