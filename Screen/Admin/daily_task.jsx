import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import Loading from "../../Component/Loading";
const Daily_task = () => {
  const [value, setvalue] = useState(0);
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([[0, 0, 0, 0]]);
  const [course, setcourse] = useState("");
  const [sid, setsid] = useState("");
  const [question, setquestion] = useState("");
  const [st, setst] = useState("none");
  const [st2, setst2] = useState("none");
  const [temp, settemp] = useState([0, 0, 0, [0, 0, 0, 0]]);
  const [mk, setmk] = useState(0);

  useEffect(() => {
    setvalue(5);
    axios.post("http://127.0.0.1:5000/view_d_s").then((Response) => {
      setvalue(0);
      setdata(Response.data["c"]);
      setdata2(Response.data["d"]);
    });
  }, []);
  const nv = (e) => {
    setvalue(e);
  };
  const submit_d = () => {
    var tep = { sid: sid, course: course, question: question };
    console.log(temp);
    setvalue(5);
    axios.post("http://127.0.0.1:5000/submit_d", tep).then((Response) => {
      console.log(Response.statusText);
      alert(Response.statusText);
      setdata2(Response.data);

      setvalue(0);
      setmk(0);
    });
  };
  const sho = (e) => {
    console.log(e);
    setst2("none");
    setvalue(5);
    axios
      .post("http://127.0.0.1:5000/view_d_s", { course: e })
      .then((Response) => {
        console.log(Response.data);
        setdata(Response.data["c"]);
        setvalue(0);
      });
    setst("");
  };
  const view_s_d = (e) => {
    settemp([0, 0, 0, [0, 0, 0, 0]]);
    setvalue(5);
    axios
      .post("http://127.0.0.1:5000/view_s_d", { sid: e[1] })
      .then((Response) => {
        console.log(Response.data);
        var k = Response.data.length;
        setvalue(0);

        if (k === 0) {
          settemp([0, 0, 0, [0, 0, 0, 0]]);
        } else {
          for (var d of Response.data) {
            e.push(d);
          }
          settemp(e);

          console.log(e);
        }
      });
  };
  const mark = (e, e2) => {
    setvalue(5);
    axios
      .post("http://127.0.0.1:5000/d_s_m", { sid: e, mk: mk, dtid: e2 })
      .then((Response) => {
        setvalue(0);
        setmk(0);
        alert(Response.data);
      });
  };
  if (value === 0) {
    return (
      <>
        <div
          className="container-fluid main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <div className=" ">
            <button type="button" onClick={() => nv(1)} className="btn mybtn">
              Add daily Task
            </button>
            <button className="btn mybtn" style={{ marginLeft: "86%" }}>
              <NavLink className="nav-link" to="/admin">
                Home
              </NavLink>
            </button>
          </div>
          <div className=" d-flex justify-content-center">
            <div className="btn-group">
              <button className=" btn mybtn" onClick={() => sho("python3")}>
                {" "}
                Python
              </button>
              <button className="btn mybtn" onClick={() => sho("java")}>
                Java
              </button>
              <button className="btn mybtn" onClick={() => sho("c")}>
                C
              </button>
              <button className="btn mybtn" onClick={() => sho("cpp")}>
                C++
              </button>{" "}
            </div>
          </div>
          <div
            className="row "
            style={{
              marginTop: "10vh",
              marginLeft: "0.1%",
              marginRight: "0.1%",
            }}
          >
            <table className="table  bor ">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Course ID
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Student ID
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Question
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data2.map((d) => {
                  return (
                    <>
                      <tr>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {d[0]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {d[1]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {d[2]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {d[3]}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <table className="table bor " style={{ display: st }}>
            <thead>
              <tr>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Student ID
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Daily Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <>
                    <tr>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        <button
                          className="btn mybtn "
                          onClick={() => (view_s_d(d), setst2(""), setmk(""))}
                        >
                          {d[1]}
                        </button>
                      </td>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        {d[2]}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <div className=" d-flex justify-content-center">
            <div
              className="border-0 p-3 bor  "
              style={{
                display: st2,
                width: "70vh",
                marginLeft: "5%",
                height: "50vh",
                overflow: "auto",
              }}
            >
              <h5>
                <b>Course ID is</b> {temp[0]}
              </h5>
              <h5>
                <b> Student ID is</b> {temp[1]}
              </h5>

              <h6>
                <b> Status: </b>
                {temp[2]}
              </h6>

              <h6>Question: {temp[3][0]}</h6>
              <h6>Answer: {temp[3][1]}</h6>
              <h6>Output: {temp[3][2]}</h6>
              <div className="border-0 " style={{ marginTop: "30%" }}>
                <label htmlFor="mark">
                  <b>Give mark</b>
                </label>{" "}
                <br />
                <input
                  type="number"
                  className="form-control"
                  value={mk}
                  onChange={(e) => setmk(e.target.value)}
                  id="mark"
                />
                <br />
                <button
                  className="btn mybtn"
                  onClick={() => mark(temp[1], temp[3][3])}
                >
                  Add mark
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (value === 1) {
    return (
      <>
        <div
          className="  container-fluid main_bg "
          style={{ height: "100vh", position: "fixed" }}
        >
          <br />
          <div>
            <button className="btn mybtn" onClick={() => nv(0)}>
              Back
            </button>
          </div>
          <br />
          <div
            className="border bor  p-3"
            style={{
              width: "40%",
              marginLeft: "30%",
              marginTop: "5%",
              height: "53vh",
            }}
          >
            <br />
            <label htmlFor="course">
              <b>Select Course: </b>
            </label>
            <input
              list="courselist"
              name=""
              id="Course"
              className="form-control"
              placeholder="Select a Course"
              onChange={(e) => setcourse(e.target.value)}
            />
            <datalist
              name="course"
              id="courselist"
              style={{ background: "LightGray" }}
              onChange={(e) => setcourse(e.target.value)}
            >
              <option value="python3">python3</option>
              <option value="java">java</option>
              <option value="c">c</option>
              <option value="cpp">cpp</option>
            </datalist>
            <br />
            <label htmlFor="Student">
              <b>Enter Student ID: </b>
            </label>{" "}
            <input
              type="text"
              value={sid}
              className="form-control"
              placeholder="Enter Student ID"
              onChange={(e) => setsid(e.target.value)}
            />
            <br />
            <label htmlFor="task">
              <b>Enter the Today Task: </b>
            </label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Enter task here"
              onChange={(e) => setquestion(e.target.value)}
            />
            <br />
            <button
              className="btn mybtn"
              style={{ marginLeft: "42%" }}
              onClick={submit_d}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  } else if (value == 5) {
    return (
      <>
        <Loading />
      </>
    );
  }
};

export default Daily_task;
