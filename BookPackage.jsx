import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './BookPackage.css';
import { useNavigate } from 'react-router-dom';

const BookPackage = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${config.url}/package/viewallpackages`);
      setPackages(response.data);
    } catch (err) {
      setError('Failed to fetch packages: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleBookNow = (pkg) => {
    navigate('/payment', { state: { selectedPackage: pkg } });
  };

  return (
    <div className="product-table-container">
      <h3 className="product-heading">Available Travel Packages</h3>
      {error && <p className="error-message">{error}</p>}

      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Duration</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id}>
                <td data-label="ID">{pkg.id}</td>
                <td data-label="Name">{pkg.name}</td>
                <td data-label="Category">{pkg.category}</td>
                <td data-label="Description">{pkg.description}</td>
                <td data-label="Cost">₹{pkg.cost}</td>
                <td data-label="Duration">{pkg.duration} days</td>
                <td data-label="Image">
                  <img
                    src={`${config.url}/package/displaypackageimage?id=${pkg.id}`}
                    alt="Package"
                    className="table-image"
                  />
                </td>
                <td data-label="Action">
                  <button 
                    onClick={() => handleBookNow(pkg)}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Book Now'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookPackage;
