import { Routes, Route, Link } from 'react-router-dom';
import './customer.css';
import CustomerHome from './CustomerHome';
import CustomerProfile from './CustomerProfile';
import CustomerLogin from './CustomerLogin';
import { useAuth } from '../contextapi/AuthContext';
import UpdateProfile from './UpdateProfile';
import BookedPackages from './BookedPackages';  // Updated
import ViewAllPackages from './ViewAllPackages';  // Ensure the file exists and is correctly named
import BookPackage from './BookPackage';  // Updated
import logo from './logo.png';  // ✅ Import your logo image
import PaymentPage from './PaymentPage'; 

export default function CustomerNavBar() {
  const { setIsCustomerLoggedIn } = useAuth();

  const handleLogout = () => {
    setIsCustomerLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Customer Logo" className="logo-image" />
        </div>
        <ul className="nav-links">
          <li><Link to="/customerhome">Home</Link></li>
          <li><Link to="/customerprofile">Customer Profile</Link></li>
          <li><Link to="/updateprofile">Update Profile</Link></li>
          <li><Link to="/bookpackage">Book a Package</Link></li>  {/* Updated */}
          <li><Link to="/bookedpackages">Booked Packages</Link></li>  {/* Updated */}
          <li><Link to="/customerlogin" onClick={handleLogout}>Logout</Link></li>
        </ul> 
      </nav>

      <Routes>
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/customerprofile" element={<CustomerProfile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/viewallpackages" element={<ViewAllPackages />} />  {/* Updated */}
        <Route path="/bookpackage" element={<BookPackage />} />  {/* Updated */}
        <Route path="/bookedpackages" element={<BookedPackages />} />  {/* Updated */}
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </div>
  );
}
