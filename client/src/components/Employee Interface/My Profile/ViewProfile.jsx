import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ViewProfile.css';
import '../../BasicStyle.css';

export default function ViewProfile() {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Define state variables for each field
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [city, setCity] = useState('New York');
  const [address, setAddress] = useState('123 Main St');
  const [zipcode, setZipcode] = useState('10001');
  const [dateOfBirth, setDateOfBirth] = useState('1990-01-01');
  const [cnic, setCnic] = useState('12345-6789012-3');
  const [gender, setGender] = useState('Male');
   // State for the profile picture
   const [profilePicture, setProfilePicture] = useState(null);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Here, you can implement logic to save the updated profile information
    setShowModal(true);
    setEditMode(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

// Function to handle profile picture upload
const handleProfilePictureChange = (event) => {
  const file = event.target.files[0];
  // You can upload the file to your server or store it in state as needed
  setProfilePicture(file);
};

  return (
    <div id="full-content">
       <h2 className="mb-4">My Profile</h2>
      <div id="content">
      <div id="profile-picture">
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
</div>
        <div id="flex-content">
        <div id="first-half">
          {editMode ? (
            <>
              <div className="mb-3 rounded-input">
                <label htmlFor="firstName" className="form-label">First Name:</label>
                <input
                  type="text"
                  className="form-control round"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
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
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>First Name:</strong> {firstName}</p>
              <p><strong>Last Name:</strong> {lastName}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Phone Number:</strong> {phoneNumber}</p>
              <p><strong>City:</strong> {city}</p>
            </>
          )}
        </div>

        <div id="second-half">
          {editMode ? (
            <>
              <div className="mb-3 rounded-input">
                <label htmlFor="address" className="form-label">Address:</label>
                <input
                  type="text"
                  className="form-control round"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 rounded-input">
                <label htmlFor="DateofBirth" className="form-label">Date of Birth:</label>
                <input
                  type="date"
                  className="form-control round"
                  id="DateofBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
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
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  required
                />
              </div>
              <div id="gender-input">
                <p><strong>Gender:</strong> {gender}</p>
                {/* You can display the gender here */}
              </div>
            </>
          ) : (
            <>
              <p><strong>Address:</strong> {address}</p>
              <p><strong>Zipcode:</strong> {zipcode}</p>
              <p><strong>Date of Birth:</strong> {dateOfBirth}</p>
              <p><strong>CNIC:</strong> {cnic}</p>
              <p><strong>Gender:</strong> {gender}</p>
            </>
          )}
        </div>
</div>
        {editMode ? (
          <div>
            <Button variant="success" onClick={handleSaveClick}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="primary" onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your profile has been successfully updated.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

