import { Routes, Route, Link } from 'react-router-dom';
import './admin.css';
import AdminHome from './AdminHome';
import ViewCustomers from './ViewCustomers';
import AdminLogin from './AdminLogin';
import { useAuth } from '../contextapi/AuthContext';
import AddPackage from './AddPackages';
import DisplayPackages from './DisplayPackages';

import logo from './logo.png'; 

export default function AdminNavBar() 
{
  const { setIsAdminLoggedIn } = useAuth(); 

  const handleLogout = () => 
  {
    setIsAdminLoggedIn(false); 
  };

  return (
    <div>
      <nav className="navbar">
          <div className="logo">
                          <img src={logo} alt="Customer Logo" className="logo-image" />
                        </div>
        <ul className="nav-links">
          <li><Link to="/adminhome">Home</Link></li>
        
         
          <li><Link to="/viewallcustomers">View All Customers</Link></li>
          
          <li><Link to="/addpackage">Add Package</Link></li>
         

          <li><Link to="/adminlogin" onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact /> 
        <Route path="/viewallcustomers" element={<ViewCustomers />} exact />
        <Route path="/addpackage" element={<AddPackage />} exact />
        
        <Route path="/displaypackages" element={<DisplayPackages />} exact />

        <Route path="/adminlogin" element={<AdminLogin />} exact />
      </Routes>
    </div>
  );
}
