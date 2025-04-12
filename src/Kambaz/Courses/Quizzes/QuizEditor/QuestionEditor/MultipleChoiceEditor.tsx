import { Form, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

export default function MultipleChoiceEditor({ question, onChange }: any) {
  const choices = question.choices || [];

  const handleCorrectChange = (index: number) => {
    onChange("correctAnswer", choices[index].text);
  };

  const handleChoiceTextChange = (index: number, value: string) => {
    const updated = choices.map((c: any, i: number) =>
      i === index ? { ...c, text: value } : c
    );

    // 如果当前选中的是正确答案，则更新 correctAnswer 的值
    if (choices[index].text === question.correctAnswer) {
      onChange("correctAnswer", value);
    }

    onChange("choices", updated);
  };

  const handleDeleteChoice = (index: number) => {
    const deletedText = choices[index].text;
    const updated = choices.filter((_: any, i: number) => i !== index);

    // 如果删除的是当前正确答案，fallback 到第一个
    if (deletedText === question.correctAnswer && updated.length > 0) {
      onChange("correctAnswer", updated[0].text);
    }

    onChange("choices", updated);
  };

  const handleAddChoice = () => {
    const newChoice = { text: `Choice ${choices.length + 1}` };
    onChange("choices", [...choices, newChoice]);
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label><strong>Choices</strong></Form.Label>
      {choices.map((choice: any, i: number) => (
        <div
          key={i}
          className="d-flex align-items-center gap-2 mb-2"
          style={{ maxWidth: "400px", marginLeft: "1rem" }}
        >
          <Form.Check
            type="radio"
            name={`correctChoice-${question._id || "new"}`}
            checked={choice.text === question.correctAnswer}
            onChange={() => handleCorrectChange(i)}
          />
          <Form.Control
            style={{ width: "300px", flexShrink: 0 }}
            value={choice.text}
            onChange={(e) => handleChoiceTextChange(i, e.target.value)}
          />
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeleteChoice(i)}
            disabled={choices.length <= 1}
          >
            <MdDelete style={{ fontSize: "1.25rem" }} />
          </Button>
        </div>
      ))}
      <Button
        size="sm"
        variant="outline-primary"
        className="mt-2"
        onClick={handleAddChoice}
      >
        + Add Choice
      </Button>
    </Form.Group>
  );
}
