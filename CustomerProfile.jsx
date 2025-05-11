import { useState, useEffect } from 'react';
import './customerProfile.css';  // Link to the external CSS file

export default function CustomerProfile() {
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
  }, []);

  if (!customer) {
    return (
      <div className="loading-message">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">👤 Customer Profile</h2>

      <div className="profile-card">
        <p><strong>🧑‍💼 Name:</strong> {customer.name}</p>
        <p><strong>🚻 Gender:</strong> {customer.gender}</p>
        <p><strong>🎂 Date of Birth:</strong> {customer.dob}</p>
        <p><strong>📧 Email:</strong> {customer.email}</p>
        <p><strong>🔑 Username:</strong> {customer.username}</p>
        <p><strong>📱 Mobile No:</strong> {customer.mobileno}</p>
        <p><strong>🌍 Location:</strong> {customer.location}</p>
      </div>
    </div>
  );
}
