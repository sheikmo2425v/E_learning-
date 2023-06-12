import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./Screen/student/App";
import "./Style/style.css";
import Adin from "./Screen/Admin/navi";
const Main = () => {
  return (
    <>
      <BrowserRouter>
        <App />
        <Adin />
      </BrowserRouter>
    </>
  );
};

export default Main;
