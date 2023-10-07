import React from 'react';
import Loader from '../../../Loader/Loader.jsx';
import { useState, useEffect } from 'react';
import { BaseUrl } from './../../../../constants.js'
import { useNavigate } from 'react-router-dom';
import '../../BasicStyle.css';
import './EmployeeInfo.css';
import axios from 'axios'
import Navbar from '../../Navbar';
import Toast from '../../../../UIModules/Toast/Toast.jsx';
import { config } from './../../../../constants.js';
import * as Yup from 'yup';
const qualificationOptions = [
  // "Intermediate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctor of Philosophy",
];

const validationSchema = Yup.object().shape({
  // Newly added fields
  applicant_name: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'In Name Only alphabets are allowed')
    .required('Full Name is required'),
  address: Yup.string()
    .matches(/[a-zA-Z]/, 'Address must contain alphabetic characters')
    .required('Address is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  zipcode: Yup.string()
    .required("Zipcode is required")
    .matches(/^\d{5}$/, "Zip must be 5 digits"),
  phone_number: Yup.string()
    .matches(/^[0-9]{10,11}$/, 'Phone number must be 11 or 12 digits')
    .required('Phone number is required'),
  dob: Yup.date()
    .max(new Date(), 'Date of Birth cannot be in the future')
    .required('Date of Birth is required'),
  city: Yup.string().required('City is required'),
  cnic: Yup.string().min(0, 'CNIC cannot be negative')
    // .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC Format\n : XXXXX-XXXXXXX-X')
    .required('CNIC is required'),
  gender: Yup.string().required('Gender is required'),
  emp_id: Yup.string()
    // .required('Employee ID is required'),
    .matches(/^[0-9]{1,10}$/, 'Employee ID must be 1 to 10 digits'),
  role_id: Yup.string().required('Role  is required'),
  job_id: Yup.number()
    .integer('Employee Job title must be an integer')
    .positive('Employee Job title must be a positive number')
    .required('Employee Job title is required'),
  university: Yup.string()
    .matches(/^[A-Za-z\s]{1,50}$/, 'University can only contain alphabets and have a max length of 50 characters')
    .required('University is required'),
  dep_id: Yup.string().required('Department is required'),
  degree: Yup.string()
    .required('Degree is required'),
  salary: Yup.string()
    .matches(/^[0-9]+$/, 'Salary can only contain digits')
    .required('Salary is required')
    .min(0, 'Desired Salary cannot be negative')
    .required('Desired Salary is required'),
  qualification: Yup.string().required('Qualification is required'),
  cgpa: Yup.number()
    .typeError('CGPA must be a number')
    .min(0, 'CGPA cannot be negative')
    .max(4, 'CGPA cannot be greater than 4')
    .test('is-four-digits', 'CGPA must have maximun 4 digits e.g. 2.34', (value) => {
      if (value === undefined || value === null) {
        return true;
      }
      const cgpaString = value.toString();
      return cgpaString.length <= 4;
    })
    .required('CGPA is required'),
  linkedin_profile_url: Yup.string()
    .matches(/(linkedin\.com)/, 'Invalid LinkedIn URL format, it must contain ".com"')
    .url('Invalid LinkedIn URL format'),
  hire_date: Yup.date()
    .min(new Date(), 'Hire date must be tomorrow or in the future')
    .required('Hire date is required'),
  github_profile_url: Yup.string()
    .matches(/(github\.com)/, 'Invalid GitHub URL format, it must contain ".com"')
    .url('Invalid GitHub URL format')
});

export default function EmployeeInfo({ id }) {
  console.log(id);
  const [employeeInformation, setEmployeeInformation] = useState({
    address: "",
    applicant_name: "",
    cgpa: '',
    city: '',
    cnic: '',
    degree: "",
    dep_id: '',
    dob: '',
    email: '',
    emp_id: '',
    gender: '',
    github_profile_url: '',
    hire_date: '',
    job_id: "",
    linkedin_profile_url: "",
    qualification: '',
    phone_number: '',
    role_id: "",
    salary: "",
    university: "",
    zipcode: "",
  });//post
  const [jobPositions, setJobPositions] = useState([]);//get
  const [dep, setDep] = useState([]);//get
  const [roles, setRoles] = useState([]);//get
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Add a loading state
  const [degrees, setDegrees] = useState([]);



  const fetchData = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getJobPositions', config);
      setJobPositions(response.data);
    } catch (error) {
      console.error('Error fetching data jobpositons:', error);
    }
  };
  const fetchData1 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getDepartment');
      setDep(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get(BaseUrl + '/getRoles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles :', error);
    }
  };
  const fetchEmpData = async () => {
    if (id) {
      try {
        const response = await axios.get(BaseUrl + `/getApplicant/${id}`, config)
        console.log(response.data[0]);
        console.log(response.data);
        setEmployeeInformation(response.data[0])
      }
      catch (error) {
        Toast("Employee Information not loaded", 'error')
      }
    }
  }

  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData2();
    fetchEmpData()
  }, [])



  const handleChange = async (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === 'dep_id') {
      const response = await axios.get(BaseUrl + `/getDegreesById/${value}`)
      console.log(response.data);
      setDegrees(response.data)
      setEmployeeInformation((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
    setEmployeeInformation((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(employeeInformation);
    setLoading(true);
    try {
      let postData = {
        ...employeeInformation,
        cnic: parseInt(employeeInformation.cnic.replace(/-/g, ''), 10),
      };
      await validationSchema.validate(postData, { abortEarly: false });
      if (id) {
        console.log(postData, id);
        const response = await axios.post(BaseUrl + '/registerEmployee', { ...postData, emp_id: id, }, config);
        if (response.data.success) {
          Toast("Employee Registered Successfully!", 'info');
          navigate('/hrdash/manageEmployee');
        } else {
          Toast(`${response.data.message}`, 'error');
        }
      } else {
        const response = await axios.post(BaseUrl + '/registerEmployee', postData, config);
        if (response.data.success) {
          Toast("Employee Registered Successfully!", 'info');
          navigate('/hrdash/manageEmployee');
        } else {
          Toast(`${response.data.message}`, 'error');
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        // const validationErrors = {};
        // error.inner.forEach((e) => {
        //   validationErrors[e.path] = e.message;
        //   Toast(`${e.message}`, 'error');
        // });
        // console.log(validationErrors);
        const firstValidationError = error.inner[0];
        Toast(`${firstValidationError.message}`, 'error');
        console.log(firstValidationError);
      } else {
        Toast("Error in registration: check console for further Details", 'error');
        console.error('Error in submission:', error);
      }
      setLoading(false);
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(employeeInformation);
    
  //     let postData = {
  //       ...employeeInformation,
  //       cnic: parseInt(employeeInformation.cnic.replace(/-/g, ''), 10),
  //     };
     
  //     console.log(postData);
  // };

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
                    name="applicant_name"
                    value={employeeInformation?.applicant_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control round"
                    id="email"
                    name="email"
                    value={employeeInformation?.email}
                    onChange={handleChange}

                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <input
                    type="number"
                    className="form-control round"
                    id="phoneNumber"
                    name='phone_number'
                    value={employeeInformation?.phone_number}
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
                    value={employeeInformation?.city}
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
                    value={employeeInformation?.address}
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
                    value={employeeInformation?.zipcode}
                    onChange={handleChange}

                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="DateofBirth" className="form-label">Date of Birth:</label>
                  <input
                    type={(!employeeInformation?.dob || employeeInformation?.dob.trim() === '' || employeeInformation?.dob == null) ? 'date' : 'text'}
                    className="form-control round"
                    id="DateofBirth"
                    name='dob'
                    value={employeeInformation?.dob?.toString()?.slice(0, 10)}
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
                    value={employeeInformation?.cnic}
                    onChange={handleChange}

                  />
                </div>
                <div id="gender-input">
                  <p>Gender:</p>
                  <input type="radio" id="male" name="gender" value="Male" checked={employeeInformation?.gender === "Male"} onChange={handleChange} />
                  <label for="male">Male</label>
                  <input type="radio" id="female" name="gender" value='Female' checked={employeeInformation?.gender === "Female"} onChange={handleChange} />
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
                  <label htmlFor="EmployeeID" required className="form-label">Employee ID:</label>
                  <input
                    type="number"
                    className="form-control round"
                    id="EmployeeID"
                    name='emp_id'
                    value={id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 rounded-input">

                  <label htmlFor="DepartmentName" required className="form-label">Department Name:</label>
                  <select name="dep_id" className="form-control round" value={employeeInformation?.dep_id} onChange={handleChange} >
                    <option style={{ display: 'none' }} label="Select Department" />
                    {dep.map((dep) => (
                      <option key={dep.dep_id} value={dep.dep_id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </div>
                {id ? (<div className="mb-3 rounded-input">
                <label htmlFor="degree" required className="form-label">Degree:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="degree"
                    name='degree'
                    value={employeeInformation?.degree}
                    // onChange={handleChange}
                  />
                </div>) : (<div className="mb-3 rounded-input">
                  <label htmlFor="degree" required className="form-label">Degree:</label>
                  <select name="degree" className="form-control round" value={employeeInformation?.degree} onChange={handleChange}  >
                    <option style={{ display: 'none' }} label="Select Degree" />
                    {degrees?.map((option) => (
                      <option key={option.deg_id} value={option.deg_id}>
                        {option.degree}
                      </option>))
                    }
                  </select>
                </div>)}
                <div className="mb-3 rounded-input">
                  <label htmlFor="job_id" required className="form-label">Job Positions:</label>
                  <select name="job_id" className="form-control round" value={employeeInformation?.job_id} onChange={handleChange}  >
                    <option value="" style={{ display: 'none' }} label="Select Job" />
                    {jobPositions.map((option) => (
                      <option key={option.job_id} value={option.job_id}>
                        {option.job_name}

                      </option>))
                    }
                  </select>
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="Salary" required className="form-label">Salary(PKR):</label>
                  <input
                    type="number"
                    className="form-control round"
                    id="Salary"
                    name='salary'
                    value={employeeInformation?.salary}
                    onChange={handleChange}

                  />
                </div>

                <div className="mb-3 rounded-input">
                  <label htmlFor="HireDate" required className="form-label">Hire Date:</label>
                  <input
                    type={(!employeeInformation?.hire_date || employeeInformation?.hire_date.trim() === '' || employeeInformation?.hire_date == null) ? 'date' : 'text'}
                    className="form-control round"
                    id="HireDate"
                    name='hire_date'
                    value={employeeInformation?.hire_date}
                    onChange={handleChange}

                  />
                </div>
              </div>

            </div>

            <div id="second-half"><div className="mb-3 rounded-input">
              <label htmlFor="emprole" className="form-label">Employee Role:</label>
              <select name="role_id" className="form-control round" required value={employeeInformation?.role_id} onChange={handleChange}>
                <option value="">--select</option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="emp_role" required className="form-label">Qualification:</label>
                <select name="qualification" className="form-control round" value={employeeInformation?.qualification} onChange={handleChange}  >
                  <option style={{ display: 'none' }}>Qualification</option>
                  {qualificationOptions.map((job) => (
                    <option key={job} value={job}>
                      {job}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="uni" className="form-label">University</label>
                <input
                  type="text"
                  className="form-control round"
                  id="university"
                  name='university'
                  value={employeeInformation?.university}
                  onChange={handleChange}

                />
              </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="cgpa" className="form-label">CGPA:</label>
                <input
                  type="text"
                  className="form-control round"
                  id="cgpa"
                  name='cgpa'
                  value={employeeInformation?.cgpa}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="Salary" className="form-label">LinkedIn Profile URL:</label>
                <input
                  type="text"
                  className="form-control round"
                  id="linkedin_profile_url"
                  name='linkedin_profile_url'
                  value={employeeInformation?.linkedin_profile_url}
                  onChange={handleChange}

                />
              </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="Salary" className="form-label">GitHub Profile URL:</label>
                <input
                  type="text"
                  className="form-control round"
                  id="github_profile_url"
                  name='github_profile_url'
                  value={employeeInformation?.github_profile_url}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button type="submit" className="btn btn-primary mt-4 mb-4 p-3">Add Employee</button>
          )}
        </div>
      </form>
    </div>

  )
}