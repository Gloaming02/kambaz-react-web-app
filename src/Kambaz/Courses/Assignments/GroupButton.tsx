import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import './Button.css';

export default function GroupButton() {
  return (
    <div className="float-end d-flex align-items-center">
    <div className="App">
      <button className="oval-button">40% of Total</button>
    </div>
      <BsPlus className="fs-2" />
      <IoEllipsisVertical className="fs-4" />
    </div> 
);}
    