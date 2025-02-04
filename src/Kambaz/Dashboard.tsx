// import { Link } from "react-router-dom";
// export default function Dashboard() {
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
//       <div id="wd-dashboard-courses">
//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/1234/Home"
//                 className="wd-dashboard-course-link" >
//             <img src="/images/react.jpg" width={200} />
//             <div>
//               <h5> CS1234 React JS </h5>
//               <p className="wd-dashboard-course-title">
//                 Full Stack software developer  </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br/>
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/5678/Home" 
//               className="wd-dashboard-course-link">
//           <img src="/images/js.jpg" width={200} />
//           <div>
//             <h5> CS5678 Intro to JavaScript </h5>
//             <p className="wd-dashboard-course-title">
//               Learn the fundamentals of JavaScript programming
//             </p>
//             <button> Go </button>
//           </div>
//           </Link>
//           <br />
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/9101/Home" 
//                 className="wd-dashboard-course-link">
//             <img src="/images/py.jpg" width={200} />
//             <div>
//               <h5> CS9101 Python for Data Science </h5>
//               <p className="wd-dashboard-course-title">
//                 Dive into data analysis and machine learning with Python
//               </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br />
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/1122/Home" 
//                 className="wd-dashboard-course-link">
//             <img src="/images/aws.jpg" width={200} />
//             <div>
//               <h5> CS1122 Cloud Computing with AWS </h5>
//               <p className="wd-dashboard-course-title">
//                 Leanring Cloud computing and infrastructure with AWS
//               </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br />
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/3344/Home" 
//                 className="wd-dashboard-course-link">
//             <img src="/images/database.jpg" width={200} />
//             <div>
//               <h5> CS3344 SQL and Databases </h5>
//               <p className="wd-dashboard-course-title">
//                 Learn database management and SQL Query
//               </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br />
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/4455/Home" 
//                 className="wd-dashboard-course-link">
//             <img src="/images/cybersecurity.jpg" width={200} />
//             <div>
//               <h5> CS4455 Cybersecurity Fundamentals </h5>
//               <p className="wd-dashboard-course-title">
//                 Understand the basics of securing systems
//               </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br />
//         </div>

//         <div className="wd-dashboard-course">
//           <Link to="/Kambaz/Courses/7788/Home" 
//                 className="wd-dashboard-course-link">
//             <img src="/images/uiux.jpg" width={200} />
//             <div>
//               <h5> CS7788 UI/UX Design Principles </h5>
//               <p className="wd-dashboard-course-title">
//                 Learn how to create visually appealing designs
//               </p>
//               <button> Go </button>
//             </div>
//           </Link>
//           <br />
//         </div>

//       </div>
//     </div>
// );}

import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from 'react-bootstrap';

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" 
                style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/react.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1234 React JS + Backend</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack software developer more frontend
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/js.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS5678 Intro to JavaScript and Web</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn the fundamentals of JavaScript programming
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/9101/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/py.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS9101 Python for Data Science</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Dive into data analysis and machine learning with Python
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1122/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/aws.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1122 Cloud Computing with AWS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learning Cloud computing and infrastructure with AWS
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/3344/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/database.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS3344 SQL and Databases</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn database management and SQL Query
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4455/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/cybersecurity.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS4455 Cybersecurity Fundamentals</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Understand the basics of securing systems
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/7788/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/uiux.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS7788 UI/UX Design Principles</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn how to create visually appealing designs
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
