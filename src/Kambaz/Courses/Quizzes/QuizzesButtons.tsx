
import { Dropdown } from "react-bootstrap";
import { FaCheckCircle, FaCircle, FaBan } from "react-icons/fa"; 
import { IoEllipsisVertical } from "react-icons/io5";
import './style.css';

export default function QuizzesButtons({
  onEdit = () => {},
  onDelete = () => {},
  onPublish = () => {},
  isPublished = false,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  onPublish?: () => void;
  isPublished?: boolean;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      <span className="me-2 position-relative">
      {isPublished ? (
          <FaCheckCircle
            style={{ top: '2px' }}
            className="text-success position-absolute fs-5"
          />
        ) : (
          <FaBan
            style={{ top: '2px' }}
            className="text-danger position-absolute fs-5"
          />
        )}
        <FaCircle className="text-white fs-6" />
      </span>

      <Dropdown align="end">
        <Dropdown.Toggle
          as="div" 
          style={{ cursor: "pointer" }}
          className="bg-transparent border-0 p-0"
          id="dropdown-custom-toggle"
        >
        <IoEllipsisVertical className="fs-4 text-dark" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onEdit}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
          <Dropdown.Item onClick={onPublish}>
            {isPublished ? "Unpublish" : "Publish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
