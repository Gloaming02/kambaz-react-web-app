import { ListGroup } from 'react-bootstrap';
// import { BsGripVertical } from 'react-icons/bs';
import { RxTriangleDown } from 'react-icons/rx';
import { IoRocketOutline } from "react-icons/io5";

import QuizControlButton from './QuizControlButton';
import QuizzesButtons from './QuizzesButtons';
import quizzes from './quizzes.json';

export default function Quizzes() {
  // 这里先写死一些“测验”示例数据（纯 UI 示例）


  return (
    <div id="wd-quizzes" className="container">
      {/* 顶部：搜索 + 新建 Quiz 按钮 */}
      <QuizControlButton />
      <br />

      {/* 中间：Quizzes 列表区域 */}
      <ListGroup className="rounded-0" id="wd-quizzes-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          {/* 区块标题行 */}
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            {/* <BsGripVertical className="me-2 fs-3" /> */}
            <RxTriangleDown className="me-2 fs-5" />
            <span className="flex-grow-1">Assignment Quizzes</span>
          </div>

          {/* 列表项 */}
          <ListGroup className="wd-lessons rounded-0">
            {quizzes.map((quiz) => (
              <ListGroup.Item
                key={quiz.id}
                className="wd-lesson p-3 ps-1 d-flex align-items-center"
              >
                {/* 左侧可点击区域（标题、可用性、截止等） */}
                <div
                  className="clickable-area d-flex align-items-center flex-grow-1"
                  style={{ cursor: 'pointer' }}
                >
                  {/* <BsGripVertical className="me-4 fs-3" /> */}
                  <IoRocketOutline className="ms-3 me-3 fs-3" style={{ color: 'green' }} />
                  <div className="d-flex flex-column">
                    <span
                      className="wd-assignment-link"
                      style={{ fontWeight: 'bold', fontSize: '18px' }}
                    >
                      {quiz.title}
                    </span>
                    <div style={{ fontSize: '14px' }}>
                      <span className="text-danger">{quiz.availableDate}</span> |{' '}
                      <strong>Due</strong> {quiz.dueDate} | {quiz.points} pts |{' '}
                      {(quiz as any).questionsCount ?? 100} Questions
                    </div>
                  </div>
                </div>

                {/* 右侧上下文按钮 */}
                <div className="ms-auto">
                  <QuizzesButtons />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
