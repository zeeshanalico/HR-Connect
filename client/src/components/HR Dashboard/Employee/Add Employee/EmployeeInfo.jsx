import React from 'react';
import { useState } from 'react';
import '../../BasicStyle.css';
import './EmployeeInfo.css';
import Navbar from '../../Navbar';
import ApplyNow from '../../../ApplyNow/ApplyNow';

export default function EmployeeInfo() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value)
  };

  const handleCityChange = (e) => {
    setCity(e.target.value)
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value)
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const employeeData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      city: city,
      address: address,
      zipcode: zipcode,
      loginEmail: loginEmail,
      password: password,
    };

    // Perform your API call or data handling here

    // Reset the form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setCity('');
    setAddress('');
    setZipcode('');
    setLoginEmail('');
    setPassword('');
  };

  return (
    <div className="col main pt-3 mt-3">
<Navbar type="add employee"/>
<form onSubmit={handleSubmit}>
  <div id="full-content" className="main pt-3 mt-3">
    <div id="basic-information"></div>
    <h2 className="mb-4">Basic Information</h2>
    <div className="content" id="content">
   
      <div id="info-card">
    <div id="first-half">
      <div className="mb-3 rounded-input">
        <label htmlFor="firstName" className="form-label">First Name:</label>
        <input
          type="text"
          className="form-control round"
          id="firstName" 
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </div> 

      <div className="mb-3 rounded-input">
        <label htmlFor="lastName" className="form-label">Last Name:</label>
        <input
          type="text"
          className="form-control round"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          className="form-control round"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
        <input
          type="tel"
          className="form-control round"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="city" className="form-label">City:</label>
        <input
          type="text"
          className="form-control round"
          id="city"
          value={city}
          onChange={handleCityChange}
          required
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
          value={address}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="zipcode" className="form-label">Zipcode:</label>
        <input
          type="text"
          className="form-control round"
          id="zipcode"
          value={zipcode}
          onChange={handleZipcodeChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="DateofBirth" className="form-label">Date of Birth:</label>
        <input
          type="date"
          className="form-control round"
          id="DateofBirth"
          value={loginEmail}
          onChange={handleLoginEmailChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="CNIC" className="form-label">CNIC:</label>
        <input
          type="text"
          className="form-control round"
          id="CNIC"
          placeholder="XXXXX-XXXXXXX-X"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
     <div id="gender-input">
     <p>Gender:</p>
  <input type="radio" id="male" name="fav_language" value="Male" />
  <label for="male">Male</label>
  <input type="radio" id="female" name="fav_language" value="Female" />
  <label for="female">Female</label>
     </div>
     
      </div>
      </div>
  
    </div>
    </div>
    <div id="full-content" className="main pt-3 mt-3">
      <div id="professional-information"></div>
    <h2  className="mb-4">Professional Information</h2>
    <div className="content mb-3" id="content">
   
      <div id="info-card">
    <div id="first-half">
      <div className="mb-3 rounded-input">
        <label htmlFor="EmployeeID" className="form-label">Employee ID:</label>
        <input
          type="text"
          className="form-control round"
          id="EmployeeID" 
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </div> 

      <div className="mb-3 rounded-input">
        <label htmlFor="JobTitle" className="form-label">Job Title:</label>
        <input
          type="text"
          className="form-control round"
          id="JobTitle"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="JobID" className="form-label">Job ID:</label>
        <input
          type="text"
          className="form-control round"
          id="JobID"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="DepartmentName" className="form-label">Department Name:</label>
        <input
          type="text"
          className="form-control round"
          id="DepartmentName"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="Salary" className="form-label">Salary:</label>
        <input
          type="text"
          className="form-control round"
          id="Salary"
          value={city}
          onChange={handleCityChange}
          required
        />
      </div>
</div>

<div id="second-half">
      <div className="mb-3 rounded-input">
        <label htmlFor="LoginEmail" className="form-label">Login Email:</label>
        <input
          type="email"
          className="form-control round"
          id="LoginEmail"
          value={address}
          onChange={handleAddressChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="LoginPassword" className="form-label">Login Password:</label>
        <input
          type="password"
          className="form-control round"
          id="LoginPassword"
          value={zipcode}
          onChange={handleZipcodeChange}
          required
        />
      </div>

      <div className="mb-3 rounded-input">
        <label htmlFor="HireDate" className="form-label">Hire Date:</label>
        <input
          type="date"
          className="form-control round"
          id="HireDate"
          value={loginEmail}
          onChange={handleLoginEmailChange}
          required
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
  required
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
          required
        />
      </div>
*/}