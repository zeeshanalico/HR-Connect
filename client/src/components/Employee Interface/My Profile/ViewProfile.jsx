import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ViewProfile.css';
import '../../BasicStyle.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Toast from '../../../UIModules/Toast/Toast';
import { BaseUrl } from '../../../constants';
import { config } from '../../../constants';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be 11 digits")
    .required("Phone number is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string()
    .min(30, 'Address must be at least 30 characters long')
    .required('Address is required'),
  zipcode: Yup.string()
    .required("Zipcode is required")
    .matches(/^\d{5}$/, "Zip must be 5 digits"),
});
export default function ViewProfile() {
  const [current, setCurrent] = useState("");
  const [confirm, setConfirm] = useState("");
  const [newPass, setNewPass] = useState("");
  const [password, setPassword] = useState(false)

  const [imageURL, setImageURL] = useState(null);


  const [empInfo, setEmpInfo] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.post(BaseUrl + '/getEmpInfobyEmpId', {}, config);
      const { email, phone_number, city, address, zipcode } = await response.data;
      setEmpInfo(response.data);
      console.log(response.data);
      setUpdateInfo({ email, phone_number, city, address, zipcode });
    } catch (error) {
      Toast('an Error Occured', 'error')
      console.error('Error fetching data empInfobyId:', error);
    }
  };
  const fetchImage = async () => {
    try {
      const response = await axios.get(BaseUrl + '/images', { ...config, responseType: 'blob' });
      console.log(response.data);
      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        console.log(url);
        setImageURL(url);
      } else {
        console.error('Error fetching image:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImage();
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

  const handleUpdate = async () => {
    console.log(updateInfo);
    try {
      await validationSchema.validate(updateInfo, { abortEarly: false });
      const response = await axios.put(BaseUrl + '/updateEmployeeInfo', { ...updateInfo }, config);

      if (response.data.success) {
        Toast(`${response.data.message}`);
        await fetchData();
      } else {
        Toast(`${response.data.message}`, 'error');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        console.log(validationErrors);
        Object.values(validationErrors).forEach((errorMessage) => {
          Toast(errorMessage, 'error');
        });
      } else {
        Toast('An Error Occurred.', 'error');
        console.error(error);
      }
    }
    await fetchData();
  };

  return (
    <>
      {password ? (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            flexDirection: 'column'
          }}>
            <div style={{ textAlign: 'center', marginLeft: "600px" }}>
            </div>
            <form style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}>
              <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
                <div style={{ marginBottom: '15px' }}>
                  Reset Password
                  <input
                    type="password"
                    name="current"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                    placeholder="Current Password"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <input
                    type="password"
                    name="newPass"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="New Password"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <input
                    type="password"
                    name="confirm"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Confirm Password"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '5px',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <button
                  style={{
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div id="full-content">
          <h2 className="mb-4">My Profile</h2>
          <div id="content">
            <div style={{
              margin: 'auto',
              borderRadius: '50%',
              width: '250px',
              height: '270px',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '2px solid #ccc',
              padding: '0',
              transition: 'transform 0.3s ease', // Added transition
              cursor: 'pointer' // Added cursor style for hover
            }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} // Scale up on hover
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Reset scale on hover out
            >
              {imageURL && <img src={imageURL} alt="Img" style={{
                maxWidth: '100%',
                maxHeight: '100%',
                transition: 'transform 0.3s ease'
              }} />}
            </div>


            <div id="flex-content">
              <div id="first-half">
                {editMode ? (
                  <>
                    <h4>Only This Information is Allowed to change!</h4>
                    <div className="mb-3 rounded-input">
                      <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                      <input
                        type="number"
                        className="form-control round"
                        id="phoneNumber"
                        name='phone_number'
                        value={updateInfo.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>

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

                  </>
                ) : (
                  <>

                    <Table striped bordered hover>
                      <tbody>
                        <tr>
                          <td className="text-secondary"><strong>My Employee ID</strong></td>
                          <td>{empInfo.emp_id}</td>
                          <td className="text-secondary"><strong>CNIC</strong></td>
                          <td>{empInfo.cnic}</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>Full Name </strong></td>
                          <td>{empInfo.name}</td>
                          <td className="text-secondary"><strong>Hire Date</strong></td>
                          <td>{empInfo.hire_date?.toString().slice(0, 10)}</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>Email </strong></td>
                          <td>{empInfo.email}</td>
                          <td className="text-secondary"><strong>Date of Birth</strong></td>
                          <td>{empInfo.DOB?.toString().slice(0, 10)}</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>Phone Number </strong></td>
                          <td>{empInfo.phone_number}</td>
                          <td className="text-secondary"><strong>Salary</strong></td>
                          <td>{empInfo.salary?.toString()?.slice(0, -3)} PKR</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>City </strong></td>
                          <td>{empInfo.city}</td>
                          <td className="text-secondary"><strong>Department</strong></td>
                          <td>{empInfo.dep_name}</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>Zip-Code </strong></td>
                          <td>{empInfo.zipcode}</td>
                          <td className="text-secondary"><strong>My Job as a</strong></td>
                          <td>{empInfo.job_name}</td>
                        </tr>
                        <tr>
                          <td className="text-secondary"><strong>Address </strong></td>
                          <td>{empInfo.address}</td>
                          <td className="text-secondary"><strong>Gender</strong></td>
                          <td>{empInfo.gender}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="button-container">
                      <Button variant="primary" style={{ width: '200px', height: '40px', marginTop: '5px' }} onClick={() => { setEditMode(true) }}>
                        Edit Profile
                      </Button>
                      <Link style={{ width: '200px', marginLeft: '-40px', marginTop: '5px' }} to="/empdash/viewProfile/resetPassword">
                        <Button variant="danger">Reset Password</Button>
                      </Link>
                      <ImageUpload fetchData={fetchData} />
                    </div>
                    <p style={{ marginLeft:'500px',color: "red", fontSize: "12px", marginBottom: '-25px' }}>
        <strong>Only PNG format is allowed for image uploads.</strong>
      </p>
                  </>
                )}
              </div>
            </div>
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
      )
      }
    </>
  );
}

