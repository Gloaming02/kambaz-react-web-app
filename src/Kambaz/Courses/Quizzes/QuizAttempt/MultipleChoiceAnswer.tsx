import { Form } from "react-bootstrap";

interface MultipleChoiceAnswerProps {
  question: any;
  answer: string;
  onAnswer: (value: string) => void;
}

export default function MultipleChoiceAnswer({ question, answer, onAnswer }: MultipleChoiceAnswerProps) {
  return (
    <Form.Group>
      <div dangerouslySetInnerHTML={{ __html: question.question }} className="mb-3" />
      {question.choices?.map((choice: any, index: number) => (
        <Form.Check
          key={index}
          type="radio"
          name={`question-${question._id}`}
          label={choice.text}
          checked={answer === choice.text}
          onChange={() => onAnswer(choice.text)}
        />
      ))}
    </Form.Group>
  );
}
