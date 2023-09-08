import React from 'react'
import SideBar from '../../SideBar'
import EmployeeInfo from './EmployeeInfo'
import Navbar from '../../Navbar'

export default function AddEmployee() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <EmployeeInfo />
 </div>
 </div>  
 
  )
}
