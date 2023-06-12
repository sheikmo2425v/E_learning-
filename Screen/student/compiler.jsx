import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading";

const Next = () => {
  const nav = useNavigate();
  const [output, setOutput] = useState("");
  const { state } = useLocation();
  const [code, setcode] = useState("print('hello')");
  const [language, setlanguage] = useState(localStorage.getItem("language"));
  const [i, seti] = useState(0);
  const [task, settask] = useState(state["task"]);
  const [answer, setanswer] = useState(state["answer"]);
  const [ashow, setshow] = useState("");
  const [f, setf] = useState(0);
  const [qid, setqid] = useState(state["qid"]);
  const [msg, setmsg] = useState("");
  const [sa, setsa] = useState("Show Answer");
  const [sh, setsh] = useState("");
  const setvalue = (e) => {
    var x = e;

    if (language != localStorage.getItem("language")) {
      settask("");
    } else {
      settask(state["task"]);
    }
    if (x === "java") {
      setcode(
        'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}'
      );
    } else if (x === "c") {
      setcode(
        '\n#include <stdio.h>\n\nint main() {\n  printf("Hello World!");\n  return 0;\n}'
      );
    } else if (x === "cpp") {
      setcode(
        '#include <iostream>\nusing namespace std;\n\nint main() {\n  cout << "Hello World!";\n  return 0;\n}'
      );
    } else if (x === "python3") {
      setcode("print('hello')");
    } else if (x === "html") {
      setcode(`
            <!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
</head>   
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
<script>
            alert("its me")
</script>
</html>`);
    }
    setlanguage(x);
    setOutput("");
  };

  const compile = () => {
    // var k = `a=[int(x) for x in input().split(" ")]\nprint(sum(a))`;
    if (language !== "html") {
      const value = {
        code: code,
        language: language,
        stdin: "12 18",
        sid: localStorage.getItem("sid"),
      };
      seti(3);
      axios.post("http://127.0.0.1:5000/compile", value).then((Response) => {
        seti(0);
        setOutput(Response.data["output"]);
      });
    } else {
      document.querySelector("#out").innerHTML = code;
    }
  };
  useEffect(() => {
    if (state["stage"] === "daily_task") {
      setsh("none");
    }

    setvalue(localStorage.getItem("language"));

    var value = { sid: localStorage.getItem("sid") };

    axios.post("http://127.0.0.1:5000/limit", value).then((Response) => {
      setf(Response.data[0][0]);

      if (Response.data[0][0] == 2) {
        setsa("Request to Admin");
      }
    });
  }, []);
  const submit = () => {
    setshow("");
    var value = {
      sid: localStorage.getItem("sid"),
      task: task,
      code: code,
      output: output,
      qid: qid,
      stage: state["stage"],
    };
    console.log(value);
    axios.post("http://127.0.0.1:5000/submit_task", value).then((Response) => {
      setmsg(Response.data);
    });
  };
  const back = () => {
    console.log("dsfjk");
    nav("/task", { state: state["stage"] });
  };
  const show = () => {
    setshow("");
    console.log(f);
    if (f >= 3) {
      if (f - 3 === 0) {
        setmsg(
          "Next time you can't see the answer if need to see the answer you request to your admin "
        );
      } else {
        setmsg("You have only" + (f - 3) + "chance");
      }
      setshow("Answer:" + answer);

      setvalue(localStorage.getItem("language"));

      var vl = { sid: localStorage.getItem("sid"), limit: f - 1 };
      console.log(vl);
      axios.post("http://127.0.0.1:5000/limit", vl).then((Response) => {
        setf(Response.data[0][0]);
        console.log(Response.data[0][0]);
        if (Response.data[0][0] == 2) {
          setsa("Request to Admin");
        }
      });
    } else if (f >= 2) {
      var value = { sid: localStorage.getItem("sid") };
      axios.post("http://127.0.0.1:5000/request", value).then((Response) => {
        setmsg(Response.data);
      });
    }
  };

  if (i === 0) {
    return (
      <>
        <div
          className="container-fluid main_bg"
          style={{ height: "100vh", position: "fixed", overflow: "auto" }}
        >
          <br />

          <button
            className="btn mybtn"
            style={{ marginLeft: "1%" }}
            onClick={back}
          >
            Back
          </button>
          <NavLink to="/">
            <button className="btn mybtn" style={{ marginLeft: "90%" }}>
              Home
            </button>
          </NavLink>
          <br />
          <br />
          <button className="row btn mybtn" style={{ marginLeft: "1%" }}>
            <b>{language}</b>
          </button>
          <br />
          <br />

          <div>
            <h5 className="col ">{task}</h5> <br />
            <div className="row" style={{ height: "56vh" }}>
              <div className="col">
                <textarea
                  className="  bor "
                  style={{ height: "55vh" }}
                  rows={13}
                  cols={96}
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                />
                <br />
              </div>
              <div
                className="col bor "
                style={{ height: "55vh", marginRight: "1%", overflow: "auto " }}
              >
                <h2>Output:</h2>
                <hr />
                <br />
                <div id="out">{output}</div>
              </div>
            </div>
            <br />
            <div className="col">
              <button
                className="btn mybtn "
                style={{ width: "18%", marginLeft: "2%" }}
                onClick={compile}
              >
                <b>Run</b>
              </button>
              <button
                className="btn mybtn"
                style={{ width: "20%", marginLeft: "19%" }}
                onClick={submit}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <b>Submit</b>
              </button>
              <button
                className="  col btn mybtn "
                style={{ width: "18%", marginLeft: "20%", display: sh }}
                data-bs-toggle="modal"
                data-bs-target="#myModal"
                onClick={show}
              >
                <b>{sa}</b>
              </button>
            </div>
          </div>
        </div>
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
                  <h4> {ashow}</h4>
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
  } else if (i == 3) {
    return (
      <>
        <Loading />
      </>
    );
  }

  // if (f === 2) {
  //   console.log(f);
  //   return (
  //     <>
  //       <div className="container">
  //         <button
  //           className="border"
  //           data-bs-toggle="modal"
  //           data-bs-target="#myModal"
  //           onClick={request}
  //         >
  //           request
  //         </button>
  //       </div>
  //       {loading()}
  //     </>
  //   );
  // }
};

export default Next;
