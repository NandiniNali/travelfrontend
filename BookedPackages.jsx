import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import './BookedPackages.css';

const BookedPackages = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookedPackages = async () => {
      try {
        const response = await axios.get(`${config.url}/package/booked`);
        setBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchBookedPackages();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (bookings.length === 0) {
    return (
      <div className="no-bookings">
        <h2>No Bookings Found</h2>
        <p>You haven't booked any packages yet.</p>
        <button onClick={() => navigate('/bookpackage')}>Browse Packages</button>
      </div>
    );
  }

  return (
    <div className="booked-packages-container">
      <h2>Your Booked Packages</h2>
      <div className="bookings-grid">
        {bookings.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h3>{pkg.name}</h3>
            <p className="description">{pkg.description}</p>
            <div className="details">
              <p><strong>Price:</strong> ₹{pkg.cost}</p>
              <p><strong>Duration:</strong> {pkg.duration} days</p>
              {pkg.bookingDate && (
                <p><strong>Booked on:</strong> {new Date(pkg.bookingDate).toLocaleString()}</p>
              )}
            </div>
            <img
              src={`${config.url}/package/displaypackageimage?id=${pkg.id}`}
              alt={pkg.name}
              className="package-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedPackages;