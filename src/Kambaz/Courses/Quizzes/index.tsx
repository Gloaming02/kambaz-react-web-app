import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { RxTriangleDown } from "react-icons/rx";
import { IoRocketOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import QuizControlButton from './QuizControlButton';
import QuizzesButtons from './QuizzesButtons';
import * as quizzesClient from "./client";

export default function Quizzes() {
  const { cid } = useParams(); 
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isStudent = currentUser?.role === "STUDENT";
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (!cid) return;
    const data = await quizzesClient.findQuizzesForCourse(cid);  
    setQuizzes(data); 
  };
  

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const getAvailabilityStatus = (available: string, until: string) => {
    const now = new Date();
    const start = new Date(available);
    const end = new Date(until);
    if (now < start) return `Not available until ${formatDate(start)}`;
    if (now >= start && now <= end) return "Available";
    return "Closed";
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHour = hours % 12 || 12;
    return `${month} ${day} at ${displayHour}:${minutes}${ampm}`;
  };

  return (
    <div id="wd-quizzes" className="container">
      <QuizControlButton />
      <br />
      <ListGroup className="rounded-0" id="wd-quizzes-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <RxTriangleDown className="me-2 fs-5" />
            <span className="flex-grow-1">Assignment Quizzes</span>
          </div>

          {quizzes.length === 0 ? (
            <div className="p-3 text-center text-muted">
              {isStudent ? (
                <>No quizzes yet.</>
              ) : (
                <>No quizzes yet. Click the <strong>+ Quiz</strong> button to create one!</>
              )}
            </div>
          ) : (
            <ListGroup className="wd-lessons rounded-0">
              {quizzes
                .filter((quiz: any) => !isStudent || quiz.published)
                .map((quiz: any) => (
                <ListGroup.Item
                  key={quiz._id}
                  className="wd-lesson p-3 ps-1 d-flex align-items-center"
                >
                  <div
                    className="clickable-area d-flex align-items-center flex-grow-1"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        isStudent
                          ? `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/preview`
                          : `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`
                      )
                    }
                  >
                    <IoRocketOutline className="ms-3 me-3 fs-3" style={{ color: "green" }} />
                    <div className="d-flex flex-column">
                      <span
                        className="wd-assignment-link"
                        style={{ fontWeight: "bold", fontSize: "18px" }}
                      >
                        {quiz.title}
                      </span>
                      <div style={{ fontSize: "14px" }}>
                        {getAvailabilityStatus(quiz.availableDate, quiz.untilDate)} |{" "}
                        <strong>Due</strong> {formatDate(quiz.dueDate)} | {quiz.points} pts |{" "}
                        {quiz.questions?.length ?? 0} Questions
                        {isStudent && quiz.score !== undefined && (
                          <> | <strong>Score</strong>: {quiz.score}%</>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="ms-auto">
                  {!isStudent && (
                    <QuizzesButtons
                      isPublished={quiz.published}
                      onEdit={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
                      onDelete={async () => {
                        if (window.confirm("Are you sure you want to delete this quiz?")) {
                          await quizzesClient.deleteQuiz(quiz._id);
                          setQuizzes(quizzes.filter((q) => q._id !== quiz._id));
                        }
                      }}
                      onPublish={async () => {
                        const updatedQuiz = { ...quiz, published: !quiz.published };
                        await quizzesClient.updateQuiz(quiz._id, updatedQuiz);
                        setQuizzes(
                          quizzes.map((q) => (q._id === quiz._id ? updatedQuiz : q))
                        );
                      }}
                    />
                  )}

                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
