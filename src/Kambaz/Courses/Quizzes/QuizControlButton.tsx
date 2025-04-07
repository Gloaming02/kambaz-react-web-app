import { Button } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { IoEllipsisVertical } from 'react-icons/io5';

export default function QuizControlButton() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* 左侧：搜索框 */}
      <div className="input-group w-50">
        <span className="input-group-text d-flex align-items-center" style={{ height: '50px' }}>
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
          id="wd-search-quiz"
        />
      </div>

      {/* 右侧：红色“+ Quiz”按钮 + 三点按钮 */}
      <div className="d-flex align-items-center">
        <Button variant="danger" size="lg" className="me-2" id="wd-add-quiz-btn">
          <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
          Quiz
        </Button>
        <Button variant="light" size="lg" className="border">
          <IoEllipsisVertical className="fs-4" />
        </Button>
      </div>
    </div>
  );
}
