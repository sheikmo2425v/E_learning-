import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../../Component/Loading";

const Admin = () => {
  const [value, setvalue] = useState(1);
  const [st, setst] = useState("none");
  const [st2, setst2] = useState("none");
  const [lmsg, setlmsg] = useState([]);
  const [d, setd] = useState(0);
  const [course, setcourse] = useState("");
  const [sid, setsid] = useState("");
  const [file, setFile] = useState("");
  const [file_m, setfile_m] = useState("");
  const [l, setl] = useState(0);
  const [st3, setst3] = useState("none");
  const [m, setm] = useState([]);

  // const [students, setstudents] = useState([]);
  // const [Student_id, setstudent_id] = useState("");
  // const [name, setname] = useState("");
  // const [email, setemail] = useState("");
  // const [phone, setphone] = useState("");
  // const [data, setdata] = useState([]);
  const leave_Message = () => {
    if (d === 0) {
      setvalue(5);
      axios.post("http://127.0.0.1:5000/lve_message").then((Response) => {
        setlmsg(Response.data);
        setst("");
        setd(1);
        setvalue(1);
      });
    } else {
      setst("none");
      setd(0);
    }
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const U_material = () => {
    if (d === 0) {
      setst2("");
      setd(1);
    } else {
      setst2("none");
      setd(0);
    }
  };
  const s_material = () => {
    setvalue(5);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("course", course);
    formData.append("sid", sid);
    formData.append("file_name", file_m);
    axios
      .post("http://localhost:5000/upload_m", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        setvalue(1);
        setFile("");
        setcourse("");
        setsid("");
      });
  };
  const view_m = () => {
    if (d === 0) {
      setvalue(5);
      axios.post("http://127.0.0.1:5000/view_m").then((Response) => {
        setm(Response.data);
        setst3("");
        setd(1);
        setvalue(1);
      });
    } else {
      setst3("none");
      setd(0);
    }
  };
  if (value === 1) {
    return (
      <>
        <div
          className="  container-fluid   main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <br />
          <div
            className=" btn-group border border-dark"
            style={{ width: "100%" }}
          >
            <button type="button" class="btn mybtn  border border-dark">
              <NavLink className="nav-link" to="/student">
                <b> Student</b>
              </NavLink>
            </button>
            <button type="button" class="btn mybtn  border border-dark">
              <NavLink className="nav-link  " to="/question">
                <b> Questions</b>
              </NavLink>
            </button>

            <button type="button" class="btn mybtn  border border-dark">
              <NavLink className="nav-link" to="/student_Status">
                <b>Student Status</b>
              </NavLink>
            </button>

            <button type="button" class="btn mybtn  border border-dark">
              <NavLink className="nav-link" to="/daily_task">
                <b> Daily Task</b>
              </NavLink>
            </button>
          </div>
          <br /> <br />
          <br />
          <div className="  ">
            <button
              className=" btn mybtn "
              style={{ marginLeft: "5%" }}
              onClick={() => leave_Message()}
            >
              Leave Message
            </button>
            <br />
            <br />
            <div className="" style={{ display: st }}>
              <table
                className="table bor "
                style={{ width: "80%", marginLeft: "10%" }}
              >
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
                      When Date
                    </th>
                    <th
                      className="text-center"
                      style={{ border: "1px solid white" }}
                    >
                      End Date
                    </th>
                    <th
                      className="text-center"
                      style={{ border: "1px solid white" }}
                    >
                      Reason
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
                  {lmsg.map((l) => {
                    return (
                      <>
                        <tr>
                          <td
                            className="text-center"
                            style={{ border: "1px solid white" }}
                          >
                            {l[0]}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid white" }}
                          >
                            {l[1]}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid white" }}
                          >
                            {l[2]}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid white" }}
                          >
                            {l[3]}
                          </td>
                          <td
                            className="text-center"
                            style={{ border: "1px solid white" }}
                          >
                            {l[4]}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              className=" btn mybtn  "
              style={{ marginLeft: "5%" }}
              onClick={() => U_material()}
            >
              Upload Material
            </button>
          </div>
          <br />
          <div
            className="border border-dark bor  p-2"
            style={{
              width: "35%",
              height: "57vh",
              marginLeft: "34%",
              display: st2,
              overflow: "auto",
            }}
          >
            <br />{" "}
            <label htmlFor="course">
              <b>Select Course:</b>
            </label>
            <br />
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
              <b>Enter Student ID:</b>
            </label>{" "}
            <input
              type="text"
              value={sid}
              className="form-control"
              placeholder="Enter Student ID"
              onChange={(e) => setsid(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="Student">
              <b>Enter File name:</b>
            </label>{" "}
            <input
              type="text"
              value={file_m}
              className="form-control"
              placeholder="Enter File Name"
              onChange={(e) => setfile_m(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="File">
              <b>Material:</b>
            </label>
            <br />
            <input
              className="btn "
              type="file"
              accept=".pdf"
              onChange={handleChange}
            />{" "}
            <br />
            <input
              type="submit"
              className="btn mybtn"
              style={{ marginLeft: "40%" }}
              onClick={s_material}
            />
          </div>
          <button
            className=" btn mybtn "
            style={{ marginLeft: "5%" }}
            onClick={() => view_m()}
          >
            View Material
          </button>
          <br />
          <br />
          <div style={{ width: "80%", marginLeft: "10%", display: st3 }}>
            <table className="table bor ">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    course_ID
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    student_ID
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Material
                  </th>
                </tr>
              </thead>
              <tbody>
                {m.map((d) => {
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
                          {" "}
                          {d[1]}
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

export default Admin;
