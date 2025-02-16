// import { Link } from "react-router-dom";
// import { useState } from "react"; 

// export default function CourseNavigation() {
//   const [activeLink, setActiveLink] = useState('/Kambaz/Courses/1234/Home');
//   const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

//   const handleLinkClick = (link: string) => {
//     setActiveLink(link);
//   };

//   return (
//     <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
//       <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Home' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Home')}>
//         Home
//       </Link>
//       <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Modules' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Modules')}>
//         Modules
//       </Link>
//       <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Piazza' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Piazza')}>
//         Piazza
//       </Link>
//       <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Zoom' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Zoom')}>
//         Zoom
//       </Link>
//       <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-quizzes-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Assignments' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Assignments')}>
//         Assignments
//       </Link>
//       <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-assignments-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/Quizzes' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/Quizzes')}>
//         Quizzes
//       </Link>
//       <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link"
//         className={`list-group-item ${activeLink === '/Kambaz/Courses/1234/People' ? 'active' : 'text-danger'} border-0`} 
//         onClick={() => handleLinkClick('/Kambaz/Courses/1234/People')}>
//         People
//       </Link>
//     </div>
//   );
// }

import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams(); 
  const { pathname } = useLocation(); 
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = pathname === linkPath; 
        return (
          <Link key={link} to={linkPath} 
            className={`list-group-item ${isActive ? "active" : "text-danger"} border-0`}>
            {link}
          </Link>
        );
      })}
    </div>
  );
}
