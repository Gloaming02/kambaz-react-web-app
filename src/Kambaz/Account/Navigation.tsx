import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-signin-link"
        className={`list-group-item ${
          pathname === "/Kambaz/Account/Signin" ? "active" : "text-danger"
        } border-0`}
      >
        Signin
      </Link>

      <Link
        to="/Kambaz/Account/Signup"
        id="wd-signup-link"
        className={`list-group-item ${
          pathname === "/Kambaz/Account/Signup" ? "active" : "text-danger"
        } border-0`}
      >
        Signup
      </Link>

      <Link
        to="/Kambaz/Account/Profile"
        id="wd-profile-link"
        className={`list-group-item ${
          pathname === "/Kambaz/Account/Profile" ? "active" : "text-danger"
        } border-0`}
      >
        Profile
      </Link>

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to="/Kambaz/Account/Users"
          id="wd-users-link"
          className={`list-group-item ${
            pathname === "/Kambaz/Account/Users" ? "active" : "text-danger"
          } border-0`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
