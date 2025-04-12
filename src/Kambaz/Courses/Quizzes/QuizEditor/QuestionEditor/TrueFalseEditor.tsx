import { Form } from "react-bootstrap";

export default function TrueFalseEditor({ question, onChange }: any) {
  return (
    <Form.Group className="mb-2">
      <Form.Label>Correct Answer</Form.Label>
      <div className="d-flex gap-3">
        <Form.Check
          type="radio"
          label="True"
          checked={question.correctAnswer === true}
          onChange={() => onChange("correctAnswer", true)}
        />
        <Form.Check
          type="radio"
          label="False"
          checked={question.correctAnswer === false}
          onChange={() => onChange("correctAnswer", false)}
        />
      </div>
    </Form.Group>
  );
}
