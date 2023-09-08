import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import './Navbar.css'

export default function Navbar(props) {



  return (
     props.type === "dashboard" ? (
    <nav id="Navbar" aria-label="breadcrumb">
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><a href="#">Home</a></li>

    <li className="breadcrumb-item ml-auto">
      <RouterLink to="/Login">
        <button className="btn btn-danger">
          Logout
        </button>
        </RouterLink>
       </li>
    </ol>
  </nav> ) : (
  <nav id="Navbar" aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="#basic-information">Basic Information</a></li>
    <li className="breadcrumb-item"><a href="#professional-information">Professional Information</a></li>
  <li className="breadcrumb-item ml-auto">
    <RouterLink to="/Login">
      <button className="btn btn-danger">
        Logout
      </button>
      </RouterLink>
     </li>
  
  </ol>
</nav> )
  
  ) 

}

