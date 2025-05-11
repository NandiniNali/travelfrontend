import { useState } from 'react';
import './customer.css';  // keep your CSS file (adjust the path if needed)
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';
import { useAuth } from '../contextapi/AuthContext';
import loginImage from './jaipur.jpg';  // import your image (adjust the path if needed)

export default function CustomerLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { setIsCustomerLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      setMessage('');
      return;
    }

    try {
      const response = await axios.post(`${config.url}/customer/checkcustomerlogin`, formData);

      if (response.status === 200) {
        setIsCustomerLoggedIn(true);
        sessionStorage.setItem('customer', JSON.stringify(response.data));
        setMessage('Logged in successfully!');
        setError('');
        navigate('/Customerhome');
      } else {
        setError(response.data || 'Invalid credentials');
        setMessage('');
      }
    } catch (err) {
      setError(err.response?.data || 'Server error');
      setMessage('');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="login-form">
          <h2>Welcome Back</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>

          <p className="register-text">
            Don’t have an account?{' '}
            <Link to="/customerregistration">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
