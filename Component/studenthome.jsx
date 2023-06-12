import { useState } from "react";

import { Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Edit from "./studentedit";
import Main_compiler from "./compiler";
import Marks from "./Marks";
import Material from "./Material";
import LeaveLetter from "./Leavletter";
import Loading from "./Loading";
const StudentHome = () => {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const [sh0, setsh0] = useState(false);
  const Close = () => setShow(false);

  const [value, setvalue] = useState(0);

  const [Student_id, setstudent_id] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [course, setcourse] = useState("python3");

  useEffect(() => {
    if (localStorage.getItem("sid") !== null) {
      const value = { Register: localStorage.getItem("sid") };
      axios.post("http://127.0.0.1:5000/check2", value).then((Response) => {
        localStorage.setItem("sid", Response.data[0][0]);
        localStorage.setItem("name", Response.data[0][1]);
        localStorage.setItem("email", Response.data[0][3]);
        localStorage.setItem("phone", Response.data[0][2]);
        if (Response.data[0][4] === "edu0p") {
          localStorage.setItem("language", "python3");
        } else if (Response.data[0][4] === "edu1j") {
          localStorage.setItem("language", "java");
        } else if (Response.data[0][4] === "edu2c") {
          localStorage.setItem("language", "c");
        } else if (Response.data[0][4] === "edu3cp") {
          localStorage.setItem("language", "cpp");
        }
      });
    } else {
      setvalue(5);
    }
  }, []);

  const task = (e) => {
    if (e === 0) {
      nav("/task", { state: "easy" });
    } else if (e === 1) {
      nav("/task", { state: "intermediate" });
    }
    if (e === 2) {
      nav("/task", { state: "hard" });
    }
    if (e === 3) {
      nav("/task", { state: "daily_task" });
    }
  };
  if (localStorage.getItem("sid") !== null && value === 0) {
    var p = "./images/" + localStorage.getItem("sid") + ".jpg";

    return (
      <>
        <div
          className=" container-fluid main_bg style"
          style={{
            height: "100vh",
            position: "fixed",

            overflow: "auto",
          }}
        >
          <br />
          <div className="row border-0" style={{ height: "10vh" }}>
            <div className="col head " style={{ marginLeft: "30%" }}>
              <h2>Hi, {localStorage.getItem("name")} </h2>
            </div>

            <div className="col ">
              <img
                src={p}
                alt=" "
                className=" float-end bor "
                onClick={() => setsh0(!sh0)}
                style={{ width: "70px", height: "70px" }}
              />
              {sh0 && (
                <div
                  className=" btn-group"
                  style={{ height: "8vh", marginLeft: "30%" }}
                >
                  <button
                    className="btn btn-dark"
                    onClick={() => setShow(true)}
                  >
                    Profile
                  </button>
                  <button className="btn btn-dark " onClick={() => setvalue(2)}>
                    Marks
                  </button>
                  <button className="btn btn-dark " onClick={() => setvalue(3)}>
                    Leave letter
                  </button>
                  <button className="btn btn-dark " onClick={() => setvalue(4)}>
                    Material
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          <br />
          <div className="row ">
            <h6>Click below button to complete the Task</h6>
          </div>
          <br />

          <div className=" btn-group mybtn" style={{ width: "100%" }}>
            <button
              onClick={() => task(0)}
              className="btn mybtn  border border-dark"
            >
              <b> Easy Task</b>
            </button>

            <button
              onClick={() => task(1)}
              className="btn mybtn  border border-dark"
            >
              <b>Intermediate</b>
            </button>

            <button
              onClick={() => task(2)}
              className="btn mybtn  border border-dark"
            >
              <b>Hard</b>
            </button>

            <button
              onClick={() => task(3)}
              className="btn mybtn  border border-dark"
            >
              <b>Daily task</b>
            </button>
          </div>

          <br />
          <br />
          <Main_compiler />

          <Modal key={modalKey} show={show} onHide={Close} backdrop="false">
            <Modal.Body className="main_bg">
              <div>
                <div className="modal-header main_bg">
                  <img
                    style={{ width: "120px", height: "130px" }}
                    src={p}
                    alt=""
                    className="rounded-circle "
                  />
                  <h4 className="modal-title " style={{ marginRight: "50%  " }}>
                    <b>Profile</b>
                  </h4>
                </div>

                <div className="modal-body  bor ">
                  <div className="card-body ">
                    <h4 className="card-title">
                      <i>Register Id: {localStorage.getItem("sid")}</i>
                    </h4>
                    <br />
                    <h4 className="card-title">
                      <i>Name: {localStorage.getItem("name")}</i>
                    </h4>
                    <br />
                    <h4 className="card-title">
                      <i>Course: {localStorage.getItem("language")}</i>
                    </h4>
                    <br />
                    <h4 className="card-title">
                      <i>Email: {localStorage.getItem("email")}</i>
                    </h4>
                    <br />
                    <h4 className="card-title">
                      <i>Contact No:{localStorage.getItem("phone")} </i>
                    </h4>
                    <br />
                  </div>
                </div>

                <div className="modal-footer main_bg">
                  <button
                    className="btn btn-danger "
                    onClick={() => setvalue(5)}
                  >
                    Logout
                  </button>
                  <button className="btn mybtn" onClick={() => setvalue(1)}>
                    Edit
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  } else if (value === 1) {
    return (
      <>
        {" "}
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => setvalue(0)}>
            Back
          </button>
          <Edit />
        </div>
      </>
    );
  } else if (value === 2) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => setvalue(0)}>
            Back
          </button>
          <Marks />
        </div>
      </>
    );
  } else if (value === 3) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => setvalue(0)}>
            Back
          </button>
          <LeaveLetter />
        </div>
      </>
    );
  } else if (value === 4) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => setvalue(0)}>
            Back
          </button>
          <Material />
        </div>
      </>
    );
  } else if (value === 5) {
    localStorage.clear();
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <br />
          <br />
          <br />
          <br />
          <h5 className="text-center ">
            <h2>
              <b>Welcome to Edusphere!</b>
            </h2>
            <br />
            Click button to go Registration or Login
          </h5>

          <NavLink to="/Login_or_regisrtation">
            <button
              className="btn mybtn btn-lg"
              style={{ marginLeft: "40%", width: "20%", marginTop: "10%" }}
            >
              <b>Register or Login </b>
            </button>
          </NavLink>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

export default StudentHome;
