import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Loading from "../../Component/Loading";

const Question = () => {
  const [value, setvalue] = useState(0);
  const [que, setque] = useState([]);
  const [t, sett] = useState([]);
  const [course_ID, setcourse_id] = useState("");
  const [sid, setsid] = useState("");
  const [task_stage, settask_stage] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  useEffect(() => {
    setvalue(5);
    axios.post("http://127.0.0.1:5000/view_q").then((Response) => {
      alert(Response.statusText);
      console.log(Response.data);
      setvalue(0);
      setque(Response.data);
    });
  }, []);
  const nv = (e) => {
    console.log(e);
    setvalue(e);
  };
  const submit = () => {
    setvalue(5);
    var data = {
      course: course_ID,
      sid: sid,
      task_stage: task_stage,
      question: question,
      answer: answer,
    };
    axios.post("http://127.0.0.1:5000/submit_q", data).then((Response) => {
      console.log(Response.data);
      alert(Response.statusText);
      setque(Response.data);
      setvalue(0);
      setcourse_id("");
      setsid("");
      settask_stage("");
      setquestion("");
      setanswer("");
    });
  };
  const edit_q = (e) => {
    sett(e[0]);
    setcourse_id(e[2]);
    setsid(e[1]);
    settask_stage(e[3]);
    setquestion(e[4]);
    setanswer(e[5]);
    setvalue(2);
  };
  const update_q = () => {
    console.log();
    var data = {
      tid: t,
      cid: course_ID,
      sid: sid,
      task_stage: task_stage,
      question: question,
      answer: answer,
    };
    setvalue(5);
    axios.post("http://127.0.0.1:5000/update_q", data).then((Response) => {
      setque(Response.data);
      setvalue(0);
    });
  };
  const delete_q = (e) => {
    var data = { tid: e };
    setvalue(5);
    axios.post("http://127.0.0.1:5000/delete_q", data).then((Response) => {
      setque(Response.data);
      setvalue(0);
    });
  };
  if (value === 0) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <div className=" ">
            <button type="button" onClick={() => nv(1)} className="btn mybtn">
              Add Question
            </button>
            <button className="btn mybtn" style={{ marginLeft: "86%" }}>
              <NavLink className="nav-link" to="/admin">
                Home
              </NavLink>
            </button>
          </div>
          <div style={{ marginTop: "10vh" }}>
            <table className="table bor ">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Question ID
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
                    Course ID
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Stage
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Task
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Task Answer
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Edit
                  </th>
                  <th
                    className="text-center"
                    style={{ border: "1px solid white" }}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {que.map((s) => {
                  return (
                    <>
                      {" "}
                      <tr key={s[0]}>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[0]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[1]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[2]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[3]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[4]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          {s[5]}
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          <button
                            className="btn mybtn"
                            onClick={() => edit_q(s)}
                          >
                            Edit
                          </button>
                        </td>
                        <td
                          className="text-center"
                          style={{ border: "1px solid white" }}
                        >
                          <button
                            className="btn mybtn"
                            onClick={() => delete_q(s[0])}
                          >
                            Delete
                          </button>
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
  } else if (value === 1) {
    return (
      <>
        <div
          className="container-fluid main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => nv(0)}>
            Back
          </button>
          <div
            className="border bor  p-3 "
            style={{
              heigth: "100%",
              width: "40%",
              marginLeft: "31%",
              marginTop: "4%",
            }}
          >
            <label htmlFor="Course">
              <b>
                Course:
                <br />
              </b>
            </label>
            <input
              list="courselist"
              name="course"
              id="Course"
              className="form-control"
              placeholder="Select a Course"
              onChange={(e) => setcourse_id(e.target.value)}
            />
            <datalist
              name="course"
              id="courselist"
              style={{ background: "LightGray" }}
            >
              <option value="python3">python3</option>
              <option value="java">java</option>
              <option value="c">c</option>
              <option value="cpp">cpp</option>
            </datalist>
            <br />
            <br />
            <label htmlFor="sid">
              <b>Student ID:</b>
            </label>
            <input
              type="text"
              value={sid}
              className="form-control"
              placeholder="Enter Student ID"
              onChange={(e) => setsid(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="stage">
              <b>Stage:</b>
            </label>
            <input
              list="stagelist"
              type="text"
              value={task_stage}
              className="form-control"
              placeholder="Enter Task Stage"
              onChange={(e) => settask_stage(e.target.value)}
            />
            <datalist
              name="course"
              id="stagelist"
              style={{ background: "LightGray" }}
            >
              <option value="easy">easy</option>

              <option value="intermediate">intermediate</option>
              <option value="hard">hard</option>
            </datalist>
            <br />
            <label htmlFor="Question">
              <b>Question:</b>
            </label>
            <textarea
              type="text"
              value={question}
              className="form-control"
              placeholder="Enter the Question"
              onChange={(e) => setquestion(e.target.value)}
            />
            <br />
            <label htmlFor="Answer">
              <b>Answer:</b>
            </label>
            <textarea
              type="text"
              value={answer}
              className="form-control"
              placeholder="Enter the Answer"
              onChange={(e) => setanswer(e.target.value)}
            />
            <br />
            <button
              className="btn mybtn"
              style={{ marginLeft: "40%" }}
              onClick={submit}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    );
  } else if (value === 2) {
    return (
      <>
        <div
          className="container-fluid main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <button className="btn mybtn" onClick={() => nv(0)}>
            Back
          </button>
          <div
            className="border p-3 bor "
            style={{
              width: "40%",
              marginLeft: "31%",
              height: "72%",
              marginTop: "3%",
            }}
          >
            <br />
            <label htmlFor="course">
              <b>Course ID:</b>
            </label>
            <input
              type="text"
              value={course_ID}
              className="form-control"
              placeholder="Enter course id"
              onChange={(e) => setcourse_id(e.target.value)}
            />
            <br />
            <label htmlFor="sid">
              <b>Student ID:</b>
            </label>
            <input
              type="text"
              value={sid}
              className="form-control"
              placeholder="Enter student id"
              onChange={(e) => setsid(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="stage">
              <b>Stage:</b>
            </label>
            <input
              type="text"
              value={task_stage}
              className="form-control"
              placeholder="Enter task stage"
              onChange={(e) => settask_stage(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="Question">
              <b>Question:</b>
            </label>
            <input
              type="text"
              value={question}
              className="form-control"
              placeholder="Enter Question"
              onChange={(e) => setquestion(e.target.value)}
            />{" "}
            <br />
            <label htmlFor="Answer">
              <b>Answer:</b>
            </label>
            <input
              type="text"
              value={answer}
              className="form-control"
              placeholder="Enter Answer"
              onChange={(e) => setanswer(e.target.value)}
            />
            <br />
            <button
              className="btn mybtn"
              style={{ marginLeft: "42%" }}
              onClick={update_q}
            >
              Update
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

export default Question;
