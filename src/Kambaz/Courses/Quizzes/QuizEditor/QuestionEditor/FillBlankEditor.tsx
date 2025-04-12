import { Form, Button, Row, Col } from "react-bootstrap";

export default function FillBlankEditor({ question, onChange }: any) {
  const blanks = question.blanks || [];

  const updateBlank = (index: number, value: string) => {
    const updated = [...blanks];
    updated[index] = value;
    onChange("blanks", updated);
  };

  return (
    <Form.Group className="mb-2">
      <Form.Label><strong>Correct Answers</strong></Form.Label>
      {blanks.map((blank: string, i: number) => (
        <Row key={i} className="d-flex align-items-center mb-2">
          <Col xs={3} className="text-end pe-0">
          <Form.Label className="mb-0">Possible Answer:</Form.Label>
          </Col>
          <Col md={7}>
            <Form.Control
              value={blank}
              onChange={(e) => updateBlank(i, e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                const updated = blanks.filter((_: any, idx: number) => idx !== i);
                onChange("blanks", updated);
              }}
            >
              ✕
            </Button>
          </Col>
        </Row>
      ))}

      <Row>
        <Col className="text-end">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => onChange("blanks", [...blanks, ""])}
          >
            + Add Answer
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
}
