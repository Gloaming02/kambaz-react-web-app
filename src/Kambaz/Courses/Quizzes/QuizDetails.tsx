import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as client from "./client";  
import { useSelector } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);


  if (!currentUser) return <Navigate to="/Kambaz/Account/Signin" />;
  if (currentUser.role === "STUDENT") {
    return <Navigate to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`} />;
  }



  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  
  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid) {
        const data = await client.findQuizById(qid);
        setQuiz(data);
      }
    };
    fetchQuiz();
  }, [qid]);

  const formatDate = (value: string | Date) => {
    if (!value) return "";
    const date = new Date(value);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hour >= 12 ? "pm" : "am";
    const hour12 = hour % 12 || 12;
    return `${month} ${day} at ${hour12}:${minutes}${ampm}`;
  };

  if (!quiz) return <div>not quiz...</div>;

  return (
    <div id="wd-quiz-details" className="p-4">
        <Row className="mb-2 align-items-center">
        <Col xs={5} className="text-end pe-0">
            <h2></h2>
        </Col>
        <Col xs={7}>
            <Button
            variant="outline-secondary"
            className="me-2"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)}
            >
            Preview
            </Button>
            <Button
            variant="outline-secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)}
            >
            <CiEdit /> Edit
            </Button>
        </Col>
        </Row>


      <hr className="mt-4 mb-1" />

      <Form>
        <h2 className="mb-5"><strong>{quiz.title}</strong></h2>

        {[
          ["Quiz Type", quiz.quizType],
          ["Points", quiz.points],
          ["Assignment Group", quiz.assignmentGroup],
          ["Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No"],
          ["Time Limit", quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"],
          ["Multiple Attempts", (quiz.maxAttempts ?? 1) > 1 ? "Yes" : "No"],
          ["How Many Attempts", quiz.maxAttempts ?? 1],
          ["Show Correct Answers", quiz.showCorrectAnswers ?? "Never"],
          ["Access Code", quiz.accessCode || "-"],
          ["One Question at a Time", quiz.oneQuestionAtATime ? "Yes" : "No"],
          ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
          ["Lock Questions After Answering", quiz.lockQuestionsAfterAnswering ? "Yes" : "No"]
        ].map(([label, value], index) => (
          <Row className="mb-2 align-items-center" key={index}>
            <Col xs={5} className="text-end pe-0">
              <Form.Label className="mb-0"><strong>{label}</strong></Form.Label>
            </Col>
            <Col xs={7}>
              <Form.Label className="mb-0">{value}</Form.Label>
            </Col>
          </Row>
        ))}
        
        <div className="mt-5">
            <Row className="align-items-center text-center fw-semibold mb-1">
            <Col>Due</Col>
            <Col>Available from</Col>
            <Col>Until</Col>
            </Row>
            <hr className="my-1" />
            <Row className="align-items-center text-center mt-2 mb-5">
            <Col>{formatDate(quiz.dueDate)}</Col>
            <Col>{formatDate(quiz.availableDate)}</Col>
            <Col>{formatDate(quiz.untilDate)}</Col>
            </Row>
        </div>


        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
          >
            Back to List
          </Button>
        </div>
      </Form>
    </div>
  );
}
