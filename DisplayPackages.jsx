import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayPackage = () => 
{
  const [packages, setPackages] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [packageDetails, setPackageDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllPackages();
  }, []);

  const fetchAllPackages = async () => {
    try {
      const response = await axios.get(`${config.url}/package/viewallpackages`);
      setPackages(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch packages: ' + err.message);
    }
  };

  const fetchPackageById = async (id) => {
    try {
      const response = await axios.post(`${config.url}/package/displaypackagebyid?pid=${id}`);
      setPackageDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching package: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchPackageById(id);
    } 
    else 
    {
      setPackageDetails(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Package Details</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Package:</strong></label>
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Package --</option>
          {packages.map(pkg => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name}
            </option>
          ))}
        </select>
      </div>

      {packageDetails && (
        <div className="card mt-3">
          <img
            src={`${config.url}/package/displaypackageimage?id=${packageDetails.id}`}
            className="card-img-top"
            alt="Package"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{packageDetails.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {packageDetails.category}<br />
              <strong>Description:</strong> {packageDetails.description}<br />
              <strong>Cost:</strong> ₹{packageDetails.cost}<br />
              <strong>URL:</strong> <a href={packageDetails.url} target="_blank" rel="noopener noreferrer">Visit</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPackage;
