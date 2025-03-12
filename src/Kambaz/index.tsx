import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import { addCourse, editCourse, updateCourse, deleteCourse } 
        from "./Courses/reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Kambaz() {
  // const dispatch = useDispatch();
  const courses = useSelector((state: any) => state.courseReducer.courses); 

  // const addNewCourse = () => {
  //   dispatch(addCourse({
  //     _id: uuidv4(), 
  //     name: "New Course",
  //     number: "New Number",
  //     startDate: "2023-09-10",
  //     endDate: "2023-12-15",
  //     department: "D000",
  //     credits: 3,
  //     description: "New Course Description",
  //   }));
  // };
  // const removeCourse = (courseId: string) => {
  //   dispatch(deleteCourse(courseId));
  // };

  // const modifyCourse = (updatedCourse: any) => {
  //   dispatch(updateCourse(updatedCourse));
  // };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="Dashboard" element={
              <ProtectedRoute>              
                <Dashboard
                  courses={courses}
                  // addNewCourse={addNewCourse}
                  // deleteCourse={removeCourse}
                  // updateCourse={modifyCourse}
                  // setCourse={(courseId) => dispatch(editCourse(courseId))}
                  />
              </ProtectedRoute>
              } />
          <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
    </div>
);}

