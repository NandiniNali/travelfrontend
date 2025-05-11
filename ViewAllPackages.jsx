import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewAllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate package data (you can replace this with mock data or JSON file)
    const mockPackages = [
      {
        id: 1,
        name: 'Beach Escape',
        category: 'Relaxation',
        description: 'Enjoy the serene beaches.',
        cost: 9999,
        url: 'https://beachpackage.com',
      },
      {
        id: 2,
        name: 'Mountain Trek',
        category: 'Adventure',
        description: 'Trek through majestic mountains.',
        cost: 11999,
        url: 'https://mountainpackage.com',
      },
    ];
    setPackages(mockPackages);
  }, []);

  const handleBookPackage = (pkg) => {
    setSelectedPackage(pkg);
    setPaymentAmount(pkg.cost); // Set payment amount to the cost of the selected package
    setSuccessMessage(`Package "${pkg.name}" booked successfully!`);
  };

  const handlePayment = () => {
    setPaymentProcessing(true);

    // Simulate a payment processing (In real scenario, you should call the payment API here)
    setTimeout(() => {
      // Simulate payment success
      localStorage.setItem('bookedPackage', JSON.stringify(selectedPackage));
      setPaymentProcessing(false);
      setSuccessMessage(`Payment successful for "${selectedPackage.name}"!`);
      
      // Redirect to booked packages after payment
      setTimeout(() => {
        navigate('/bookedpackages');
      }, 1000);
    }, 2000); // Simulating 2 seconds payment processing
  };

  return (
    <div className="package-table-container">
      {error && (
        <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>{error}</p>
      )}
      {successMessage && (
        <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>{successMessage}</p>
      )}

      <div className="table-responsive">
        <table className="package-table" style={{ textAlign: 'center', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr key={index}>
                <td>{pkg.id}</td>
                <td>{pkg.name}</td>
                <td>{pkg.category}</td>
                <td>{pkg.description}</td>
                <td>₹{pkg.cost}</td>
                <td>
                  <a href={pkg.url} target="_blank" rel="noopener noreferrer">Visit</a>
                </td>
                <td>
                  <button
                    onClick={() => handleBookPackage(pkg)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Book
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal / Section */}
      {selectedPackage && !paymentProcessing && (
        <div className="payment-modal" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Payment for "{selectedPackage.name}"</h2>
          <p>Amount: ₹{paymentAmount}</p>
          <button
            onClick={handlePayment}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Pay Now
          </button>
        </div>
      )}

      {/* Payment Processing */}
      {paymentProcessing && (
        <div className="payment-processing" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Processing Payment...</h2>
        </div>
      )}
    </div>
  );
};

export default ViewAllPackages;
