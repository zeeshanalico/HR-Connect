import React, { useState } from "react";
import { BaseUrl, config } from "../../../constants";
import axios from 'axios'
import Toast from "../../../UIModules/Toast/Toast";
import { Button } from "react-bootstrap";


function ImageUpload({emp_id}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Toast("Please select an image to upload.",'warning');
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await axios.post(BaseUrl+"/upload", formData,config);

      if (response) {
        Toast("Image uploaded successfully!");
        setSelectedImage(null);
      } else {
        Toast("Image upload failed.",'error');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Toast("An error occurred while uploading the image.",'error');
    }
    setSelectedImage('');

  };

  return (
    <div>
      <input
        type="file"
        style={{display:'inline'}}
        accept="image/*"
        onChange={handleImageChange}
      />
      {/* {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Selected"
          width="200"
        />
      )} */}
      <br />
      <Button variant="secondary"onClick={handleUpload}>Upload Image</Button>
    </div>
  );
}

export default ImageUpload;
