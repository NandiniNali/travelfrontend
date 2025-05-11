import { useState } from 'react';
import './admin.css'; // You can rename this to 'admin.css' if desired
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useAuth(); // You should implement this in AuthContext

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/admin/checkadminlogin`, formData);
      if (response.status === 200) {
        setIsAdminLoggedIn(true);
        sessionStorage.setItem('admin', JSON.stringify(response.data));
        navigate("/adminhome");
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2 className="login-title">Admin Portal</h2>
        <p className="login-subtext">Please login to access the admin dashboard.</p>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <label>Username</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} required />

          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}
