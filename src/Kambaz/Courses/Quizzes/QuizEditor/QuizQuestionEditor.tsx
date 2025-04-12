import { useState, useEffect } from "react";
import * as client from "../client";
import { ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import MultipleChoiceEditor from "./QuestionEditor/MultipleChoiceEditor";
import TrueFalseEditor from "./QuestionEditor/TrueFalseEditor";
import FillBlankEditor from "./QuestionEditor/FillBlankEditor";

export function QuizQuestionEditor({
  quizId,
  refreshPoints,
}: {
  quizId?: string;
  refreshPoints: () => Promise<void>;
}) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const nextTitle = `Question ${questions.length + 1}`;

  const fetchQuestions = async () => {
    if (!quizId) return;
    const data = await client.findQuestionsForQuiz(quizId);
    setQuestions(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const handleAddQuestion = async () => {
    if (!quizId) return;

    const newQuestion = {
      quiz: quizId,
      type: "MULTIPLE_CHOICE",
      title: nextTitle,
      question: "Sample Question",
      points: 5,
      choices: [
        { text: "Choice A"},
        { text: "Choice B" },
        { text: "Choice C"},
        { text: "Choice D" },
      ],
      correctAnswer: "Choice A",
    };

    try {
      await client.addQuestionToQuiz(quizId, newQuestion);
      await fetchQuestions();
      await refreshPoints();
      setEditingIndex(questions.length); 
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const handleSaveQuestion = async (index: number) => {
    const q = questions[index];
    await client.updateQuestion(q._id, q);
    setEditingIndex(null);
    await fetchQuestions();
    await refreshPoints();
  };

  const handleDeleteQuestion = async (index: number) => {
    const q = questions[index];
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await client.deleteQuestion(q._id);
      await fetchQuestions();
      await refreshPoints();
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    fetchQuestions();
  };

  // const handleFieldChange = (index: number, field: string, value: any) => {
  //   const updated = [...questions];
  //   updated[index] = { ...updated[index], [field]: value };
  //   setQuestions(updated);
  // };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
  
    console.log("🟡 handleFieldChange", { index, field, value });
    if (field === "choices") {
      console.log("🟡 New choices:", value);
    }
  
    setQuestions(updated);
  };

  
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions ({questions.length})</h5>
        <Button variant="outline-danger" onClick={handleAddQuestion}>
          + New Question
        </Button>
      </div>
      <ListGroup>
        {questions.map((q, index) => (
          <ListGroup.Item key={q._id || index} className="mb-4 p-3 rounded border shadow-sm">
            {editingIndex === index ? (
              <Form>
              <Row className="mb-3 align-items-end">
              <Col md={4}>
                <Form.Group>
                  <Form.Label><strong>Question Title</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={q.title}
                    onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label><strong>Question Type</strong></Form.Label>
                  <Form.Select
                    value={q.type}
                    onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True/False</option>
                    <option value="FILL_BLANK">Fill in the Blank</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <div className="ms-auto" style={{ width: "100px" }}>
                <Form.Group>
                  <Form.Label><strong>pts:</strong></Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={q.points}
                    onChange={(e) =>
                      handleFieldChange(index, "points", Number(e.target.value))
                    }
                  />
                </Form.Group>
              </div>
            </Row>


              <Form.Group className="mb-2">
                <Form.Label><strong>Question:</strong></Form.Label>
                <Form.Control
                  as="textarea" 
                  rows={4}
                  value={q.question}
                  onChange={(e) => handleFieldChange(index, "question", e.target.value)}
                />
              </Form.Group>


              {q.type === "MULTIPLE_CHOICE" && (
                <MultipleChoiceEditor
                  question={q}
                  onChange={(field: string, value: any) =>
                    handleFieldChange(index, field, value)
                  }
                />
              )}
              {q.type === "TRUE_FALSE" && (
                <TrueFalseEditor
                  question={q}
                  onChange={(field: string, value: any) =>
                    handleFieldChange(index, field, value)
                  }
                />
              )}
              {q.type === "FILL_BLANK" && (
                <FillBlankEditor
                  question={q}
                  onChange={(field: string, value: any) =>
                    handleFieldChange(index, field, value)
                  }
                />
              )}

              <div className="d-flex gap-2">
                <Button size="sm" variant="outline-danger" onClick={() => handleSaveQuestion(index)}>
                  Save
                </Button>
                <Button size="sm" variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>

            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{q.title}</strong>
                  <div>{q.question}</div>
                  <div className="text-muted">
                    {q.type} | {q.points} pts
                  </div>
                </div>
                <div className="d-flex gap-2">
                <Button size="sm" variant="outline-primary" onClick={() => setEditingIndex(index)}>
                  Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
