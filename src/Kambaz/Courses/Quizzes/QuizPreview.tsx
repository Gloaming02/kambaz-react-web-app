import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as client from "./client";
import AttemptDetails from "./QuizAttemptDetails"; 

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [selectedAttempt, setSelectedAttempt] = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (qid) {
        const data = await client.findQuestionsForQuiz(qid);
        setQuestions(data);
      }
    };
    const fetchQuiz = async () => {
      if (qid) {
        const data = await client.findQuizById(qid);
        setQuiz(data);
      }
    };
    const fetchAttempts = async () => {
      if (!qid) return;
      const data = await client.findAttemptsByUserAndQuiz(currentUser._id, qid);
      const sorted = data.sort((a: any, b: any) => b.attemptNumber - a.attemptNumber);
      setAttempts(sorted);
      setSelectedAttempt(sorted[0]); // 默认展示最新一次
    };
    fetchQuestions();
    fetchQuiz();
    fetchAttempts();
  }, [qid, currentUser]);

  const handleDeleteAttempt = async (attemptId: string) => {
    if (window.confirm("Are you sure you want to delete this attempt?")) {
      await client.deleteQuizAttempt(attemptId);
      const updated = attempts.filter((a) => a._id !== attemptId);
      setAttempts(updated);
      setSelectedAttempt(updated[0] || null);
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Unknown";
    const month = d.toLocaleString("default", { month: "short" });
    const day = d.getDate();
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const displayHour = hours % 12 || 12;
    return `${month} ${day} at ${displayHour}:${minutes}${ampm}`;
  };

  if (!quiz) return <div>Loading...</div>;

  const due = quiz.dueDate ? formatDate(quiz.dueDate) : "No due date";
  const timeLimit = quiz.timeLimit
    ? `${quiz.timeLimit} Minute${quiz.timeLimit > 1 ? "s" : ""}`
    : "No time limit";
  const remainingAttempts =
    currentUser?.role === "STUDENT" && quiz.maxAttempts != null
      ? quiz.maxAttempts - attempts.length
      : null;

  const nextAttemptNumber = attempts.length + 1;

  return (
    <div className="p-4">
      <h2 className="mb-4">{quiz.title}</h2>

      <Card className="mb-4 p-3">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="me-4"><strong>Due</strong> {due}</div>
          <div className="me-4"><strong>Questions</strong> {quiz.questions?.length || 0}</div>
          <div className="me-4"><strong>Points</strong> {quiz.points || 0}</div>
          <div className="me-4">
            <strong>Available</strong>{" "}
            {quiz.availableDate ? formatDate(quiz.availableDate) : "—"} to{" "}
            {quiz.untilDate ? formatDate(quiz.untilDate) : "—"}
          </div>
        </div>
        <div className="d-flex gap-5 mt-2">
          <div><strong>Time Limit</strong> {timeLimit}</div>
          <div><strong>Max Attempts</strong> {quiz.maxAttempts ?? "Unlimited"}</div>
        </div>
      </Card>

      <h4 className="mt-4 mb-3">Instructions</h4>
      <p>{quiz.description || "No instructions provided."}</p>

      {(currentUser?.role === "FACULTY" || (currentUser?.role === "STUDENT" && (remainingAttempts ?? 1) > 0)) && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            size="lg"
            variant="outline-danger"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/attempt`, {
                state: { attemptNumber: nextAttemptNumber }
              })
            }
          >
            Take the Quiz
          </Button>
        </div>
      )}

      {currentUser?.role === "STUDENT" && remainingAttempts === 0 && (
        <div className="text-center mt-4 text-danger">
          You have used all your attempts for this quiz.
        </div>
      )}

      {attempts.length > 0 && (
        <div className="mt-5">
          <h5>Attempt History</h5>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr>
                <th>Attempt</th>
                <th>Time</th>
                <th>Score</th>
                <th>View</th>
                {currentUser?.role === "FACULTY" && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {attempts.map((attempt: any) => (
                <tr key={attempt._id}>
                  <td className="text-danger">Attempt {attempt.attemptNumber}</td>
                  <td>{formatDate(attempt.submittedAt)}</td>
                  <td>{attempt.score}, Full Score {quiz.points}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => setSelectedAttempt(attempt)}
                    >
                      View
                    </Button>
                  </td>
                  {currentUser?.role === "FACULTY" && (
                    <td>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleDeleteAttempt(attempt._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {selectedAttempt && (
        <AttemptDetails attempt={selectedAttempt} questions={questions} />
      )}
    </div>
  );
}
