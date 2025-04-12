import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button, Card } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (e) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-start bg-light"
      style={{ minHeight: "100vh", paddingTop: "5px" }}>
      
      {/* Left: Login Form */}
      <div className="p-5 bg-white shadow rounded" style={{ width: "360px" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ fontFamily: "Georgia, serif" }}>
          Northeastern University
        </h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted fw-semibold">myNortheastern Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={credentials.username || ""}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="text-muted fw-semibold">myNortheastern Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={credentials.password || ""}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Form.Group>

          <Button variant="danger" className="w-100 py-2 fw-bold" onClick={signin}>
            Log In
          </Button>
        </Form>

        <div className="text-center mt-3">
          <Link to="/Kambaz/Account/Signup" className="text-decoration-none">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>

      {/* Right: Team Info */}
      <div className="ms-4 mt-5">
        <Card style={{ width: "360px" }}>
          <Card.Body>
            <Card.Title className="mb-3">Team Info</Card.Title>
            <p className="mb-2">
              <strong>Member:</strong> Zhengyan Hu
            </p>
            <p className="mb-2">
              <strong>Section:</strong> CS5610 Web Development
            </p>
            <p className="mb-2">
              <strong>React GitHub:</strong><br />
              <a href="https://github.com/Gloaming02/kambaz-react-web-app/tree/Quizzes" target="_blank" rel="noreferrer">
                kambaz-react-web-app
              </a>
            </p>
            <p className="mb-0">
              <strong>Node GitHub:</strong><br />
              <a href="https://github.com/Gloaming02/kambaz-node-server-app/tree/Quizzes" target="_blank" rel="noreferrer">
                kambaz-node-server-app
              </a>
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
