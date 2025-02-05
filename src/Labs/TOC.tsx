// import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

// export default function TOC() {
//     return (
//       <ul>
//         <li>
//           <a href="https://github.com/Gloaming02/kambaz-react-web-app" 
//             id="wd-github">Code Repository</a>
//         </li>
//         <li><Link to="/Labs">Labs</Link></li>
//         <li><Link to="/Labs/Lab1">Lab 1</Link></li>
//         <li><Link to="/Labs/Lab2">Lab 2</Link></li>
//         <li><Link to="/Labs/Lab3">Lab 3</Link></li>
//         <li><Link to="/Kambaz">Kambaz</Link></li>
//       </ul>
//     );
//   }
  
  export default function TOC() {
    return (
      <Nav variant="pills">
      <Nav.Item>
        <Nav.Link href="#/Labs">Labs</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Labs/Lab1">Lab 1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Labs/Lab2">Lab 2</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Labs/Lab3">Lab 3</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="#/Kambaz">Kambaz</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/Gloaming02">My GitHub</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/Gloaming02/kambaz-react-web-app">Code Repository</Nav.Link>
      </Nav.Item>
    </Nav>
    );
  }