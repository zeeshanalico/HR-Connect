import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from 'react';
import { BaseUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../UIModules/Toast/Toast';
import { config } from '../../../constants';


export default function EmployeeDashboard() {

  const [empStats, setEmpStats] = useState({})
  const [empDashStats, setEmpDashStats] = useState({})
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.post(BaseUrl + '/getEmpInfobyEmpId', {}, config);
      console.log(response.data);
      setEmpStats(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.post(BaseUrl + '/getempdashStats', {}, config);
      setEmpDashStats(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };


  useEffect(() => {
    fetchData();
    fetchData2();
  }, [])


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
          <li className="breadcrumb-item"><a href="/" >Home</a></li>

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
                <i class="fa fa-user fa-4x" aria-hidden="true"></i>
              </div>
              <h2>{empStats.name}</h2>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body bg-warning">
              <div className="rotate">
                <i class="fa fa-check-circle fa-4x"></i>
              </div>
              <h3>Performance Score : {((Number(empDashStats.present_count) / 21) * 100).toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-info h-100">
            <div className="card-body bg-info">
              <div className="rotate">
                <i class="fa fa-check-circle fa-4x"></i>
              </div>
              <h3>Salary/month : {Number(empStats.salary)}</h3>
            </div>
          </div>
        </div>  
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-success h-100">
            <div className="card-body bg-success">
              <div className="rotate">
                <i className="fa fa-check-circle fa-4x"></i>              </div>
              <h3>This Month Presents : {empDashStats.present_count}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-times-circle fa-4x"></i>
              </div>
              <h3>This Month Absents : {empDashStats.absent_count}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-secondary h-100">
            <div className="card-body bg-secondary">
              <div className="rotate">
                <i class="fa fa-times-circle fa-4x"></i>
              </div>
              <h3>This Month Leaves : {empDashStats.leave_count}</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
