import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './ApplyNow.css'; // Import your CSS file
import '../BasicStyle.css';
import axios from 'axios'
import './ApplyNow.css';
import { BaseUrl } from './../../constants.js';

export default function ApplyNow() {
  const [alljobs, setAllJobs] = useState([]);//get
  const [userDetails, setUserDetails] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobs');
      setAllJobs(response.data);
    } catch (error) {
      console.error('Error fetching data jobs:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUserDetails((prevState) => {
        return { ...prevState, [name]: files[0] };
      });
    } else {
      setUserDetails((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(BaseUrl + '/submitJobApplication',userDetails,{headers: {
        'Content-Type': 'multipart/form-data',
      }});
      console.log(response.data);
      if(response.data.success){
        console.log('application submit successfull');
      }else{
        console.log('an error occured');
      }
      console.log(userDetails);
    } catch (error) {
      console.error('Error submitting job application:', error);
      throw error;
    }
  }
  return (
    <div>
      <RouterLink to="/applyPage">
        <i id="back-arrow" style={{ position: 'absolute', top: '35px', left: '40px', }} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      <form id="full-content" className="apply-form" onSubmit={handleSubmit}>
        <h2 className='mb-4'>Apply Now</h2>
        <div className="content" id="content">
          <div className="first-half">
            <div className="form-group rounded-input">
              <label>Full Name:</label>
              <input
                className="form-control round"
                type="text"
                name='applicant_name'
                value={userDetails.applicant_name || ""}
                placeholder='Full Name'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>Email:</label>
              <input
                className="form-control round"
                type="email"
                name='email'
                value={userDetails.email || ""}
                placeholder='Your Email'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>Phone no:</label>
              <input
                className="form-control round"
                type="tel"
                name='phone_number'
                value={userDetails.phone_number || ""}
                placeholder='Your Phone#'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>CNIC:</label>
              <input
                className="form-control round"
                type="text"
                name='cnic'
                value={userDetails.cnic || ""}
                placeholder='xxxxx-xxxxxxx-x'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>City:</label>
              <input
                className="form-control round"
                type="text"
                name='city'
                value={userDetails.city || ""}
                placeholder='Your City'
                onChange={handleChange}
                required
              />
            </div>

          </div>
          <div className="second-half">
            <div className="form-group rounded-input">
              <label>Address:</label>
              <textarea
                className="form-control round"
                name='address'
                value={userDetails.address || ''}
                placeholder='Your Address'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>Select Job:</label>
              <select name="job_id" className="form-control round" onChange={handleChange}>
                {alljobs.map((job) => (
                  <option key={job.job_id} value={job.job_id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group rounded-input">
              <label>Desired Salary:</label>
              <input
                className="form-control round"
                type="text"
                name='desired_salary'
                value={userDetails.desired_salary || ""}
                placeholder='Desired Salary'
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group rounded-input">
              <label>Upload Resume/CV:</label>
              <input
                className="form-control round"
                name='cv_file'
                type="file"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                // required
              />
            </div>
            <button className="submit-button btn btn-primary mt-2 mb-2 p-2" type="submit">Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
}
