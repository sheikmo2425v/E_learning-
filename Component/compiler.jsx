import axios from "axios";
import { useState } from "react";
import Loading from "./Loading";
const Main_compiler = () => {
  const [output, setOutput] = useState("");
  const [code, setcode] = useState("print('hello')");
  const [language, setlanguage] = useState("python3");
  const [values, setvalue] = useState(0);

  const setvale = (e) => {
    setlanguage(e.target.value);
    var x = e.target.value;
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
    setvalue(1);

    if (language !== "html") {
      if (language === "python3") {
        var t = 'File "jdoodle.py",';
      } else if (language === "cpp") {
        var t = "jdoodle.cpp:";
      } else if (language === "c") {
        var t = "jdoodle.c:";
      }

      const value = { code: code, language: language, stdin: "12 18" };

      axios.post("http://127.0.0.1:5000/compile", value).then((Response) => {
        setvalue(0);
        console.log(Response.data["output"]);

        setOutput(Response.data["output"].replace(new RegExp(t, "g"), ""));
      });
    } else {
      document.querySelector("#out").innerHTML = code;
      setvalue(0);
    }
  };
  if (values === 0) {
    return (
      <>
        <div>
          <select
            name="Languages"
            className="btn btn-dark"
            value={language}
            onChange={(e) => setvale(e)}
          >
            <option value="python3">python3</option>
            <option value="java">java</option>
            <option value="c">c</option>
            <option value="cpp">c++</option>
            <option value="html">Html</option>
          </select>
          <br />

          <br />

          <div className="row">
            <div className="col">
              <textarea
                className=" rounded-top rounded-bottom bor"
                style={{ height: "46vh" }}
                value={code}
                rows="15 "
                cols="95"
                onChange={(e) => setcode(e.target.value)}
              />
              <br />
            </div>
            <div
              className="col bor  border rounded-top rounded-bottom"
              style={{
                height: "46vh",
                marginRight: "1%",
                overflow: "auto",
              }}
            >
              {" "}
              <h2>Output:</h2>
              <hr />
              <br />
              <div id="out">{output}</div>
            </div>
          </div>
          <div>
            {" "}
            <button
              type="button"
              className="btn mybtn btn-md"
              style={{ marginLeft: "40%", width: "20%" }}
              onClick={compile}
            >
              <b>Run</b>{" "}
            </button>{" "}
          </div>
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

export default Main_compiler;
