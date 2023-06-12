import { useEffect, useState } from "react";
import Status from "./showstatus";
import axios from "axios";
import Loading from "./Loading";

const Marks = () => {
  const [mk, setmk] = useState([]);
  const [value, setvalue] = useState(0);
  useEffect(() => {
    setvalue("Sa");
    var ds = { sid: localStorage.getItem("sid") };

    axios.post("http://127.0.0.1:5000/mark", ds).then((Response) => {
      setmk(Response.data);
      setvalue(0);
    });
  }, []);
  if (value === 0) {
    return (
      <>
        {" "}
        <div
          className="container-fluid main_bg"
          style={{
            height: "100vh",

            position: "fixed",
            overflow: "auto",
          }}
        >
          <br />

          <button className="btn mybtn" onClick={() => setvalue(1)}>
            Status
          </button>
          <h2 className="text-center ">Marks</h2>
          <br />
          <br />
          <table
            className="table table-dark"
            style={{
              width: "98%",
              border: "1px solid white",
              marginLeft: "1%",
              marginRight: "40%",
            }}
          >
            <thead>
              <tr>
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Question
                </th>
                {/* <th>answer</th>
      <th>Output</th> */}
                <th
                  className="text-center"
                  style={{ border: "1px solid white" }}
                >
                  Mark
                </th>
              </tr>
            </thead>
            <tbody>
              {mk.map((m) => {
                return (
                  <>
                    <tr>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        {m[0]}
                      </td>
                      <td
                        className="text-center"
                        style={{ border: "1px solid white" }}
                      >
                        {m[1]}
                      </td>
                      {/* <td>{m[2]}</td>
            <td>{m[3]}</td> */}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  } else if (value === 1) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "scroll" }}
        >
          <br />
          <button
            className="btn mybtn"
            style={{ width: "6%", height: "6vh", marginLeft: "1%" }}
            onClick={() => setvalue(0)}
          >
            Back
          </button>
          <Status />
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

export default Marks;
