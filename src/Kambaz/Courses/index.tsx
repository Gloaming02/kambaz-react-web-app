import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { Navigate, Route, Routes, useParams,useLocation, useNavigate } from "react-router";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";

import { FaAlignJustify } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as enrollmentsClient from "../enrollmentsClient"; 

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      const data = await enrollmentsClient.findMyEnrollments();
      setEnrollments(data);
      setLoading(false); 
    };
    fetchEnrollments();
  }, [currentUser]);
  
  const course = courses.find((course) => course._id === cid);
  const studentId = currentUser._id;

  const isEnrolled = enrollments.some((e: any) => e.user === studentId && e.course === cid);

  useEffect(() => {
    if (!loading && currentUser.role === "STUDENT" && !isEnrolled) {
      navigate("/Kambaz/Dashboard");
    }
  }, [loading, isEnrolled, currentUser]);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" />
      {course && course.name} &gt; {pathname.split("/")[4]}
      </h2> <hr />

      <div className="d-flex">
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>
      <div className="flex-fill">
      <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="Home" element={<Home />} />
        <Route path="Modules" element={<Modules />} />
        <Route path="Assignments" element={<Assignments />} />
        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
        <Route path="Quizzes" element={<Quizzes />} />
        {/* <Route path="Quizzes/:aid" element={<AssignmentEditor />} /> */}

        <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>

      </div>
    </div>
  );
}