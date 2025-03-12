import { FaCheckCircle, FaCircle, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function AssignmentsButtons(
  { AssignmentId, deleteAssignment }: 
  { AssignmentId: string; deleteAssignment: (AssignmentId: string) => void; } ) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
  return (
    <div className="float-end">
    {currentUser.role === "FACULTY" && (
      <>
      <FaTrash className="text-danger me-2 mb-1" 
      onClick={() => deleteAssignment(AssignmentId)}/>
      </>
    )}
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "2px" }} className="text-success me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
    <IoEllipsisVertical className="fs-4" />
    </div>
    );
}
    