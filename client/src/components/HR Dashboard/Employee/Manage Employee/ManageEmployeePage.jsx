import React from 'react'
import SideBar from '../../SideBar'
import ManageEmployee from './ManageEmployee'

export default function ManageEmployeePage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <ManageEmployee />
 </div>
 </div>  
  )
}
