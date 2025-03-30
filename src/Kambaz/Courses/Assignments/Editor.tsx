import Select from 'react-select';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useParams, useNavigate} from "react-router-dom";

import { useSelector } from 'react-redux';
// import { addAssignment, updateAssignment } from "./reducer"; 

import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); 
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";  
  const isStudent = currentUser.role === "STUDENT";  

  const isNew = aid === "new";

  const existingAssignment = useSelector((state: any) =>
    state.assignmentsReducer.assignments.find((a: any) => a._id === aid)
  );
  const [assignment, setAssignment] = useState(existingAssignment || {
    title: "",
    description: "",
    points: "",
    due: "",
    available: "",
    until: "",
    course: cid,
    module: "",
  });


  const [selectedOptions, setSelectedOptions] = useState([{ value: 'everyone', label: 'Everyone' }]);
  const options = [
    { value: 'everyone', label: 'Everyone' },
    { value: 'group1', label: 'Group 1' },
    { value: 'group2', label: 'Group 2' },
    { value: 'individual', label: 'Individual' }
  ];
  const handleChange = (e: any) => {
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  };
  
  const handleSelectChange  = (selected: any) => {
    setSelectedOptions(selected || []); 
  };

  const handleSave = async () => {
    if (isNew) {
      await coursesClient.createAssignmentForCourse (cid!, assignment);
    } else {
      await assignmentsClient.updateAssignment({ _id: aid, ...assignment });
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group controlId="wd-name" className="mb-4">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" name="title" value={assignment.title} 
          onChange={handleChange} disabled={isStudent}/>
        </Form.Group>

        <Form.Group controlId="wd-description" className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={10} name="description" value={assignment.description } 
          onChange={handleChange} disabled={isStudent}/>
        </Form.Group>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Points</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control type="number" name="points" 
            value={assignment.points} onChange={handleChange} disabled={isStudent}/>
          </Col>
        </Row>

        <Row className="mb-4 align-items-center">
          <Col xs={4} className="text-end pe-0">
            <Form.Label className="mb-0">Assignment Group</Form.Label>
          </Col>
          <Col xs={8}>
            <Form.Control as="select" defaultValue="ASSIGNMENTS" disabled={isStudent}>
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
            <Form.Control as="select" defaultValue="PERCENTAGE" disabled={isStudent}>
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
              <Form.Control as="select" defaultValue="ONLINE" disabled={isStudent}>
                <option value="ONLINE">Online</option>
                <option value="INPERSON">In-Person</option>
              </Form.Control>
              <Form.Group className="mb-3 mt-3">
                <Form.Label className="mb-3" >
                  <strong>Online Entry Options</strong>
                </Form.Label>
                <Form.Check type="checkbox" label="Text Entry" className="mb-3" disabled={isStudent}/>
                <Form.Check type="checkbox" label="Website URL" defaultChecked className="mb-3" disabled={isStudent}/>
                <Form.Check type="checkbox" label="Media Recordings" className="mb-3" disabled={isStudent}/>
                <Form.Check type="checkbox" label="Student Annotation" className="mb-3" disabled={isStudent}/>
                <Form.Check type="checkbox" label="File Uploads" className="mb-3" disabled={isStudent}/>
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
                <Select isMulti value={selectedOptions} onChange={handleSelectChange } 
                  options={options} placeholder="Select..." classNamePrefix="react-select" isDisabled={isStudent}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <strong>Due</strong>
                </Form.Label>
                <Form.Control type="date" name="due" value={assignment.due} onChange={handleChange} disabled={isStudent}/>
              </Form.Group>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>
                    <strong>Available from</strong>
                  </Form.Label>
                  <Form.Control type="date" name="available" value={assignment.available} onChange={handleChange} disabled={isStudent}/>
                </Col>
                <Col md={6}>
                  <Form.Label>
                    <strong>Until</strong>
                  </Form.Label>
                  <Form.Control type="date" name="until" value={assignment.until} onChange={handleChange} disabled={isStudent}/>
                </Col>
              </Row>
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-end">
        {isStudent && (
          <Button variant="secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
            Back
          </Button>
        )}

        {isFaculty && (
          <>
            <Button variant="secondary" className="me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </>
        )}
      </div>

      </Form>
    </div>
  );
}