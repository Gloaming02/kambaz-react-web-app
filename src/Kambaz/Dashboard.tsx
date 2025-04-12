import { Link } from "react-router-dom";
import { Row, Col, Card, FormControl } from 'react-bootstrap';
import {useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard({
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    fetchAllCourses, 
    enrolling, 
    setEnrolling, 
    updateEnrollment 
  }: {
    courses: any[];
    addCourse: (course: any) => void;
    updateCourse: (course: any) => void;
    deleteCourse: (courseId: string) => void;
    fetchAllCourses: () => Promise<void>;
    enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }) {



    const { currentUser } = useSelector((state: any) => state.accountReducer);
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

  const handleSaveCourse = async () => {
    if (selectedCourse._id) {
      updateCourse(selectedCourse);
    } else {
      const newCourse = await addCourse(selectedCourse);
      await fetchAllCourses();
      console.log(newCourse);
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


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />

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

      
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course:any) => {
            return (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img src="/images/react.jpg" variant="top" width="100%" height={160} />
                </Link>
                <Card.Body className="card-body">

                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                  {enrolling && (
                    <button onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(course._id, !course.enrolled);
                      }}
                      className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                      {course.enrolled ? "Unenroll" : "Enroll"}
                    </button>
                  )}
                  {course.name} 
                </Card.Title>

                <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  {course.description} </Card.Text>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="btn btn-primary text-white"
                  >
                    Go
                  </Link>

                {currentUser.role === "FACULTY" && (
                  <>
                  <button onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
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

                </Card.Body>
              </Card>
            </Col>
            );
          })}
        </Row>
    </div>
  </div>
  );
}