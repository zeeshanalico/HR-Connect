import React from 'react';
import {useEffect,useState} from 'react';
import Navbar from './Navbar';
import './MainContent.css';

export default function MainContent() {

    const[record,setRecord] = useState([])
 
    const getData = () =>
    {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(res=>setRecord(res))
    }
  
    useEffect(() => {
       getData();
    },)

    const totalEmployees = 250;
    const todaysPresents = 180;
    const todaysAbsents = 20;
    const todaysLeave = 50;

  return (
    <div class="col main pt-3 mt-3" id="dashboard">
         
         <Navbar type={"dashboard"} />
        <p class="lead d-none d-sm-block mb-4"><h2>Dashboard</h2></p>
  
     { /*  <div class="alert alert-warning fade collapse" role="alert" id="myAlert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">×</span>
                <span class="sr-only">Close</span>
            </button>
            <strong>Data and Records</strong> Learn more about employee
  </div>  */}

    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card bg-primary text-white h-100">
            <div className="card-body bg-primary" style={{ backgroundColor: "#428bca" }}>
              <div className="rotate">
                <i className="fa fa-users fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Total Employees</h6>
              <h1 className="display-4">{totalEmployees}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-success h-100">
            <div className="card-body bg-success">
              <div className="rotate">
                <i className="fa fa-check-circle fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Today's Presents</h6>
              <h1 className="display-4">{todaysPresents}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-danger h-100">
            <div className="card-body bg-danger">
              <div className="rotate">
                <i className="fa fa-times-circle fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Today's Absents</h6>
              <h1 className="display-4">{todaysAbsents}</h1>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 py-2">
          <div className="card text-white bg-warning h-100">
            <div className="card-body bg-warning">
              <div className="rotate">
                <i className="fa fa-calendar-alt fa-4x"></i>
              </div>
              <h6 className="text-uppercase">Today's Leave</h6>
              <h1 className="display-4">{todaysLeave}</h1>
            </div>
          </div>
        </div>
      </div>
  </div>
 </div>

  )
}

