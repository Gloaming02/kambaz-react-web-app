import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li>
          <a href="https://github.com/Gloaming02/kambaz-react-web-app" 
            id="wd-github">Code Repository</a>
        </li>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Kambaz">Kambaz</Link></li>
      </ul>
    );
  }
  