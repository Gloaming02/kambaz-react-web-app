import { Button } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa'; 
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentControlButton() {
  const navigate = useNavigate();
  const { cid } = useParams(); 
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group w-50">
          <div className="input-group-prepend">
            <span className="input-group-text d-flex align-items-center" style={{ height: '50px' }}>
              <FaSearch />
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            id="wd-search-assignment"
          />
        </div>
          {currentUser.role === "FACULTY" && (
            <>
            <div>
            <Button variant="secondary" size="lg" className="me-2" id="wd-add-module-btn">
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Group
            </Button>
            <Button variant="danger" size="lg" className="me-2" id="wd-add-module-btn"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
            >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment
            </Button>
            </div>
            </>
          )}
      </div>
  );
}
