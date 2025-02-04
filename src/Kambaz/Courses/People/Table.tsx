import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Tony</span>{" "}
          <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>

      <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Ralf</span>{" "}
            <span className="wd-last-name">Evan</span>
        </td>
        <td className="wd-login-id">004567890B</td>
        <td className="wd-section">S103</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2021-05-12</td>
        <td className="wd-total-activity">05:45:22</td>
        </tr>

        <tr><td className="wd-full-name text-nowrap">
            <FaUserCircle className="me-2 fs-1 text-secondary" />
            <span className="wd-first-name">Zhengyan</span>{" "}
            <span className="wd-last-name">Hu</span>
        </td>
        <td className="wd-login-id">002529375Z</td>
        <td className="wd-section">S104</td>
        <td className="wd-role">STUDENT</td>
        <td className="wd-last-activity">2021-05-13</td>
        <td className="wd-total-activity">09:12:38</td>
        </tr>
    </tbody>
   </Table>
  </div> );}