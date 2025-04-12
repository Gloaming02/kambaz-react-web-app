import { Form } from "react-bootstrap";

interface FillBlankAnswerProps {
  question: any;
  answer: string;
  onAnswer: (value: string) => void;
}

export default function FillBlankAnswer({ question, answer, onAnswer }: FillBlankAnswerProps) {
  return (
    <Form.Group>
      <div dangerouslySetInnerHTML={{ __html: question.question }} className="mb-3" />
      <Form.Control
        placeholder="Your answer"
        value={answer}
        onChange={(e) => onAnswer(e.target.value)}
      />
    </Form.Group>
  );
}
