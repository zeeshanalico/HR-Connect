import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ViewProfile.css';
import '../../BasicStyle.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Toast from '../../../UIModules/Toast/Toast';
import { BaseUrl,employeeId } from '../../../constants';
const emp_id = employeeId;
export default function ViewProfile() {
  const [empInfo, setEmpInfo] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.post(BaseUrl + '/getEmpInfobyEmpId', { emp_id });
      const {email,phone_number,city,address,zipcode}=await response.data[0];
      setEmpInfo(response.data[0]);
      setUpdateInfo({email,phone_number,city,address,zipcode});
    } catch (error) {
      Toast('an Error Occured', 'error')
      console.error('Error fetching data empInfobyId:', error);
      throw error;
    }
  };
  useEffect(() => {
    fetchData();
  }, [])


  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  }
  const handleUpdate=async()=>{
      console.log(updateInfo);
      try{
        const response =await axios.put(BaseUrl+'/updateEmployeeInfo',{...updateInfo,emp_id})
        if(response.data.success){
          Toast(`${response.data.message}`)
          await fetchData();
        }else{
          Toast(`${response.data.message}`)
        }
      }catch(e){
        Toast('An Error Occured.','error')
        console.log(e);
      }

  }


  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePicture(file);
  // };


  return (
    <div id="full-content">
      <h2 className="mb-4">My Profile</h2>
      <div id="content">
        {/* <div id="profile-picture">
          <div className="profile-image-container">
            <img
              src={profilePicture ? URL.createObjectURL(profilePicture) : '/default-profile-picture.png'}
              alt="___Image"
              className="profile-image"
            />
          </div>
          {editMode && (
            <div className="mb-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
            </div>
          )}
        </div> */}
        <div id="flex-content">
          <div id="first-half">
            {editMode ? (
              <>
                <h4>Only This Information is Allowed to change!</h4>
                <div className="mb-3 rounded-input">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    name='email'
                    className="form-control round"
                    id="email"
                    value={updateInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <input
                    type="tel"
                    className="form-control round"
                    id="phoneNumber"
                    name='phone_number'
                    value={updateInfo.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            ) : (
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td className="text-info"><strong>My Employee ID</strong></td>
                    <td>{empInfo.emp_id}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Full Name </strong></td>
                    <td>{empInfo.name}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Email </strong></td>
                    <td>{empInfo.email}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Phone Number </strong></td>
                    <td>{empInfo.phone_number}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>City </strong></td>
                    <td>{empInfo.city}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Zip-Code </strong></td>
                    <td>{empInfo.zipcode}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Address </strong></td>
                    <td>{empInfo.address}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
          {/* ------------------------------------------------- */}
          <div id="second-half">
            {editMode ? (
              <>
                <div className="mb-3 rounded-input">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="city"
                    name='city'
                    value={updateInfo.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="address" className="form-label">Address:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="address"
                    name='address'
                    value={updateInfo.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 rounded-input">
                  <label htmlFor="zipcode" className="form-label">Zipcode:</label>
                  <input
                    type="text"
                    className="form-control round"
                    id="zipcode"
                    name='zipcode'
                    value={updateInfo.zipcode}
                    onChange={handleChange}
                    required
                  />
                </div>


              </>
            ) : (
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td className="text-info"><strong>CNIC</strong></td>
                    <td>{empInfo.cnic}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Hire Date</strong></td>
                    <td>{empInfo.hire_date?.toString().slice(0, 10)}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Date of Birth</strong></td>
                    <td>{empInfo.DOB?.toString().slice(0, 10)}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Salary</strong></td>
                    <td>{empInfo.salary}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Department</strong></td>
                    <td>{empInfo.dep_name}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>My Job as a</strong></td>
                    <td>{empInfo.job_name}</td>
                  </tr>
                  <tr>
                    <td className="text-info"><strong>Gender</strong></td>
                    <td>{empInfo.gender}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </div>
        </div>
        {editMode ? (
          <div>
            <Button variant="success" onClick={() => {
              // setShowModal(true);
              setEditMode(false);
              handleUpdate();
            }}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => {
              setEditMode(false)
            }}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={() => { setEditMode(true) }}>
            Edit Profile
          </Button>
        )}
      </div>

      <Modal show={showModal} onHide={() => { setShowModal(false); }}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your profile has been successfully updated.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowModal(false); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

