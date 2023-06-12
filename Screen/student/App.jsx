import { Route, Routes } from "react-router-dom";
import Next from "./compiler";

import Rl from "./Rl";
import Task from "./task";
import Home from "./Home";
import StudentHome from "../../Component/studenthome";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login_or_regisrtation" element={<Rl />} />
        <Route path="/task" element={<Task />} />
        <Route path="/compiler" element={<Next />} />
      </Routes>
    </>
  );
};
export default App;
