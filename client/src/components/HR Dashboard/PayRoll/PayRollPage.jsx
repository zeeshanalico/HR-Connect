import React from 'react'
import SideBar from '../SideBar'
import PayRoll from './PayRoll'
export default function PayRollPage() {
  return (
    <div className="container-fluid" id="main">
    <div className="row row-offcanvas row-offcanvas-left">
      <SideBar />
      <PayRoll />
 </div>
 </div>  
  )
}
 