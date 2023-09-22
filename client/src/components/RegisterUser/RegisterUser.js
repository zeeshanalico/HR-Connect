import React from 'react'
import RegisterPage from './RegisterPage';
import SideBar from '../HR Dashboard/SideBar';

export default function HrDashboard(){

return (
  
  <div className="container-fluid" id="main">
   <div className="row row-offcanvas" >
     <SideBar />
    <RegisterPage />
  
</div>
</div>  

) 

}