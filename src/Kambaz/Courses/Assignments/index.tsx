import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MdAssignment } from "react-icons/md";
import AssignmentsButtons from "./AssignmentsButtons";
import AssignmentControlButton from "./AssignmentControlButton";
import GroupButton from "./GroupButton";

import { setAssignments, deleteAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams(); 
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };
  

  const handleNavigation = (assignmentId: string) => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };  


  function formatToReadableDate(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return `${month} ${day} at ${hours}:${paddedMinutes}${ampm}`;
  }

  
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
            {assignments
                .map((assignment:any) => (
              <ListGroup.Item key={assignment._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
                >
                <div
                  className="clickable-area d-flex align-items-center flex-grow-1"
                  onClick={() => handleNavigation(assignment._id)}
                  style={{ cursor: "pointer" }}
                >
                  <BsGripVertical className="me-4 fs-3" />
                  <MdAssignment className="me-3 fs-3" style={{ color: "green" }} />
                  
                  <div className="d-flex flex-column">
                    <span className="wd-assignment-link" style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {assignment.title}
                    </span>
                    <div style={{ fontSize: "14px" }}>
                      <span className="text-danger">{assignment.module}</span> |
                      <strong> Not available until</strong> {formatToReadableDate(assignment.available)} | <br />
                      <strong>Due</strong> {formatToReadableDate(assignment.due)} | {assignment.points} pts
                    </div>
                  </div>
                </div>
                
                <div className="ms-auto">
                  <AssignmentsButtons AssignmentId={assignment._id}
                  deleteAssignment={(AssignmentId) => removeAssignment(AssignmentId)}/>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

