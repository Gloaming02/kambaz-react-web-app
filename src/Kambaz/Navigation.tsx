import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useState } from "react";

export default function KambazNavigation() {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div id="wd-kambaz-navigation" style={{ width: 120 }} 
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank" 
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center">
          <img src="/images/NEU.png" width="75px" /></a>

      <Link to="/Kambaz/Account" id="wd-account-link"
        onClick={() => handleLinkClick('Account')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Account' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
       <FaRegCircleUser className="fs-1 text text-white" /><br />
       Account </Link><br />

      <Link to="/Kambaz/Dashboard" id="wd-dashboard-link"
        onClick={() => handleLinkClick('Dashboard')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Dashboard' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard</Link>

      <Link to="/Kambaz/Dashboard" id="wd-course-link"
        onClick={() => handleLinkClick('Courses')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Courses' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses</Link>

      <Link to="/Kambaz/Calendar" id="wd-calendar-link"
        onClick={() => handleLinkClick('Calendar')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Calendar' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <IoCalendarOutline  className="fs-1 text-danger" /><br />
        Calendar</Link>

      <Link to="/Kambaz/Inbox" id="wd-inbox-link"
        onClick={() => handleLinkClick('Inbox')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Inbox' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox</Link>
        
      <Link to="/Labs" id="wd-labs-link"
        onClick={() => handleLinkClick('Labs')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Labs' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <LiaCogSolid className="fs-1 text-danger" /><br />
        Labs</Link>

      <Link to="/Kambaz" id="wd-Kambaz-link"
        onClick={() => handleLinkClick('Kambaz')}
        className={`list-group-item text-center border-0
          ${activeLink === 'Kambaz' ? 'bg-white text-danger' : 'bg-black text-white'}`}>
        <FaHome className="fs-1 text-danger" /><br />
        Kambaz</Link>
    </div>
);}

