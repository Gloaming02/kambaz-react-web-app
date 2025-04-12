import { Button } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux"; 

import * as client from "./client";

export default function QuizControlButton() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleCreateQuiz = async () => {
    if (!cid) return;
    const newQuiz = await client.createQuizForCourse(cid);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="input-group w-50">
        <span className="input-group-text d-flex align-items-center" style={{ height: '50px' }}>
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
          id="wd-search-quiz"
        />
      </div>

      {/*+ Quiz button*/}
      {currentUser?.role === "FACULTY" && (
        <div className="d-flex align-items-center">
          <Button
            variant="danger"
            size="lg"
            className="me-2"
            id="wd-add-quiz-btn"
            onClick={handleCreateQuiz}
          >
            <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
            Quiz
          </Button>
          <Button variant="light" size="lg" className="border">
            <IoEllipsisVertical className="fs-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
