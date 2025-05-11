import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setFormData(JSON.parse(storedCustomer));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${config.url}/customer/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('customer', JSON.stringify(formData));
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="update-profile-wrapper">
      <style>
        {`
          .update-profile-wrapper {
            max-width: 600px;
            margin: 40px auto;
            padding: 30px;
            background: #ffffff;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-radius: 8px;
            font-family: Arial, sans-serif;
          }

          h3 {
            text-align: center;
            text-decoration: underline;
            margin-bottom: 20px;
            color: #0b3d91;
          }

          form > div {
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
          }

          label {
            margin-bottom: 6px;
            font-weight: bold;
            color: #333;
          }

          input, select {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 15px;
          }

          input:disabled, select:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
          }

          button {
            width: 100%;
            background-color: #0b3d91;
            color: white;
            padding: 12px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          }

          button:hover {
            background-color: #092d6b;
          }

          p {
            text-align: center;
            font-weight: bold;
            margin-bottom: 15px;
          }

          .success {
            color: green;
          }

          .error {
            color: red;
          }
        `}
      </style>

      <h3>Update Profile</h3>

      {message && <p className="success">{message}</p>}
      {error && !message && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required disabled>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required disabled />
        </div>

        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label>Mobile No</label>
          <input type="number" id="mobileno" value={formData.mobileno} onChange={handleChange} required />
        </div>

        <div>
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
