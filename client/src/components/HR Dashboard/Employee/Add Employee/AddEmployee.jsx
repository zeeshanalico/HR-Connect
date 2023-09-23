import React from 'react'
import SideBar from '../../SideBar'
import EmployeeInfo from './EmployeeInfo'
import Navbar from '../../Navbar'
import { useParams } from 'react-router-dom'

export default function AddEmployee() {

   const { id } = useParams()

  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <EmployeeInfo id={id}/>
 </div>
 </div>  
 
  )
}
