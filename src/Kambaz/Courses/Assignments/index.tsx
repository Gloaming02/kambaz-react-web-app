import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { RxTriangleDown } from "react-icons/rx";
import { useParams, Link } from "react-router-dom";
import AssignmentsButtons from "./AssignmentsButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import GroupButton from "./GroupButton";
import * as db from "../../Database"; 

export default function Assignments() {
  const { cid } = useParams(); 
  const assignments = db.assignments.filter((assignment) => assignment.course === cid); 

  return (
    <div id="wd-assignments" className="container">
      <AssignmentControlButton /><br />
      
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <RxTriangleDown className="me-0 fs-5" />
            <span className="flex-grow-1">ASSIGNMENTS</span>
            <GroupButton />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments.map((assignment) => (
              <ListGroup.Item key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
                action as={Link} to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} >
                <BsGripVertical className="me-4 fs-3" />
                <MdAssignment className="me-3 fs-3" style={{ color: "green" }} />
                
                <div className="d-flex flex-column">
                  <span className="wd-assignment-link" style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {assignment.title}
                  </span>
                  <div style={{ fontSize: "14px" }}>
                    <span className="text-danger">{assignment.module}</span> |
                    <strong> Not available until</strong> {assignment.available} | <br />
                    <strong>Due</strong> {assignment.due} | {assignment.points} pts
                  </div>
                </div>

                <div className="ms-auto">
                  <AssignmentsButtons />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

// export default function Assignments() {
//   return (
//     <div id="wd-assignments" className="container">
//     <AssignmentControlButton /><br />
//     <ListGroup className="rounded-0" id="wd-modules">
//       <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center"> 
//       <BsGripVertical className="me-2 fs-3" /> 
//         <RxTriangleDown className="me-0 fs-5" /> 
//         <span className="flex-grow-1">ASSIGNMENTS</span>
//         <GroupButton />
//         </div>
//         <ListGroup className="wd-lessons rounded-0">
//         <ListGroup.Item 
//           className="wd-lesson p-3 ps-1 d-flex align-items-center" 
//           action 
//           href="#/Kambaz/Courses/1234/Assignments/124"
//         >
//         <BsGripVertical className="me-4 fs-3" />
//         <MdAssignment className="me-3 fs-3" style={{ color: 'green' }}/>
//         <div className="d-flex flex-column">
//             <span
//               className="wd-assignment-link"
//               style={{ fontWeight: 'bold', fontSize: '18px' }}>
//               A1
//             </span> 
//             <div style={{ fontSize: '14px' }}>
//             <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |<br />
//               <strong>Due</strong> May 13 at 11:59pm | 100 pts
//             </div>
//           </div>
//           <div className="ms-auto">
//             <AssignmentsButtons />
//           </div>
//           </ListGroup.Item>

//           <ListGroup.Item 
//           className="wd-lesson p-3 ps-1 d-flex align-items-center" 
//           action 
//           href="#/Kambaz/Courses/1234/Assignments/125"
//         >
//         <BsGripVertical className="me-4 fs-3" />
//           <MdAssignment className="me-3 fs-3" style={{ color: 'green' }}/>
//           <div className="d-flex flex-column">
//             <span
//               className="wd-assignment-link"
//               style={{ fontWeight: 'bold', fontSize: '18px' }}>
//               A2
//             </span> 
//             <div style={{ fontSize: '14px' }}>
//             <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |<br />
//               <strong>Due</strong> May 20 at 11:59pm | 100 pts
//             </div>
//           </div>
//           <div className="ms-auto">
//             <AssignmentsButtons />
//           </div>
//           </ListGroup.Item>

//           <ListGroup.Item 
//           className="wd-lesson p-3 ps-1 d-flex align-items-center" 
//           action 
//           href="#/Kambaz/Courses/1234/Assignments/126"
//         >
//         <BsGripVertical className="me-4 fs-3" />
//         <MdAssignment className="me-3 fs-3" style={{ color: 'green' }}/>
//         <div className="d-flex flex-column">
//             <span
//               className="wd-assignment-link"
//               style={{ fontWeight: 'bold', fontSize: '18px' }}>
//               A3
//             </span> 
//             <div style={{ fontSize: '14px' }}>
//             <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |<br />
//               <strong>Due</strong> May 27 at 11:59pm | 100 pts
//             </div>
//           </div>
//           <div className="ms-auto">
//             <AssignmentsButtons />
//           </div>
//           </ListGroup.Item>

//         </ListGroup>
//       </ListGroup.Item>

//     </ListGroup>
//   </div>
//   );
// }
