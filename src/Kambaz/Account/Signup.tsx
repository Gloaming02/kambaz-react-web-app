import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4">
      <h1>Sign up</h1>
      <Form.Control id="wd-username"placeholder="Username" className="mb-2" />
      <Form.Control id="wd-password" placeholder="Password" 
        type="password" className="mb-2" />
      <Link to="/Kambaz/Account/Profile" className="btn btn-success w-100 mb-2" 
        id="wd-signup-btn">Sign up
      </Link>
      <Link to="/Kambaz/Account/Signin" id="wd-signin-link">
        Already have an account? Sign in
      </Link>
    </div>
  );
}
