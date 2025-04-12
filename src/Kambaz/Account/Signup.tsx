// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import * as client from "./client";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "./reducer";
// import { FormControl } from "react-bootstrap";

// export default function Signup() {
//   const [user, setUser] = useState<any>({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const signup = async () => {
//     try {
//       const currentUser = await client.signup(user);
//       dispatch(setCurrentUser(currentUser));
//       navigate("/Kambaz/Account/Profile");
//     } catch (err: any) {
//       if (err.response && err.response.status === 400) {
//         alert(err.response.data.message || "Username already in exist");
//       } else {
//         alert("Signup failed. Please try again later.");
//       }
//     }
//   };

  
//   return (
//     <div className="wd-signup-screen">
//       <h1>Sign up</h1>
//       <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
//              className="wd-username b-2" placeholder="username" />
//       <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
//              className="wd-password mb-2" placeholder="password" type="password"/>
//       <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
//       <Link to="/Kambaz/Account/Signin" className="wd-signin-link">Sign in</Link>
//     </div>
// );}


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { FormControl, Form, Button } from "react-bootstrap";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    if (!user.role) {
      alert("Please select a role before signing up.");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || "Username already in use");
      } else {
        alert("Signup failed. Please try again later.");
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start bg-light"
      style={{ minHeight: "100vh", paddingTop: "5px" }}
    >
      <div className="p-5 bg-white shadow rounded" style={{ width: "360px" }}>
        <h3 className="text-center mb-4 fw-bold" style={{ fontFamily: "Georgia, serif" }}>
          Create Your Account
        </h3>

        <Form.Group className="mb-3">
          <Form.Label className="text-muted fw-semibold">myNortheastern Username</Form.Label>
          <FormControl
            placeholder="Username"
            value={user.username || ""}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-muted fw-semibold">myNortheastern Password</Form.Label>
          <FormControl
            placeholder="Password"
            type="password"
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="text-muted fw-semibold">Role</Form.Label>
          <Form.Select
            value={user.role || ""}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="STUDENT">Student</option>
            <option value="FACULTY">Faculty</option>
          </Form.Select>
        </Form.Group>

        <Button className="w-100 mb-3" onClick={signup}>Sign up</Button>

        <div className="text-center">
          <Link to="/Kambaz/Account/Signin">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}

