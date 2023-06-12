import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Register_ from "./Register";

const Login = (id) => {
  const [data, setdata] = useState(id.value);
  const [value, setvalue] = useState(0);
  const [Register, setregister] = useState("");

  const nav = useNavigate();

  const [phone, setphone] = useState("");

  const check = () => {
    if (Register !== "" && phone !== "") {
      setvalue(5);
      const value = { Register: Register, phone: phone };
      console.log(value);

      axios.post("http://127.0.0.1:5000/check", value).then((Response) => {
        var t = Response.data;

        if (
          t ===
          " check your phone number and register number are correct or not Or server error try again"
        ) {
          alert(Response.data);
          setvalue(1);
        } else if (t.length === 0) {
          alert("no user found");
          setvalue(1);
        } else {
          localStorage.setItem("sid", Response.data[0][0]);

          setregister("");
          setphone("");

          nav("/");
        }
      });
    } else {
      alert("Please fill out all the field");
    }
  };
  if (value === 0) {
    return (
      <>
        {" "}
        <div className=" ">
          <div className="">
            <p>
              Click here to go Register page{" "}
              <button className="btn mybtn" onClick={() => setvalue(1)}>
                Register
              </button>
            </p>
          </div>
          <div>
            <h3 className="text-center">{data}</h3>
          </div>
          <br />
          <div className="  bor  p-3 ">
            <br />
            <h2 className="text-center">Login</h2>
            <hr />
            <p>Enter your register number and password </p>
            <label htmlFor="Register number">
              <b>Register Number:</b>
            </label>
            <br />
            <br />
            <input
              type="text"
              className="form-control"
              value={Register}
              onChange={(e) => setregister(e.target.value)}
              placeholder="Enter your Register number "
            />
            <br />
            <label htmlFor="Password">
              <b>Phone Number:</b>
            </label>
            <br />
            <br />
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              placeholder="Enter your Mobile Number (e.g. 9876543210)"
            />
            <br />
            <button
              className="btn mybtn "
              style={{ marginLeft: "40%" }}
              onClick={() => check()}
            >
              Login
            </button>
          </div>
        </div>
      </>
    );
  } else if (value == 1) {
    return (
      <>
        <Register_ />
      </>
    );
  }
};

export default Login;
