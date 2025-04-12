import { Card, Form } from "react-bootstrap";

interface AttemptDetailsProps {
  attempt: any;
  questions: any[];
}

export default function QuizAttemptDetails({ attempt, questions }: AttemptDetailsProps) {
  return (
    <div className="mt-5">
      <h5>Attempt {attempt.attemptNumber} Answers</h5>
      {attempt.answers.map((ans: any, idx: number) => {
        const question = questions.find((q: any) => q._id === ans.question);
        const isCorrect = ans.correct;

        return (
          <Card key={idx} className="mb-4 border">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>{question.title}</strong>
              <span>
                {isCorrect ? `${question?.points || 0} / ${question?.points || 0} pts` : `0 / ${question?.points || 0} pts`}
            </span>
            </Card.Header>
            <Card.Body>
              <div dangerouslySetInnerHTML={{ __html: question?.question }} className="mb-3" />

              {question?.type === "TRUE_FALSE" ? (
                <Form.Group>
                  {["True", "False"].map((option) => (
                    <div key={option} className="d-flex align-items-center mb-1">
                      <Form.Check
                        type="radio"
                        label={option}
                        checked={String(ans.answer).toLowerCase() === option.toLowerCase()}
                        disabled
                        className="me-2"
                      />
                      {String(ans.answer).toLowerCase() === option.toLowerCase() &&
                        (isCorrect ? (
                          <span className="text-success fw-bold ms-2">Correct!</span>
                        ) : (
                          <span className="text-danger fw-bold ms-2">Incorrect!</span>
                        ))}
                    </div>
                  ))}
                </Form.Group>
              ) : question?.type === "MULTIPLE_CHOICE" ? (
                <Form.Group>
                  {question.choices?.map((choice: any, i: number) => {
                    const isChosen = ans.answer === choice.text;
                    return (
                      <div key={i} className="d-flex align-items-center mb-1">
                        <Form.Check
                          type="radio"
                          label={choice.text}
                          checked={isChosen}
                          disabled
                          className="me-2"
                        />
                        {isChosen &&
                          (isCorrect ? (
                            <span className="text-success fw-bold ms-2">Correct!</span>
                          ) : (
                            <span className="text-danger fw-bold ms-2">Incorrect!</span>
                          ))}
                      </div>
                    );
                  })}
                </Form.Group>
              ) : question?.type === "FILL_BLANK" ? (
                <div>
                  <Form.Control
                    value={ans.answer}
                    readOnly
                    className={`mb-2 ${isCorrect ? "border-success" : "border-danger"}`}
                  />
                  <div className={isCorrect ? "text-success" : "text-danger"}>
                    {isCorrect
                      ? "Correct!"
                      : `Incorrect!`}
                  </div>
                </div>
              ) : (
                <div>Unsupported question type</div>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
