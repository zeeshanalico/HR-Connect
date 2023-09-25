import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios'
import { BaseUrl } from '../../../constants';
import Toast from '../../../UIModules/Toast/Toast';
import {useNavigate} from 'react-router-dom'

export default function EmployeeDashboard() {

  const navigate = useNavigate()

  const monthlyPresents = 22;
  const monthlyAbsents = 8;
  const performanceScore = 95;

  const handleLogout = async () => {
    try {
      const response = await axios.get(BaseUrl + '/logout');
      if (response.data.success) {
        Toast("You're Logout")
        navigate('/Login')
      }
      else {
        Toast("Issue Occured")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="col main pt-3 mt-3">
       <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
  
        <li className="breadcrumb-item ml-auto">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
           </li>
        
        </ol>
      </nav>
      <h2>Employee Dashboard</h2>
      <div className="row mb-3">
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card bg-primary text-white h-100">
            <div className="card-body bg-primary" style={{ backgroundColor: "#428bca" }}>
              <div className="rotate">
                <i className="fas fa-calendar-check fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Monthly Presents</h6>
              <h3>{monthlyPresents}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fas fa-calendar-times fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Monthly Absents</h6>
              <h3>{monthlyAbsents}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-success h-100">
            <div className="card-body bg-success">
              <div className="rotate">
                <i className="fas fa-trophy fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Performance Score</h6>
              <h3>{performanceScore}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* You can add more cards for additional information */}
    </div>
  );
}
