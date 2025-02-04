import { Link } from "react-router-dom";
import { useState } from "react"; 

export default function AccountNavigation() {
  const [activeLink, setActiveLink] = useState('/Kambaz/Account/Signin');

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
        className={`list-group-item ${activeLink === '/Kambaz/Account/SiProfilegnin' ? 'active' : 'text-danger'} border-0`} 
        onClick={() => handleLinkClick('/Kambaz/Account/Profile')}>
        Profile
      </Link>
    </div>
);}
