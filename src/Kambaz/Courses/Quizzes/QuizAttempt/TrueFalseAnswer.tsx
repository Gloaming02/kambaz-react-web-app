import { Form } from "react-bootstrap";

interface TrueFalseAnswerProps {
  question: any;
  answer: string;
  onAnswer: (value: string) => void;
}

export default function TrueFalseAnswer({ question, answer, onAnswer }: TrueFalseAnswerProps) {
  return (
    <Form.Group>
      <div dangerouslySetInnerHTML={{ __html: question.question }} className="mb-3" />
      {["True", "False"].map((val) => (
        <Form.Check
          key={val}
          type="radio"
          label={val}
          name={`question-${question._id}`}
          checked={answer === val}
          onChange={() => onAnswer(val)}
        />
      ))}
    </Form.Group>
  );
}
