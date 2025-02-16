import Select from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import * as db from "../../Database"; 
import { useParams, Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const assignment = db.assignments.find((a) => a._id === aid); // 通过 aid 找到作业

  if (!assignment) {
    return <h3 className="text-danger">Assignment Not Found</h3>;
  }

  const [selectedOptions, setSelectedOptions] = useState([{ value: 'everyone', label: 'Everyone' }]);
  const options = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'group1', label: 'Group 1' },
    { value: 'group2', label: 'Group 2' },
    { value: 'individual', label: 'Individual' }
  ];
  const handleChange = (selected: any) => {
    setSelectedOptions(selected || []); 
  };
  
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group controlId="wd-name" className="mb-4">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={10} defaultValue={assignment.description} />
        </Form.Group>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Points</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control type="text" defaultValue={assignment.points} />
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Assignment Group</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control as="select" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="EXAM">EXAM</option>
            </Form.Control>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Display Grade as</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control as="select" defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
            </Form.Control>
          </Col>
        </Row>

        <Row className="mb-4 align-items-start">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Submission Type</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Group className="p-3 mb-3 border rounded">
              <Form.Control as="select" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="INPERSON">In-Person</option>
              </Form.Control>
              <Form.Group className="mb-3 mt-3">
                <Form.Label className="mb-3">
                  <strong>Online Entry Options</strong>
                </Form.Label>
                <Form.Check type="checkbox" label="Text Entry" className="mb-3" />
                <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-3" />
                <Form.Check type="checkbox" label="Media Recordings" className="mb-3" />
                <Form.Check type="checkbox" label="Student Annotation" className="mb-3" />
                <Form.Check type="checkbox" label="File Uploads" className="mb-3" />
              </Form.Group>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4 align-items-start">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Assign</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Group className="p-3 mb-3 border rounded">
              <Form.Group className="mb-3">
                <Form.Label className="mb-3">
                  <strong>Assign to</strong>
                </Form.Label>
                <Select isMulti value={selectedOptions} onChange={handleChange} options={options} placeholder="Select..." classNamePrefix="react-select" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Due</strong>
                </Form.Label>
                <Form.Control type="text" defaultValue={assignment.due} />
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>
                    <strong>Available from</strong>
                  </Form.Label>
                  <Form.Control type="text" defaultValue={assignment.available} />
                </Col>
                <Col md={6}>
                  <Form.Label>
                    <strong>Until</strong>
                  </Form.Label>
                  <Form.Control type="text" defaultValue={assignment.due} />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <div className="d-flex justify-content-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`} className="me-2">
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}