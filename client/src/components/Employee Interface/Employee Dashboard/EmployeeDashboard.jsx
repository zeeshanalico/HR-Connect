import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from 'react';
import { BaseUrl } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../UIModules/Toast/Toast';


export default function EmployeeDashboard() {
  const [empStats, setEmpStats] = useState({})
  const navigate = useNavigate();
  const fetchData = async (config) => {
    try {
      const response = await axios.post(BaseUrl + '/getEmpInfobyEmpId', config);
      // console.log(response.data);
      setEmpStats(response.data);
    } catch (error) {
      console.log(error);
      Toast("Cache Error", 'error')
      console.log("Error : ", error);
    }
  };


  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log('JWT Token:', jwtToken); // Log the token
    const config = {
      headers: { authorization: `Bearer ${jwtToken}` },
      withCredentials: true
    };
    fetchData(config);
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
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i class="fa fa-users fa-4x" aria-hidden="true"></i>
              </div>
              {/* <h4 className="text-uppercase">Role</h4> */}
              <h3>{empStats.job_name}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 py-2">
          <div className="card text-white bg-success h-100">
            <div className="card-body bg-success">
              <div className="rotate">
                <i className="fa-4x fa fa-credit-card-alt"></i>
              </div>
              <h4 className="text-uppercase">Salary</h4>
              <h3>{empStats.salary}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* You can add more cards for additional information */}
    </div>
  );
}
