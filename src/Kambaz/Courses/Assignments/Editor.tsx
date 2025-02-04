import Select from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export default function AssignmentEditor() {
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
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={10} 
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n- Your full name and section\n- Links to each of the lab assignments\n- Link to the Kanbas application\n- Links to all relevant source code repositories\n\nThe Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0"> 
            <Form.Label className="mb-0">Points</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control type="text" defaultValue="100" />
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
              <Form.Control as="select" defaultValue="ONLINE" >
                <option value="ONLINE">Online</option>
                <option value="INPERSON">In-Person</option>
              </Form.Control>
              <Form.Group className="mb-3 mt-3">
                <Form.Label className="mb-3"><strong>Online Entry Options</strong></Form.Label>
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
                <Form.Label className="mb-3"><strong>Assign to</strong></Form.Label>
                <Select isMulti value={selectedOptions} onChange={handleChange}
                  options={options} placeholder="Select..." classNamePrefix="react-select"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label><strong>Due</strong></Form.Label>
                <Form.Control type="datetime-local" defaultValue="2024-05-13T23:59" />
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label><strong>Available from</strong></Form.Label>
                  <Form.Control type="datetime-local" defaultValue="2024-05-06T00:00" />
                </Col>
                <Col md={6}>
                  <Form.Label><strong>Until</strong></Form.Label>
                  <Form.Control type="datetime-local" defaultValue="2024-05-20T23:59" />
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}