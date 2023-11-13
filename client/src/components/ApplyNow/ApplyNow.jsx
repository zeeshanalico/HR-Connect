
import styles from './ApplyNow.module.css';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './ApplyNow.css'; // Import your CSS file
import axios from 'axios'
import './ApplyNow.css';
import hrconnect from "../../assets/img/HR_Connect.jpg.jpg";
import { BaseUrl } from './../../constants.js';
import Toast from '../../UIModules/Toast/Toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { initialValues, validationSchema } from './ApplyNowFormSchema';
const qualificationOptions = [
  // "Intermediate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctor of Philosophy",
];
export default function ApplyNow() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobTitle = searchParams.get('job_title');
  const jobId = searchParams.get('job_id');
  const depId = searchParams.get('dep_id');
  const inputExp = searchParams.get('experience');
  console.log(inputExp);
  const jobTitleFromState = location.state && location.state.job_title;
  const navigate = useNavigate();
  const [degrees, setDegrees] = useState([]);
  const [getExperience, setExperience] = useState([]);


  const fetchData = async () => {
    const response = await axios.get(BaseUrl + `/getDegreesById/${depId}`)
    console.log(response.data);
    setDegrees(response.data)

  }

  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getExperience');
      console.log(response.data);
      setExperience(response.data);
    } catch (error) {
      console.error('Error fetching Experience:', error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchData1();
  }, [])
  const [expLimit, setExpLimit] = useState(false)

  const expChange = (e) => {
    console.log(e.target.value.trim());
    console.log(inputExp.trim());
    setExpLimit(Number(e.target.value?.[0]) < Number(inputExp?.[0]));
  }


  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const response = await axios.post(BaseUrl + '/submitJobApplication', values, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      if (response.data.success) {
        Toast(`${response.data.message}`)
        resetForm();
        navigate('/applypage');
      } else {
        Toast(`${response.data.message}`)
      }
    } catch (error) {
      Toast('Error submitting job application:', error)
      console.error('Error submitting job application:', error);
    }

  }

  return (
    <div className='outerbox'>
      <RouterLink to="/applyPage">
        <i id="back-arrow" style={{ position: 'absolute', top: '35px', left: '40px', }} className="fa fa-arrow-left" aria-hidden="true" />
      </RouterLink>
      
      <Formik
        initialValues={{ ...initialValues, job_id: jobId, dep_id: depId, job_title: jobTitle, cv_file: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}    >
        {({ errors, touched, values, setFieldValue }) => (
          <Form /*className={styles.form}*/ className="apply-form" method="post" enctype="multipart/form-data">
            <div style={{color:'black', textAlign:'center'}}><img src={hrconnect} alt="logo" height={80} width={80} className="font20 mb-4 extraBold" /></div>
            <div className="apply-box">
            <div className="info-box">
            <h3 style={{color:'black', textAlign:'center', marginBottom:'-1px'}}>Personal Information</h3>
            <hr style={{ backgroundColor: 'rgb(31, 185, 219)', height: '2px', border: 'none', width: '100%' }} />
            <label htmlFor="applicant_name">Full Name</label>
            <Field
              id='applicant_name'
              name="applicant_name"
              // className={styles.fieldGroup}
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              placeholder="Enter your Full Name"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="applicant_name" component="span" className="error-message" />


            <label htmlFor="applicant_name">Email Address</label>
            <Field name="email" style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              placeholder="Enter your Email Address" />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="email" component="span" className="error-message" />

            <label htmlFor="phone_number">Phone Number</label>
            <Field style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              name="phone_number" type="number" placeholder="Enter your Phone Number"/>
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="phone_number" component="span" className={styles.error} />
            <label htmlFor="cnic">CNIC</label>
            <Field
              id='cnic'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              name="cnic"
              placeholder="XXXXX-XXXXXXX-X"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="cnic" component="span" className="error-message" />

            <label htmlFor="address">Address</label>
            <Field
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              id='address'
              name="address"
              placeholder="Enter your Full Address"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="address" component="span" className="error-message" />


            <label htmlFor="city">City</label>
            <Field
              id='city'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              name="city"
              placeholder="Enter your City Name"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="city" component="span" className="error-message" />           
            <label htmlFor="dob">Date-of-Birth</label>
            <Field
              id='dob'
              type='date'
              name="dob"
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}

            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="dob" component="span" className="error-message" />

            <div className={styles.radioGroup} style={{ marginTop: '10px' }} role="group" aria-labelledby="gender">
            <label>Gender</label>
              <label>
                <Field type="radio" id="male" name="gender" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" id="female" name="gender" value="Female" />
                Female
              </label>
            </div>
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="gender" component="span" className="error-message" />

            </div>
            <div className="info-box">
            <h3 style={{color:'black', textAlign:'center', marginBottom:'-1px'}}>Professional Information</h3>
            <hr style={{ backgroundColor: 'rgb(31, 185, 219)', height: '2px', border: 'none', width: '100%' }} />

            <label htmlFor="experience" >Experience</label>
            <Field as="select" id="experience" name="experience" style={{ borderRadius: '5px', padding: '2px', border: '1px solid grey',height: '40px' }}
              onChange={(e) => {
                setFieldValue('experience', e.target.value);
                expChange(e);

              }}
              value={values.experience}
            >
              <option value="" style={{ display: 'none' }} label="Select Experience" />
              {getExperience.map((option) => (
                <option key={option.experience} value={option.experience}>
                  {option.experience}
                </option>
              ))}
            </Field>
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="experience" component="span" className="error-message" />
            {expLimit && <div style={{ color: 'red' }}>Sorry! You are not eligible for this job based on your selected experience</div>}
           
           
            <label htmlFor="zipcode">Zip-Code</label>
            <Field
              id='zipcode'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              name="zipcode"
              placeholder="Enter your Zip Code"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="zipcode" component="span" className="error-message" />

            <label htmlFor="zipcode">Applying For</label>
            <Field
              style={{ color: 'black', borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              id='job_id'
              disabled
              name="job_title"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="job_title" component="span" className="error-message" />
           
            <label htmlFor="desired_salary">Desired Salary</label>
            <Field
              id='desired_salary'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}

              name="desired_salary"
              placeholder="Enter your Desired Salary"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="desired_salary" component="span" className="error-message" />

            <label htmlFor="github_profile_url">Github Link</label>
            <Field
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              id='github_profile_url'
              name="github_profile_url"
              placeholder="Paste your GitHub Profile Link"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="github_profile_url" component="span" className="error-message" />

            <label htmlFor="linkedin_profile_url">LinkedIn Link</label>
            <Field
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              id='linkedin_profile_url'
              name="linkedin_profile_url"
              placeholder="Paste your LinkedIn Profile Link"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="linkedin_profile_url" component="span" className="error-message" />
            

            </div>
            <div className="info-box">
            <h3 style={{color:'black', textAlign:'center', marginBottom:'-1px'}}>Educational Information</h3>
            <hr style={{backgroundColor: 'rgb(31, 185, 219)', height: '2px', border: 'none', width: '100%' }} />
            <label htmlFor="qualification" >Latest Qualification</label>
            <Field as="select" id="qualification" name="qualification" style={{ borderRadius: '5px', padding: '2px', border: '1px solid grey', outline: 'none', height: '40px' }}
              onChange={(e) => setFieldValue('qualification', e.target.value)}
              value={values.qualification}
            >
              <option value="" style={{ display: 'none' }} label="Select Qualification" />
              {qualificationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="qualification" component="span" className="error-message" />

            <label htmlFor="degree">Degree</label>
            <Field
              as="select"
              id="degree"
              name="degree"
              style={{ borderRadius: '5px', padding: '2px', border: '1px solid grey', outline: 'none', height: '40px' }}
              onChange={(e) => setFieldValue('degree', e.target.value)}
              value={values.degree}
            >
              <option value="" style={{ display: 'none' }} label="Select Degree" />
              {degrees ? (
                degrees.map((option) => (
                  <option key={option.deg_id} value={option.degree}>
                    {option.degree}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading degrees...</option>
              )}
            </Field>
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="degree" component="span" className="error-message" />

            {/* <label htmlFor="degree">Degree</label>
            <Field
              id='degree'
              name="degree"
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none' }}
              placeholder="Degree"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="degree" component="span" className="error-message" /> */}

            {/* <label htmlFor="major">Major</label>
            <Field
              id='major'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none' }}
              name="major"
              placeholder="Major e.g. CS,SE,IT,AI "
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="major" component="span" className="error-message" /> */}

<label htmlFor="cgpa">CGPA</label>
            <Field
              id='cgpa'
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}

              name="cgpa"
              placeholder="Enter your CGPA"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="cgpa" component="span" className="error-message" />

            <label htmlFor="university">University</label>
            <Field
              style={{ borderRadius: '5px', padding: '10px', border: '1px solid grey', outline: 'none', height: '40px' }}
              id='university'
              name="university"
              placeholder="Enter you Univery Name"
            />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="university" component="span" className="error-message" />
            
            <label htmlFor="cv_file">Upload Resume</label>
            <input id="file" style={{color: 'black'}} name="cv_file" type="file" accept=".pdf" onChange={(event) => {
              setFieldValue("cv_file", event.target.files[0]);
            }} />
            <ErrorMessage style={{ color: 'red', fontSize: '13px' }} name="cv_file" component="div" className="error-message" />
            </div>
            </div>
            <button className={styles.submitButton} style={{ alignSelf:'center', width:'250px', marginBottom: '12px'}} type="submit">Submit</button>

          </Form>
        )}
      </Formik>
    </div>
  ); 
}
