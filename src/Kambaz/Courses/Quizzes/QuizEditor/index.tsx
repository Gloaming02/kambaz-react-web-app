
import { useParams, NavLink, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Nav } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaBan, FaCheckCircle, FaCircle } from "react-icons/fa";
import * as client from "../client";
import QuizDetailEditor from "./QuizDetailEditor";
import { QuizQuestionEditor } from "./QuizQuestionEditor";
import { useNavigate } from "react-router-dom";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const location = useLocation();
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid) {
        const data = await client.findQuizById(qid);
        setQuiz(data);
      }
    };
    fetchQuiz();
  }, [qid]);
  

  if (!quiz) return <div>Loading...</div>;

  const activeTab = location.pathname.includes("questions") ? "Questions" : "Details";

  return (
    <div className="p-4">
      
      <div className="d-flex justify-content-between align-items-center mb-3">
      <Button
          variant="secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back
        </Button>
        <div className="ms-auto d-flex align-items-center gap-4">
          <div className="text-dark fs-5">
            Points <span className="text-dark">{quiz.points}</span>
          </div>
          <div className="position-relative d-flex align-items-center fs-5">
            <span className="me-2 position-relative" style={{ width: "20px", height: "20px" }}>
              <FaCircle
                className="text-white position-absolute"
                style={{ top: 0, left: 0, fontSize: "20px", zIndex: 1 }}
              />
              {quiz.published ? (
                <FaCheckCircle
                  className="text-success position-absolute"
                  style={{ top: 0, left: 0, fontSize: "20px", zIndex: 2 }}
                />
              ) : (
                <FaBan
                  className="text-danger position-absolute"
                  style={{ top: 0, left: 0, fontSize: "20px", zIndex: 2 }}
                />
              )}
            </span>
            <span className="text-secondary">
              {quiz.published ? "Published" : "Not Published"}
            </span>
          </div>
          <Button variant="light" size="lg" className="border">
            <IoEllipsisVertical className="fs-4" />
          </Button>
        </div>
      </div>

      <Nav variant="tabs" activeKey={activeTab}>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor/details`}
            className={`fs-5 ${activeTab === "Details" ? "text-dark" : "text-danger"}`}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor/questions`}
            className={`fs-5 ${activeTab === "Questions" ? "text-dark" : "text-danger"}`}
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="details" />} />
          <Route path="details" element={<QuizDetailEditor />} />
          <Route
            path="questions"
            element={
              <QuizQuestionEditor
                quizId={qid}
                refreshPoints={async () => {
                    if (qid) {
                        const updatedQuiz = await client.findQuizById(qid);
                        setQuiz(updatedQuiz);
                    }
                }}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
