import { useState } from "react";

import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Login from "./Login";
import Loading from "./Loading";
const Register_ = () => {
  const [Register, setregister] = useState("");
  const [value, setvalue] = useState(0);

  const [id, setid] = useState("");
  const [file, setFile] = useState(null);

  const [Name, setname] = useState("");
  const [Email, setemail] = useState("");
  const [course, setcourse] = useState("edu0p");
  const [qualification, setqualification] = useState("");
  const [phone, setphone] = useState("");
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const store = (e) => {
    if (
      Name !== "" &&
      phone !== "" &&
      Email !== "" &&
      course !== "" &&
      file != ""
    ) {
      var value = {
        Name: Name,
        phone: phone,
        email: Email,
        course: course,
        qualification: qualification,
      };

      const formData = new FormData();
      formData.append("file", file);
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
          console.log(error);
        });
      console.log(value);
      axios.post("http://127.0.0.1:5000/store", value).then((Response) => {
        console.log(Response.data);

        if (Response.data === "error") {
          alert(Response.data);
          setvalue(2);
        } else {
          setid(Response.data);
          setname("");
          setcourse("");
          setemail("");
          setphone("");
          setqualification("");

          setvalue(1);
        }
      });
    } else {
      alert("Please fill out all the field");
    }
  };
  if (value == 0) {
    return (
      <>
        {" "}
        <div className="  ">
          <div className="">
            <p>
              Click here to go login page{" "}
              <button className="btn mybtn" onClick={() => setvalue(1)}>
                Login
              </button>
            </p>
          </div>
          <div className="  bor p-3 ">
            <br />
            <h2 className="text-center">Registration</h2>
            <hr />
            <p>Enter your details here </p>

            <label htmlFor="Register Number">
              <b>Name:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control  "
              value={Name}
              onChange={(e) => setname(e.target.value)}
              placeholder="Enter your Name"
            />
            <br />
            <label htmlFor="Phone Number">
              <b>Phone:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="Enter your Mobile Number (e.g. 9876543210)"
            />
            <br />
            <label htmlFor="Course">
              <b>
                Course: <br />
              </b>
            </label>

            <select
              name="course"
              className="form-control"
              id="courselist"
              style={{ background: "LightGray" }}
              onChange={(e) => setcourse(e.target.value)}
            >
              <option value="edu0p">python3</option>
              <option value="edu1j">java</option>
              <option value="edu2c">c</option>
              <option value="edu3cp">cpp</option>
            </select>
            <br />
            <label htmlFor="Email">
              <b>Email:</b>
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              value={Email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your Email (e.g. abcd@gmail.com)"
            />
            <br />
            <label htmlFor="Profile">
              <b>Profile:</b>
            </label>
            <br />
            <input
              className=" form-control"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleChange}
            />
            <br />
            <br />

            <button
              className="btn mybtn  "
              style={{ marginLeft: "38%" }}
              onClick={store}
            >
              Register
            </button>
          </div>
        </div>
      </>
    );
  } else if (value === 1) {
    return (
      <>
        <Login value={id} />
      </>
    );
  } else {
    return <Loading />;
  }
};

export default Register_;
