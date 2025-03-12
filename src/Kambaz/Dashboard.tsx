import { Link } from "react-router-dom";
import { Row, Col, Card, Button, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCourse, editCourse, updateCourse, deleteCourse } 
        from "./Courses/reducer";
import { enroll, unenroll, updateEnrollment, editEnrollment } 
        from "./enrollmentsReducer";

export default function Dashboard({ courses }: { courses: any[]; }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
    // const studentId = currentUser._id;
    const [showAllCourses, setShowAllCourses] = useState(false);

    const studentId = currentUser._id;
    const isStudent = currentUser.role === "STUDENT";
    
    const [selectedCourse, setSelectedCourse] = useState<any>({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "D000",
      credits: 3,
      description: "New Course Description",
  });

  const handleEditCourse = (course: any) => {
    setSelectedCourse(course);
  };

  const handleSaveCourse = () => {
    if (selectedCourse._id) {
        dispatch(updateCourse(selectedCourse));
    } else {
        dispatch(addCourse(selectedCourse));
    }
    setSelectedCourse({
      _id: "",
      name: "New Course",
      number: "New Number",
      startDate: "2023-09-10",
      endDate: "2023-12-15",
      department: "D000",
      credits: 3,
      description: "New Course Description",
  });;
};
    // const filteredCourses = courses
    // .filter(
    //   (course) =>
    //   enrollments.some(
    //     (enrollment:any) =>
    //       enrollment.user === currentUser._id &&
    //       enrollment.course === course._id
    //   )
    // );

    const filteredCourses = showAllCourses ? courses
    : courses.filter((course) =>
        enrollments.some((enrollment: any) =>
          enrollment.user === studentId && 
          enrollment.course === course._id
        )
    );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        {isStudent && (
          <button className="btn btn-primary float-end" onClick={() => setShowAllCourses(!showAllCourses)}>
              {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </button>
      )}
      {currentUser.role === "FACULTY" && (
        <>
        <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={handleSaveCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                onClick={handleSaveCourse} id="wd-update-course-click">
          Update
        </button>
      </h5>
      <br />
      <FormControl value={selectedCourse.name} className="mb-2"
             onChange={(e) => setSelectedCourse({ ...selectedCourse, name: e.target.value }) } />
      <FormControl as="textarea" value={selectedCourse.description} rows={3}
             onChange={(e) => setSelectedCourse({ ...selectedCourse, description: e.target.value }) } />   
      <br />
        </>
      )}

      
      <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course:any) => {
            const isEnrolled = enrollments.some((e: any) => e.user === studentId && e.course === course._id);

            return (

            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/react.jpg" variant="top" width="100%" height={160} />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description} </Card.Text>
                    <Button variant="primary"> Go </Button>

                    {currentUser.role === "FACULTY" && (
                      <>
                      <button onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(course._id));
                        }
                      } 
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Delete
                      </button>

                      <button id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setSelectedCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end" >
                        Edit
                      </button>
                      </>
                    )}

                    {currentUser.role === "STUDENT" && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          if (isEnrolled) {
                              dispatch(unenroll({ user: studentId, course: course._id }));
                          } else {
                              dispatch(enroll({ user: studentId, course: course._id }));
                          }
                        }}
                          className={`btn float-end ${isEnrolled ? "btn-danger" : "btn-success"}`}
                          id="wd-enroll-course-click">
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            );
          })}
        </Row>
    </div>
  </div>
  );
}