import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "../client";

import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import TrueFalseAnswer from "./TrueFalseAnswer";
import FillBlankAnswer from "./FillBlankAnswer";
import { useLocation } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

export default function StudentQuizAttempt() {
  const location = useLocation();
  const attemptNumber = location.state?.attemptNumber || 1;

  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadQuizWithQuestions = async () => {
      if (!qid) return;
      const quizData = await client.findQuizById(qid);
      const questionList = await client.findQuestionsForQuiz(qid);
      quizData.questions = questionList;
      setQuiz(quizData);
    };
    loadQuizWithQuestions();
  }, [qid]);

  const handleChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    if (!currentUser || !qid) return;
    const submittedAt = new Date().toISOString();
    let score = 0;

    const answerList = quiz.questions.map((q: any) => {
      const given = answers[q._id];
      let correct = false;

      if (q.type === "FILL_BLANK") {
        correct = q.blanks?.some((b: string) =>
          b.toLowerCase().trim() === given?.toLowerCase().trim()
        );
      } else if (q.type === "TRUE_FALSE") {
        correct = String(q.correctAnswer).toLowerCase() === String(given).toLowerCase();
      } else {
        correct = given === q.correctAnswer;
      }
      if (correct) score += q.points || 0;
      return {
        question: q._id,
        answer: given,
        correct,
      };
    });

    const attempt = {
      quiz: qid,
      user: currentUser._id,
      attemptNumber,
      submittedAt,
      score,
      answers: answerList,
    };

    await client.createQuizAttempt(attempt);
    setSubmitted(true);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div className="p-4 text-danger">This quiz has no questions yet.</div>;
  }
  const question = quiz.questions[current];

  
  const renderAnswerComponent = () => {
    switch (question.type) {
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceAnswer
            question={question}
            answer={answers[question._id] || ""}
            onAnswer={(val: string) => handleChange(question._id, val)}
          />
        );
      case "TRUE_FALSE":
        return (
          <TrueFalseAnswer
            question={question}
            answer={answers[question._id] || ""}
            onAnswer={(val: string) => handleChange(question._id, val)}
          />
        );
      case "FILL_BLANK":
        return (
          <FillBlankAnswer
            question={question}
            answer={answers[question._id] || ""}
            onAnswer={(val: string) => handleChange(question._id, val)}
          />
        );
      default:
        return <div>Unsupported question type.</div>;
    }
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1 p-4">
        <h3 className="mb-1">{quiz.title}</h3>
        <h4 className="mt-4 mb-3">Instructions</h4>
        <p>{quiz.description || "No instructions provided."}</p>

        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between">
            <div><strong>{question.title}</strong></div>
            <div>{question.points || 0} pts</div>
          </Card.Header>
          <Card.Body>
            {renderAnswerComponent()}
          </Card.Body>
        </Card>

        {!submitted ? (
          <>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Button
                variant="outline-secondary"
                disabled={current === 0}
                onClick={() => setCurrent(current - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline-secondary"
                disabled={current === quiz.questions.length - 1}
                onClick={() => setCurrent(current + 1)}
              >
                Next
              </Button>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" onClick={handleSubmit}>
                Submit Quiz
              </Button>
            </div>
          </>
        ) : (
          <div className="text-success fw-bold mt-3">Submitted!</div>
        )}
      </div>

      <div className="border-start p-3" style={{ width: "200px" }}>
        <h6 className="mb-3">Questions</h6>
        <ListGroup>
          {quiz.questions.map((q: any, idx: number) => (
            <ListGroup.Item
              key={q._id}
              active={idx === current}
              onClick={() => setCurrent(idx)}
              style={{ cursor: "pointer" }}
            >
              Question {idx + 1}
            </ListGroup.Item>
          ))}
        </ListGroup>
        {currentUser?.role === "FACULTY" && (
          <div className="mt-4">
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor/questions`)}
            >
            <FaRegEdit className="me-2" />
            Keep Editing This Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
