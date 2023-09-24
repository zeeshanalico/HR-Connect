import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useHref } from 'react-router-dom';
import './ApplyNow.css'; // Import your CSS file
import '../BasicStyle.css';
import axios from 'axios'
import './ApplyNow.css';
import { BaseUrl } from './../../constants.js';
import Toast from '../../UIModules/Toast/Toast';
import Filter from '../../UIModules/Filter';
import { useLocation, useNavigate } from 'react-router-dom';


export default function ApplyNow() {
  // const location = useLocation();
  // const jobTitle = location.state?.jobTitle;

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const jobTitle = searchParams.get('job_title');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobTitle = searchParams.get('job_title');
  const jobId = searchParams.get('job_id');
  const jobTitleFromState = location.state && location.state.job_title;
  console.log(jobTitle, jobId);

  // const [alljobs, setAllJobs] = useState([]);//get
  const [userDetails, setUserDetails] = useState({})
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(BaseUrl + '/getJobs');
  //     setAllJobs(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data jobs:', error);
  //     throw error;
  //   }
  // };

  // useEffect(() => {
  //   fetchData()
  // }, [])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // console.log(name,value);
    if (type === 'file') {
      setUserDetails((prevState) => {
        return { ...prevState, [name]: files[0], job_id: jobId };
      });
    } else {
      setUserDetails((prevState) => {
        return { ...prevState, [name]: value, job_id: jobId };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userDetails);
    if (Object.keys(userDetails).length >= 17) {

      try {
        const response = await axios.post(BaseUrl + '/submitJobApplication', userDetails, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log(response.data);
        if (response.data.success) {
          Toast(`${response.data.message}`)
          setUserDetails({});
          navigate('/applypage');
        } else {
          Toast(`${response.data.message}`)
        }
      } catch (error) {
        Toast('Error submitting job application:', error)
        console.error('Error submitting job application:', error);
        throw error;
      }
    } else {
      Toast('Please fill all the inputs', 'info');
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
                value={userDetails?.applicant_name}
                placeholder='Full Name'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Email:</label>
              <input
                className="form-control round"
                type="email"
                name='email'
                value={userDetails?.email}
                placeholder='Your Email'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Phone no:</label>
              <input
                className="form-control round"
                type="tel"
                name='phone_number'
                value={userDetails?.phone_number}
                placeholder='Your Phone#'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>CNIC:(without dashes)</label>
              <input
                className="form-control round"
                type="number"
                name='cnic'
                value={userDetails?.cnic}
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>City:</label>
              <input
                className="form-control round"
                type="text"
                name='city'
                value={userDetails?.city}
                placeholder='Your City'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>GitHub Profile URL:</label>
              <input
                className="form-control round"
                type="text"
                name='github_profile_url'
                value={userDetails?.github_profile_url}
                placeholder='URL'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>LinkedIn Profile URL:</label>
              <input
                className="form-control round"
                type="text"
                name='linkedin_profile_url'
                value={userDetails?.linkedin_profile_url}
                placeholder='URL'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Work Experience:</label>
              <select
                name='experience'
                value={userDetails.experience}
                className="form-control round"
                onChange={handleChange}
                style={{ height: "42px" }}
              >
                <option >--select--</option>
                <option value={'0 - 6 months'}>0 - 6 months</option>
                <option value={'less than 1 year'}>less than 1 year</option>
                <option value={'2 years'}>2 years</option>
                <option value={'3-5 years'}>3-5 years</option>
                <option value={'more than 5 years'}>more than 5 years</option>
              </select>
            </div>
            <div className="form-group rounded-input">
              <label>CGPA:</label>
              <input
                className="form-control round"
                type="number"
                name='cgpa'
                value={userDetails?.cgpa}
                placeholder='CGPA'
                onChange={handleChange}
              />
            </div>
            <div id="gender-input">
              <p>Gender:</p>
              <input type="radio" id="male" name="gender" value="Male" checked={userDetails.gender === "Male"} onChange={handleChange} />
              <label for="male">Male</label>
              <input type="radio" id="female" name="gender" value='Female' checked={userDetails.gender === "Female"} onChange={handleChange} />
              <label for="female">Female</label>
            </div>

          </div>
          <div className="second-half">
            <div className="form-group rounded-input">
              <label>Address:</label>
              <textarea
                style={{ height: '125px' }}
                className="form-control round"
                name='address'
                value={userDetails?.address}
                placeholder='Your Address'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Zip-Code</label>
              <input
                className="form-control round"
                name='zipcode'
                value={userDetails?.zipcode}
                placeholder='Your zipcode'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Select Job:</label>
              <input
                className="form-control round"
                type="text"
                name='job_id'
                value={jobTitle}
                placeholder='Desired Salary'
                onChange={handleChange}
              />
              <label>University:</label>
              <input
                className="form-control round"
                type="text"
                name='university'
                value={userDetails?.university}
                placeholder='University'
                onChange={handleChange}
              />
              <label>Degree:</label>
              <input
                className="form-control round"
                type="text"
                name='degree'
                value={userDetails?.degree}
                placeholder='Degree'
                onChange={handleChange}
              />
              <label>Major:</label>
              <input
                className="form-control round"
                type="text"
                name='major'
                value={userDetails?.major}
                placeholder='major'
                onChange={handleChange}
              />
              {/* <select name="job_id" className="form-control round" onChange={handleChange}>
                <option value={null} >--select--</option>
                {alljobs.map((job) => (
                  <option key={job.job_id} value={job.job_id}>
                    {job.title}
                  </option>
                ))}
              </select> */}
            </div>
            <div className="form-group rounded-input">
              <label>Desired Salary(PKR):</label>
              <input
                className="form-control round"
                type="number"
                name='desired_salary'
                value={userDetails?.desired_salary}
                placeholder='Desired Salary'
                onChange={handleChange}
              />
            </div>
            <div className="form-group rounded-input">
              <label>Date of Birth:</label>
              <input
                className="form-control round"
                type="date"
                name='dob'
                value={userDetails?.dob}
                onChange={handleChange}
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
              />
            </div>
            <button className="submit-button btn btn-primary mt-2 mb-2 p-2" type="submit">Apply</button>
          </div>
        </div>
      </form>
    </div>
  );
}
