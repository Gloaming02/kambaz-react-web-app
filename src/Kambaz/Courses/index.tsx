import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { Navigate, Route, Routes, useParams,useLocation } from "react-router";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizAttempt from "./Quizzes/QuizAttempt";

import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizEditor from "./Quizzes/QuizEditor";

import { FaAlignJustify } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { findUsersForCourse } from "./client";
// import { useSelector } from "react-redux";


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);

  //-----my code for table people-----
  const [courseUsers, setCourseUsers] = useState([]);

  useEffect(() => {
    const loadPeople = async () => {
      if (pathname.endsWith("People") && cid) {
        const users = await findUsersForCourse(cid);
        setCourseUsers(users);
      }
    };
    loadPeople();
  }, [pathname, cid]);
  //------------------------------

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
        <Route path="Quizzes/:qid" element={<QuizDetails />} />
        <Route path="Quizzes/:qid/attempt" element={<QuizAttempt />} />
        <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
        <Route path="Quizzes/:qid/editor/*" element={<QuizEditor />} />

        <Route path="People" element={<PeopleTable users={courseUsers} />} />
        </Routes>
      </div>

      </div>
    </div>
  );
}