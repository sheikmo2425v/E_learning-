import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import Loading from "../../Component/Loading";

const Task = () => {
  const nav = useNavigate();
  const [language, setlanguage] = useState(localStorage.getItem("language"));
  const [task, settask] = useState([]);
  const [dtask, setdtask] = useState([]);
  const [sid, setsid] = useState(localStorage.getItem("sid"));
  const { state } = useLocation();

  const [value, setvalue] = useState(0);
  const [sh0, setsh0] = useState(true);
  console.log(state);
  useEffect(() => {
    setvalue(1);
    var value = { course: language, stage: state, sid: sid };
    axios.post("http://localhost:5000/get_task", value).then((response) => {
      console.log(response.data);
      if (state === "daily_task") {
        setdtask(response.data);
      } else {
        settask(response.data);
      }

      setvalue(0);
      if (response.data.length !== 0) {
        setsh0(false);
      }
    });
  }, []);
  const compiler = (e) => {
    console.log(e);
    if (state !== "daily_task") {
      var k = task.indexOf(e);

      var data = { task: e[4], answer: e[5], qid: e[0], stage: e[3] };
      nav("/compiler", { state: data });
    } else {
      var data = { task: e[3], qid: e[0], stage: state };
      nav("/compiler", { state: data });
    }
  };
  if (value === 0) {
    return (
      <>
        <div
          className="container-fluid main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <div className="row">
            <NavLink to="/">
              <button className="btn mybtn" style={{ marginLeft: "95%" }}>
                Home
              </button>
            </NavLink>
            <h2
              className="d-flex justify-content-center main_bg  text-center "
              style={{ height: "10vh" }}
            >
              <b>{language}</b>
            </h2>
          </div>
          <div className="row">
            <ol
              className="flex-column justify-content-center bor "
              style={{
                height: "75vh",
                width: "80%",
                marginLeft: "10%",
                marginRight: "20%",
              }}
            >
              <br />
              <h5>
                {task.map((t,i) => {
                  return (
                    <>
                      <li className="d-flex ">
                        <br />
                        {i+1}.{t[4]}{" "}
                      </li>
                      <br />
                      <button
                        className="btn mybtn btn-sm"
                        style={{ width: "6%", height: "4vh", marginLeft: "2%" }}
                        onClick={() => compiler(t)}
                      >
                        Try
                      </button>
                    </>
                  );
                })}
                {dtask.map((t,i) => {
                  return (
                    <>
                      <li className="d-flex ">
                        <br />
                        {i+1}.{t[3]}{" "}
                      </li>
                      <br />
                      <button
                        className="btn mybtn btn-sm"
                        style={{ width: "6%", height: "4vh", marginLeft: "2%" }}
                        onClick={() => compiler(t)}
                      >
                        Try
                      </button>
                    </>
                  );
                })}
              </h5>

              {sh0 && (
                <div className="center">
                  <p>no data found</p>
                </div>
              )}
            </ol>
          </div>
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

export default Task;
