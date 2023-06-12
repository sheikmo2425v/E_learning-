import { useState } from "react";

import axios from "axios";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
const Edit = () => {
  const [show, setShow] = useState(false);
  const [modalKey, setModalKey] = useState(0);
  const nav = useNavigate();
  const handleClose = () => setShow(false);
  const [file, setFile] = useState(
    "./images/" + localStorage.getItem("sid") + ".jpg"
  );

  const [value, setvalue] = useState(0);

  const [Student_id, setstudent_id] = useState(localStorage.getItem("sid"));
  const [name, setname] = useState(localStorage.getItem("name"));
  const [email, setemail] = useState(localStorage.getItem("email"));
  const [phone, setphone] = useState(localStorage.getItem("phone"));

  // const handleChange = (e) => {
  //   setFile(e.target.files[0]);
  // };
  const update_s = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("sid", Student_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);

    axios
      .post("http://127.0.0.1:5000/update_s", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        localStorage.setItem("sid", Response.data[0][0]);
        localStorage.setItem("name", Response.data[0][1]);
        localStorage.setItem("email", Response.data[0][4]);
        localStorage.setItem("phone", Response.data[0][3]);
        alert("Updated")
        nav("/");
        setstudent_id("");
        setname("");
        setemail("");
        setphone("");
      });
  };
  return (
    <>
      <div>
        <h2 className="text-center ">
          <b>Edit Student</b>{" "}
        </h2>
        <br />
        <div
          className="border p-3 bor "
          style={{
            width: "30%",
            marginLeft: "35%",
            height: "75%",
            marginTop: "1%",
          }}
        >
          <br />
          <div className="center">
            <img
              src={file}
              alt=" "
              className="rounded-circle bg-light"
              style={{ width: "80px", height: "85px" }}
            ></img>
            <input
              style={{ height: "10%", marginTop: "5%" }}
              type="file"
              className="form-control"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <br />
          <label htmlFor="name">
            <b>Student ID:</b>
          </label>
          <br />
          <input type="text" className="form-control" value={Student_id} />{" "}
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
};

export default Edit;
