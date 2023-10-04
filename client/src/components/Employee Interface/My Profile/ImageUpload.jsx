import React, { useState } from "react";
import { BaseUrl, config } from "../../../constants";
import axios from 'axios'
import Toast from "../../../UIModules/Toast/Toast";
import { Button } from "react-bootstrap";
import { useEffect } from "react";


function ImageUpload({ fetchData }) {

  useEffect(() => {
    fetchData()
  }, [])
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Toast("Please select an image to upload.", 'warning');
      return;
    }
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await axios.post(BaseUrl + "/upload", formData, config);

      if (response) {
        Toast("Image uploaded successfully!");
        setSelectedImage(null);
        window.location.reload();
      } else {
        Toast("Image upload failed.", 'error');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Toast("An error occurred while uploading the image.", 'error');
    }
    setSelectedImage('');

  };

  return (
    <>
      <div style={{marginTop:'0px',height:'43px'}} className="button-container">
        <input
          type="file"
          style={{ display: 'inline',width:'350px',marginRight:'10px' }}
          accept="image/png" // Only allow PNG format
          onChange={handleImageChange}
        />
        <Button variant="secondary" style={{width:'160px'}} onClick={handleUpload}>Upload Image</Button>
      </div>
      {/* <p style={{ color: "red", fontSize: "12px", marginBottom: '-25px' }}>
        <strong>Only PNG format is allowed for image uploads.</strong>
      </p> */}
    </>
  );
}

export default ImageUpload;
