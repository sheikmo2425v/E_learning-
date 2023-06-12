import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import Register_ from "../../Component/Register";
import Ar from "../../Component/Aregister";
import Loading from "../../Component/Loading";

const Student = () => {
  const [value, setvalue] = useState(0);
  const [msg, setmsg] = useState("");
  const [students, setstudents] = useState([]);
  const [Student_id, setstudent_id] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [course, setcourse] = useState("python3");
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [id, setid] = useState("");
  const [temp, settemp] = useState([]);
  const [show, setShow] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const handleClose = () => setShow(false);
  const nav = (e) => {
    setvalue(e);
  };
  const update_s = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sid", Student_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    axios
      .post("http://127.0.0.1:5000/update_s_a", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        setvalue(0);
        setstudents(Response.data);
      });
  };
  useEffect(() => {
    setvalue(5);
    axios.post("http://127.0.0.1:5000/view_s").then((Response) => {
      setstudents(Response.data);
      setvalue(0);
    });
  }, [id]);
  const view = (e) => {
    settemp(e);
    setstudent_id(e[0]);
    setname(e[1]);
    setemail(e[3]);
    setphone(e[2]);
    setcourse(e[4]);
  };
  const edit_s = (e) => {
    setstudent_id(e[0]);
    setname(e[1]);
    setemail(e[3]);
    setphone(e[2]);
    setcourse(e[4]);
    setvalue(1);
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const store = () => {
    console.log("dfjakjd");
    var vale = {
      Name: name,
      phone: phone,
      email: email,
      course: course,
    };

    const formData = new FormData();
    formData.append("file", file);
    setvalue(5);
    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
      });
    axios.post("http://127.0.0.1:5000/store", vale).then((Response) => {
      console.log(Response.data);
      if (Response.data === "error") {
        alert(Response.data);
      } else {
        setid(Response.data);
        setvalue(0);
        setname("");
        setcourse("");
        setemail("");
        setphone("");
      }
    });
  };
  const delete_s = (e) => {
    var value = { sid: e };
    axios.post("http://127.0.0.1:5000/delete_s", value).then((res) => {
      setmsg("Deleted ");
      setstudents(res.data);
    });
  };

  if (value === 0) {
    var p = "./images/" + Student_id + ".jpg";
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />
          <div className=" ">
            <button type="button" onClick={() => nav(3)} className="btn mybtn">
              Add Student
            </button>
            <button className="btn mybtn" style={{ marginLeft: "87%" }}>
              <NavLink className="nav-link" to="/admin">
                Home
              </NavLink>
            </button>
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
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                return (
                  <>
                    {" "}
                    <tr key={s[0]}>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        <button
                          className="btn mybtn"
                          onClick={() => (view(s), setShow(true))}
                        >
                          {s[0]}
                        </button>
                      </td>

                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        <button
                          className="btn mybtn"
                          onClick={() => delete_s(s[0])}
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
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
        <Modal key={modalKey} show={show} onHide={handleClose} backdrop="false">
          <div className="modal-content main_bg text-white">
            <div className="modal-header ">
              <h4>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={p}
                  alt=""
                  className="rounded-circle "
                />
              </h4>
              <h4 className="modal-title  " style={{ marginRight: "60%" }}>
                Profile
              </h4>
            </div>

            <div className="modal-body bor">
              <div className="card-body ">
                <h4 className="card-title">
                  <i>Register Id: {Student_id}</i>
                </h4>
                <br />
                <h4 className="card-title">
                  <i>Name: {name}</i>
                </h4>
                <br />
                <h4 className="card-title">
                  <i>Course: {course}</i>
                </h4>
                <br />
                <h4 className="card-title">
                  <i>Email: {email}</i>
                </h4>
                <br />
                <h4 className="card-title">
                  <i>Contact No: {phone}</i>
                </h4>
                <br />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn mybtn" onClick={() => edit_s(temp)}>
                Edit
              </button>
              <button
                className="btn mybtn"
                data-bs-dismiss="modal"
                onClick={() => delete_s(Student_id)}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header ">
                <h4 className="modal-title">Message</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">
                <div className="card-body">
                  <h6>{msg}</h6>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Close
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
          className="container-fluid border-0 main_bg "
          style={{ height: "100vh", position: "fixed", overflow: "auto  " }}
        >
          <br />
          <button className="btn mybtn" onClick={() => nav(0)}>
            Back
          </button>
          <br />
          <h2 className="text-center ">
            <b>Edit Student</b>{" "}
          </h2>
          <br />
          <div
            className="border p-3 bor "
            style={{
              width: "30%",
              marginLeft: "35%",
              height: "70%",
              marginTop: "1%",
            }}
          >
            <img
              src={"./images/" + Student_id + ".jpg"}
              alt=" "
              className="rounded-circle bg-light"
              // data-bs-toggle="modal"
              // data-bs-target="#myModal"
              style={{ width: "80px", height: "85px" }}
            />
            <input
              style={{ marginLeft: "2%" }}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="name">
              <b>Student ID:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              value={Student_id}
            />{" "}
            <br />
            <label htmlFor="name">
              <b>Name:</b>
            </label>
            <br />
            <input
              type="text"
              value={name}
              className="form-control"
              onChange={(e) => setname(e.target.value)}
            />
            <br />
            <label htmlFor="Email">
              <b>Email:</b>
            </label>
            <br />
            <input
              type="text"
              value={email}
              className="form-control"
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <label htmlFor="phone">
              <b>Phone:</b>
            </label>
            <br />
            <input
              type="text"
              value={phone}
              className="form-control"
              onChange={(e) => setphone(e.target.value)}
            />
            <br />
            <button
              className="btn mybtn"
              style={{ marginLeft: "42%" }}
              onClick={update_s}
            >
              Update
            </button>
          </div>
        </div>
      </>
    );
  } else if (value === 3) {
    return (
      <>
        {" "}
        <div
          className="container-fluid border-0 main_bg  "
          style={{ height: "100vh", position: "fixed", overflow: "auto  " }}
        >
          <br />
          <div>
            <button className="btn mybtn" onClick={() => nav(0)}>
              Back
            </button>
          </div>
          <br />
          <div className="center">
            <Ar />
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

export default Student;
