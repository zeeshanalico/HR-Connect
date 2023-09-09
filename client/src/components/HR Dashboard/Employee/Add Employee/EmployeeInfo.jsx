import React from 'react';
import { useState, useEffect } from 'react';
import { BaseUrl } from './../../../../constants.js'
import '../../BasicStyle.css';
import './EmployeeInfo.css';
import axios from 'axios'
import Navbar from '../../Navbar';
import ApplyNow from '../../../ApplyNow/ApplyNow';
import Toast from '../../../../UIModules/Toast/Toast.jsx';

export default function EmployeeInfo() {
  const [employeeInformation, setEmployeeInformation] = useState({job_id:null,dep_id:null});//post
  const [jobPositions, setJobPositions] = useState([]);//get
  const [dep, setDep] = useState([]);//get

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobPositions');
      setJobPositions(response.data);
    } catch (error) {
      console.error('Error fetching data jobpositons:', error);
      throw error;
    }
  };
  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      console.error('Error fetching deps in empinfo:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
    fetchData1();
  }, [])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInformation((prevState) => {
      return { ...prevState, [name]: value };
    });
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(employeeInformation);
    if (Object.keys(employeeInformation).length !== 17) {
      Toast("Please fill out all fields.", 'error');
      return; 
    }
    const hasEmptyAttributes = Object.values(employeeInformation).some((value) => value === null || value.trim() === '');
    if (hasEmptyAttributes) {
      Toast("Please fill out all fields before submitting.", 'error');
      return;
    }

    try {
      const response = await axios.post(BaseUrl + '/registerEmployee', employeeInformation);
      if (response.data.success) {
        Toast("Employee Registered Succesfully!", 'info');
      } else {
        Toast(`success:${response.data.success} /n An error occured in Employee Registration`, 'error');
      }
    } catch (error) {
      Toast("Error in submission:check console for furthrer Details ", 'error');
      console.error('Error in submission:', error);
      throw error;
    }
  }

  return (
    <div className="col main pt-3 mt-3">
      <Navbar type="add employee" />
      <form onSubmit={handleSubmit}>
        <div id="full-content" className="main pt-3 mt-3">
          <div id="basic-information"></div>
          <h2 className="mb-4">Basic Information</h2>
          <div className="content" id="content">

            <div id="info-card">
              <div id="first-half">
                <div className="mb-3 rounded-input">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="name"
                    name="name"
                    value={employeeInformation.name}
                    onChange={handleChange}
                    

                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control round"
                    id="email"
                    name="email"
                    value={employeeInformation.email}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <input
                    type="tel"
                    className="form-control round"
                    id="phoneNumber"
                    name='phone_number'
                    value={employeeInformation.phone_number}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="city"
                    name="city"
                    value={employeeInformation.city}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>

              <div id="second-half">
                <div className="mb-3 rounded-input">
                  <label htmlFor="address" className="form-label">Address:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="address"
                    name="address"
                    value={employeeInformation.address}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="zipcode" className="form-label">Zipcode:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="zipcode"
                    name="zipcode"
                    value={employeeInformation.zipcode}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="DateofBirth" className="form-label">Date of Birth:</label>
                  <input
                    type="date"
                    className="form-control round"
                    id="DateofBirth"
                    name='DOB'
                    value={employeeInformation.DOB}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="CNIC" className="form-label">CNIC:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="CNIC"
                    placeholder="XXXXX-XXXXXXX-X"
                    name='cnic'
                    value={employeeInformation.cnic}
                    onChange={handleChange}
                    
                  />
                </div>
                <div id="gender-input">
                  <p>Gender:</p>
                  <input type="radio" id="male" name="gender" value="Male" checked={employeeInformation.gender === "Male"} onChange={handleChange} />
                  <label for="male">Male</label>
                  <input type="radio" id="female" name="gender" value='Female' checked={employeeInformation.gender === "Female"} onChange={handleChange} />
                  <label for="female">Female</label>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------------------------------------------------ */}
        <div id="full-content" className="main pt-3 mt-3">
          <div id="professional-information"></div>
          <h2 className="mb-4">Professional Information</h2>
          <div className="content mb-3" id="content">

            <div id="info-card">
              <div id="first-half">
                <div className="mb-3 rounded-input">
                  <label htmlFor="EmployeeID" className="form-label">Employee ID:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="EmployeeID"
                    name='emp_id'
                    value={employeeInformation.emp_id}
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="emp_role" className="form-label">Employee job:</label>
                  <select name="job_id" className="form-control round" value={employeeInformation.job_id} onChange={handleChange}  >
                    {jobPositions.map((job) => (
                      <option key={job.job_id} value={job.job_id}>
                        {job.job_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="DepartmentName" className="form-label">Department Name:</label>
                  <select name="dep_id" className="form-control round" value={employeeInformation.dep_id} onChange={handleChange} >
                    {dep.map((dep) => (
                      <option key={dep.dep_id} value={dep.dep_id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="Salary" className="form-label">Salary:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="Salary"
                    name='salary'
                    value={employeeInformation.salary}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>

              <div id="second-half">
                <div className="mb-3 rounded-input">
                  <label htmlFor="DepartmentName" className="form-label">Role: </label>
                  <select name="role" className="form-control round" onChange={handleChange} >
                    <option value={'HR'}>HR</option>
                    <option value={'Employee'}>Employee</option>
                  </select>
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="LoginEmail" className="form-label">Login Email:</label>
                  <input
                    type="email"
                    className="form-control round"
                    id="LoginEmail"
                    name='login_email'
                    value={employeeInformation.login_email}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="LoginPassword" className="form-label">Login Password:</label>
                  <input
                    type="password"
                    className="form-control round"
                    id="LoginPassword"
                    name='login_password'
                    value={employeeInformation.login_password}
                    onChange={handleChange}
                    
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="HireDate" className="form-label">Hire Date:</label>
                  <input
                    type="date"
                    className="form-control round"
                    id="HireDate"
                    name='hire_date'
                    value={employeeInformation.hire_date}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-4 mb-4 p-3">Add Employee</button>
        </div>

      </form>
    </div>

  )
}
{/*

 

<div className="mb-3 rounded-input">
<label htmlFor="loginEmail" className="form-label">Date of Birth:</label>
<input
  type="date"
  className="form-control round"
  id="loginEmail"
  value={loginEmail}
  onChange={handleLoginEmailChange}
  
/>
</div> 
 <div className="mb-3 rounded-input">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          className="form-control round"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          
        />
      </div>
*/}