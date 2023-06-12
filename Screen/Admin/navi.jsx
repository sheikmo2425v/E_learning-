import Admin from "./home";
import Question from "./question";
import Student from "./student";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Student_status from "./student_status";
import Daily_task from "./daily_task";
import StudentHome from "../../Component/studenthome";

const Adin = () => {
  return (
    <Routes>
      <Route path="/student" element={<Student />} />
      <Route path="/question" element={<Question />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/student_Status" element={<Student_status />} />
      <Route path="/daily_task" element={<Daily_task />} />
    </Routes>
  );
};

export default Adin;
