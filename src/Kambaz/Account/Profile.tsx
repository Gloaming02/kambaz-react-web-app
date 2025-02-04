import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4">
      <h1>Profile</h1>

      <Form.Group className="mb-1">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          id="wd-username"
          defaultValue="alice"
          placeholder="Username"
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          id="wd-password"
          type="password"
          defaultValue="123"
          placeholder="Password"
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>First Name</Form.Label>
        <Form.Control 
          id="wd-firstname"
          defaultValue="Alice"
          placeholder="First Name"
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Last Name</Form.Label>
        <Form.Control 
          id="wd-lastname"
          defaultValue="Wonderland"
          placeholder="Last Name"
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
          id="wd-dob"
          type="date"
          defaultValue="2000-01-01"
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          id="wd-email"
          type="email"
          defaultValue="alice@wonderland"
          placeholder="Email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Role</Form.Label>
        <Form.Select defaultValue="FACULTY" id="wd-role">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>
      </Form.Group>

      <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
        Sign out
      </Link>
    </div>
  );
}
