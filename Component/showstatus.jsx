import axios from "axios";
import { useEffect, useState } from "react";

const Status = () => {
  const [st, setst] = useState([]);
  useEffect(() => {
    var ds = { sid: localStorage.getItem("sid") };

    axios.post("http://127.0.0.1:5000/status", ds).then((Response) => {
      setst(Response.data);
      setvalue(0);
    });
  }, []);
  return (
    <>
      {" "}
      <div
        className="container-fluid main_bg "
        style={{ height: "100vh", position: "fixed", overflow: "auto" }}
      >
        <br />

        <div />
        <h2 className="text-center ">Status</h2>
        <br />
        <br />
        <div className="row">
          <table
            className=" table table-dark"
            style={{
              width: "98%",
              border: "1px solid white",
              marginLeft: "1%",
              marginRight: "40%",
            }}
          >
            <thead style={{ height: "6vh" }}>
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
              </tr>
            </thead>
            <tbody>
              {st.map((d) => {
                return (
                  <>
                    <tr className="text-center">
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
};

export default Status;
