import React from 'react'
import MainContent from './Department/MainContent';
import SideBar from './SideBar';

export default function HrDashboard(){

return (
  
  <div className="container-fluid" id="main">
   <div className="row row-offcanvas" >
     <SideBar />
    <MainContent />
  
</div>
</div>  

) 

}