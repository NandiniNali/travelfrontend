import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddPackage = () => {
  const [travelPackage, setTravelPackage] = useState({
    category: '',
    name: '',
    description: '',
    cost: '',
    duration: '',
    url: ''
  });
  const [packageImage, setPackageImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTravelPackage({ ...travelPackage, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setPackageImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('packageImage', packageImage);
    formData.append('category', travelPackage.category);
    formData.append('name', travelPackage.name);
    formData.append('description', travelPackage.description);
    formData.append('cost', travelPackage.cost);
    formData.append('duration', travelPackage.duration);
    formData.append('url', travelPackage.url);

    try {
      const response = await axios.post(`${config.url}/package/addpackage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
      setError("");

      // Clear form fields
      setTravelPackage({
        category: '',
        name: '',
        description: '',
        cost: '',
        duration: '',
        url: ''
      });
      setPackageImage(null);

    } catch (error) {
      console.log(error.message);
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Package</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label>Category:</label>
          <select className="form-control" name="category" onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            <option value="Adventure">Adventure</option>
            <option value="Family">Family</option>
            <option value="Solo">Solo</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea className="form-control" name="description" rows="3" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Cost:</label>
          <input type="number" step="0.01" className="form-control" name="cost" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Duration (days):</label>
          <input type="text" className="form-control" name="duration" onChange={handleChange} required />
        </div>
        {/* <div className="mb-3">
          <label>URL:</label>
          <input type="text" className="form-control" name="url" onChange={handleChange} required />
        </div> */}
        <div className="mb-3">
          <label>Package Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackage;