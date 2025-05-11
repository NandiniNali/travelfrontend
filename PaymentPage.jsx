import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const selectedPackage = location.state?.selectedPackage;

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First mark the package as booked
      await axios.post(`${config.url}/package/book`, {
        packageId: selectedPackage.id
      });

      // Then navigate to booked packages
      navigate('/bookedpackages');
    } catch (err) {
      setError('Payment failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage) {
    return (
      <div className="payment-container">
        <h2>No Package Selected</h2>
        <p>Please go back and select a package to book.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <h2>Payment for {selectedPackage.name}</h2>
      <div className="package-details">
        <p><strong>Price:</strong> ₹{selectedPackage.cost}</p>
        <p><strong>Duration:</strong> {selectedPackage.duration} days</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" placeholder="1234 5678 9012 3456" required />
        </div>

        <div className="form-group">
          <label>Name on Card</label>
          <input type="text" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry Date</label>
            <input type="text" placeholder="MM/YY" required />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input type="password" placeholder="123" required />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing Payment...' : 'Confirm Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;