import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../Component/Loading";

const Student_status = () => {
  const [sdetails, setsdetails] = useState([]);

  const [d, setd] = useState(0);
  const [st, setst] = useState("none");
  const [stu_task, setstu_task] = useState([]);
  const [st2, setst2] = useState("none");
  const [temp, settemp] = useState([0, 0, 0, [0, 0, 0, 0]]);
  const [mk, setmk] = useState(0);
  const [value, setvalue] = useState(0);
  const [st4, setst4] = useState("");
  useEffect(() => {
    setvalue(5);
    axios.post("http://127.0.0.1:5000/status").then((Response) => {
      console.log(Response.data);
      alert(Response.statusText);
      setsdetails(Response.data);
      setvalue(0);
    });
  }, []);
  var k = 1;
  const give_chance = (e) => {
    setvalue(5);
    axios
      .post("http://127.0.0.1:5000/give_chance", { sid: e })
      .then((Response) => {
        setvalue(0);
        alert(Response.statusText);
        setsdetails(Response.data);
      });
  };
  const mark = (e, e2) => {
    setvalue(5);
    axios
      .post("http://127.0.0.1:5000/t_s_m", { sid: e, mk: mk, qid: e2 })
      .then((Response) => {
        setvalue(0);
        alert(Response.data);
        setmk(0);
      });
  };
  const sho_t = () => {
    if (d === 0) {
      setst("");
      setd(1);
    } else {
      setst("none");
      setd(0);
    }
  };
  const sho = (e) => {
    setvalue(5);
    setst2("none");
    axios
      .post("http://127.0.0.1:5000/sho_st_task", { course: e })
      .then((Response) => {
        setvalue(0);
        console.log(Response.data);
        setstu_task(Response.data);
      });
  };
  const v_a = (e) => {
    console.log("sjd");
    if (d === 0) {
      setst2("");
      setd(0);
      setd(1);
    } else {
      setst2("none");
    }
    settemp(e);
  };
  if (value === 0) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => sho_t()}>
            Student Task
          </button>

          <button className="btn mybtn" style={{ marginLeft: "87%" }}>
            <NavLink className="nav-link" to="/admin">
              Home
            </NavLink>
          </button>

          <div style={{ display: st }}>
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
            <br />
            <br />
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
                    Answer
                  </th>
                </tr>
              </thead>
              <tbody>
                {stu_task.map((dw) => {
                  return (
                    <>
                      <tr>
                        <td style={{ border: "1px solid white" }}>
                          <button
                            className="btn mybtn "
                            onClick={() => (v_a(dw), setst2(""), setmk(""))}
                          >
                            {dw[1]}
                          </button>
                        </td>
                        <td style={{ border: "1px solid white" }}>{dw[5]}</td>
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
                  height: "60vh",
                  overflow: "auto",
                }}
              >
                <h4>
                  <b>Course id is</b> {temp[0]}
                </h4>
                <h4>
                  <b> Student id is</b> {temp[1]}
                </h4>

                <h6>
                  <b> Status:</b>
                  {temp[2]}
                </h6>

                <h6>Question:{temp[4]}</h6>
                <h6>Answer:{temp[5]}</h6>
                <h6>Output:{temp[6]}</h6>
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
                    onClick={() => mark(temp[1], temp[3])}
                  >
                    Add mark
                  </button>
                </div>
              </div>
            </div>
          </div>
          <table className="table bor " style={{ marginTop: "10vh" }}>
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
                  Course ID
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Marks
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Grade
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Task Completed
                </th>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Answer Request
                </th>
              </tr>
            </thead>
            <tbody>
              {sdetails.map((d) => {
                return (
                  <>
                    <tr key={k + 1}>
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
                        {d[4]}
                      </td>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        {d[5]}
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
                        <button
                          style={{ display: st4 }}
                          className="btn mybtn "
                          onClick={() => give_chance(d[0])}
                        >
                          "{d[6]}"
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
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

export default Student_status;
