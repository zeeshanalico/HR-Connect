import React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import './MainContent.css';
import axios from 'axios';
import { BaseUrl, end_time } from '../../../constants';
import { config } from '../../../constants';
import Toast from '../../../UIModules/Toast/Toast';
// import { config } from '../../../constants';
export default function MainContent() {

  const [stat, setStat] = useState({})
  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDashboardData', config);
      console.log(response.data);
      setStat(response.data);
    } catch (error) {
      console.log(error);
      Toast("Cache Error", 'error')
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div class="col main pt-3 mt-3" id="dashboard">

      <Navbar type={"dashboard"} />
      <p class="lead d-none d-sm-block mb-4"><h2>Dashboard</h2></p>
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card bg-primary text-white h-100">
              <div className="card-body bg-primary" style={{ backgroundColor: "#428bca" }}>
                <div className="rotate">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Total Employees</h6>
                <h1 className="display-4">{parseInt(stat.totalEmployees,10)-1}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card text-white bg-success h-100">
              <div className="card-body bg-success">
                <div className="rotate">
                  <i className="fa fa-check-circle fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Total Departments</h6>
                <h1 className="display-4">{stat.totalDepartments}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card text-white bg-danger h-100">
              <div className="card-body bg-danger">
                <div className="rotate">
                  <i className="fa fa-times-circle fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Total Jobs Available</h6>
                <h1 className="display-4">{stat.totalJobs}</h1>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card text-white bg-warning h-100">
              <div className="card-body bg-warning">
                <div className="rotate">
                  <i className="fa fa-calendar-alt fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Total Applications Recieved</h6>
                <h1 className="display-4">{stat.totalApplications}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

