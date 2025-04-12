import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import * as client from "../client";

export default function QuizDetailEditor() {
  const { cid, qid } = useParams();
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

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setQuiz({ ...quiz, [name]: val });
  };

  const handleSave = async () => {
    await client.updateQuiz(qid!, quiz);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz(qid!, { ...quiz, published: true });
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  
  const toInputDate = (dateValue: string | Date) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    return date.toISOString().split("T")[0]; 
  };

  return (
    <div className="p-4">
      <Form>
        <Form.Group className="mb-4">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Quiz Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={quiz.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Quiz Type</Form.Label>
          </Col>
          <Col xs={8}>
          <Form.Select name="quizType" value={quiz.quizType} onChange={handleChange}>
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Assignment Group</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Select
              name="assignmentGroup"
              value={quiz.assignmentGroup}
              onChange={handleChange}
            >
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Assignments">Assignments</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
        <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Allow Attempts</Form.Label>
        </Col>
        <Col xs={8}>
            <Form.Control
            type="number"
            name="maxAttempts"
            min={1}
            value={quiz.maxAttempts || 1}
            onChange={(e) =>
                setQuiz({ ...quiz, maxAttempts: Math.max(1, Number(e.target.value)) })
            }
            />
        </Col>
        </Row>


        <Row className="mb-1 align-items-center">
        <Col xs={4}>
        </Col>
          <Col xs={8}>
          <Form.Label className="mb-2"><strong>Options</strong></Form.Label>
          </Col>
        </Row>

        <Row className="mb-1 align-items-center">
          <Col xs={4}>
          </Col>
          <Col xs={8}>
            <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            name="shuffleAnswers"
            checked={quiz.shuffleAnswers}
            onChange={handleChange}
            className="mb-2"
            />
          </Col>
        </Row>

        <Row className="mb-2 align-items-center">
          <Col xs={4}>
          </Col>
          <Col xs={8}>
            <Row className="mb-1 align-items-center">
            <Col xs={3}>
            <Form.Check
                type="checkbox"
                label="Time Limit"
                name="hasTimeLimit"
                checked={!!quiz.timeLimit}
                onChange={(e) => {
                    setQuiz({ ...quiz, timeLimit: e.target.checked ? 20 : 0 });
                }}
                />
            </Col>
            <Col xs={3}>
            <Form.Control
                type="number"
                min={0}
                value={quiz.timeLimit || ""}
                onChange={(e) =>
                setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
                }
                disabled={!quiz.timeLimit}
            />
            </Col>
            <Col xs={6}>Minutes</Col>
            </Row>
          </Col>
        </Row>


        <Row className="mb-2 align-items-center">
        <Col xs={4} className="text-end pe-0">
        </Col>
        <Col xs={8}>
            <Form.Check
            type="checkbox"
            label="One Question at a Time"
            name="oneQuestionAtATime"
            checked={quiz.oneQuestionAtATime}
            onChange={handleChange}
            className="mb-2"
            />
        </Col>
        </Row>

        <Row className="mb-2 align-items-center">
        <Col xs={4} className="text-end pe-0">
        </Col>
        <Col xs={8}>
            <Form.Check
            type="checkbox"
            label="Webcam Required"
            name="webcamRequired"
            checked={quiz.webcamRequired}
            onChange={handleChange}
            className="mb-2"
            />
        </Col>
        </Row>

        <Row className="mb-2 align-items-center">
        <Col xs={4} className="text-end pe-0">
        </Col>
        <Col xs={8}>
            <Form.Check
            type="checkbox"
            label="Lock Questions After Answering"
            name="lockQuestionsAfterAnswering"
            checked={quiz.lockQuestionsAfterAnswering}
            onChange={handleChange}
            className="mb-2"
            />
        </Col>
        </Row>


        <Row className="mb-4 align-items-center">
        <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Show Correct Answers</Form.Label>
        </Col>
        <Col xs={8}>
            <Form.Select
            name="showCorrectAnswers"
            value={quiz.showCorrectAnswers}
            onChange={handleChange}
            >
            <option value="Immediately">Immediately</option>
            <option value="After Due Date">After Due Date</option>
            <option value="Never">Never</option>
            </Form.Select>
        </Col>
        </Row>

        <Row className="mb-4 align-items-center">
        <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Access Code</Form.Label>
        </Col>
        <Col xs={8}>
            <Form.Control
            type="text"
            name="accessCode"
            value={quiz.accessCode}
            onChange={handleChange}
            placeholder="Leave blank for no access code"
            />
        </Col>
        </Row>

        <Row className="mb-4 align-items-start">
        <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Time </Form.Label>
        </Col>
        <Col xs={8}>
            <Form.Group className="p-3 mb-3 border rounded">
            <Form.Group className="mb-3">
                <Form.Label>
                <strong>Due</strong>
                </Form.Label>
                <Form.Control
                type="date"
                name="dueDate"
                value={toInputDate(quiz.dueDate)}
                onChange={handleChange}
                />
            </Form.Group>
            <Row className="mb-3">
                <Col md={6}>
                <Form.Label>
                    <strong>Available from</strong>
                </Form.Label>
                <Form.Control
                    type="date"
                    name="availableDate"
                    value={toInputDate(quiz.availableDate)}
                    onChange={handleChange}
                />
                </Col>
                <Col md={6}>
                <Form.Label>
                    <strong>Until</strong>
                </Form.Label>
                <Form.Control
                    type="date"
                    name="untilDate"
                    value={toInputDate(quiz.untilDate)}
                    onChange={handleChange}
                />
                </Col>
            </Row>
            </Form.Group>
        </Col>
        </Row>



        <Row className="my-4">
          <Col>
            <Button variant="secondary" onClick={handleCancel} className="me-2">
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave} className="me-2">
              Save
            </Button>
            <Button variant="success" onClick={handleSaveAndPublish}>
              Save & Publish
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}