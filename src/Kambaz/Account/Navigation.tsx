import { Link, useLocation } from "react-router-dom";
import { useState } from "react"; 
// import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const location = useLocation(); 

  const [activeLink, setActiveLink] = useState(location.pathname); 
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kambaz/Account/Signin" id="wd-signin-link"
        className={`list-group-item ${activeLink === '/Kambaz/Account/Signin' ? 'active' : 'text-danger'} border-0`} 
        onClick={() => handleLinkClick('/Kambaz/Account/Signin')}>
        Signin
      </Link>

      <Link to="/Kambaz/Account/Signup" id="wd-signup-link"
        className={`list-group-item ${activeLink === '/Kambaz/Account/Signup' ? 'active' : 'text-danger'} border-0`} 
        onClick={() => handleLinkClick('/Kambaz/Account/Signup')}>
        Signup
      </Link>
      <Link to="/Kambaz/Account/Profile" id="wd-profile-link"
        className={`list-group-item ${activeLink === '/Kambaz/Account/Profile' ? 'active' : 'text-danger'} border-0`} 
        onClick={() => handleLinkClick('/Kambaz/Account/Profile')}>
        Profile
      </Link>
    </div>
);}
