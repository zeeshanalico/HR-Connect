import React from 'react';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './MainContent.css';
import axios from 'axios';
import { BaseUrl, end_time } from '../../constants';
import Toast from '../../UIModules/Toast/Toast'; 

export default function MainContent() {

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDashboardData');

      const {  
        no_of_absent_employees,
        no_of_employees,
        no_of_leave_employees,
        no_of_present_employees
      } = response.data[0]

      setStat({
        absent: no_of_absent_employees ,
        present: no_of_present_employees,
        leave: no_of_leave_employees ,
        total: no_of_employees,
      })

      console.log(stat);

    } catch (error) {
      console.log(error);
      Toast("Data not received")
    }  
  }    

  const markAbsent = async () => {
    const response = await axios.post(BaseUrl+'/markAbsent')
    console.log(response);
    if (!response.data.success) {
      Toast("Absent Marked", "success")
      // window.location.reload()
    }
  }

  // time related info
  const [currentTime, setCurrentTime] = useState();
  const handleTimeChanges = () => {
    setCurrentTime(() => {
      const currentTime = new Date(); 

      const hour = currentTime.getHours();
      const minute = currentTime.getMinutes();
      const second = currentTime.getSeconds();

      return `${hour}:${minute}:${second}`;
    });
  };

  useEffect(() => {
    // fetchData();

    // Time
    const intervalId = setInterval(() => {
      handleTimeChanges();
    }, 1000);

    // Clean up
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // dashboard data

  const [record, setRecord] = useState()

  const [stat, setStat] = useState({
    absent: "",
    present: "",
    leave: "",
    total: ""
  })

  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(res => setRecord(res))
  }

  useEffect(() => {
    // fetching data from backend

    const time = new Date()
    
    console.log("Current : "+record);
    console.log("End : "+end_time)

    // Getting current time when Dashboard Render
    if (`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}` >= end_time) {
      markAbsent()
    }

    fetchData()
  }, [])


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

  <p>{currentTime}</p>

      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-xl-3 col-sm-6 py-2">
            <div className="card bg-primary text-white h-100">
              <div className="card-body bg-primary" style={{ backgroundColor: "#428bca" }}>
                <div className="rotate">
                  <i className="fa fa-users fa-4x"></i>
                </div>
                <h6 className="text-uppercase">Total Employees</h6>
                <h1 className="display-4">{stat.total}</h1>
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
                <h1 className="display-4">{stat.present}</h1>
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
                <h1 className="display-4">{stat.absent}</h1>
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
                <h1 className="display-4">{stat.leave}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

