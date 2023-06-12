import { useState } from "react";

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Login from "../../Component/Login";
import Register_ from "../../Component/Register";

const Rl = () => {
  const [value, setvalue] = useState(2);
  const [Register, setregister] = useState("");

  const nav = useNavigate();

  const [id, setid] = useState("");
  const [file, setFile] = useState(null);

  const [Name, setname] = useState("");
  const [Email, setemail] = useState("");
  const [course, setcourse] = useState("python3");
  const [qualification, setqualification] = useState("");
  const [phone, setphone] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  if (value === 1) {
    return (
      <>
        <div
          className="container-fluid  p-5 main_bg center  "
          style={{ position: "fixed", overflow: "auto", height: "100%" }}
        >
          <br />

          <Login />
        </div>
      </>
    );
  } else if (value === 2) {
    return (
      <>
        <div
          className="container-fluid main_bg p-5  center"
          style={{ position: "fixed", overflow: "auto", height: "100%" }}
        >
          <Register_ />
        </div>
      </>
    );
  } else {
    return <>{/* <Loading /> */}</>;
  }
};

export default Rl;
