import axios from "axios";
import { useEffect, useState } from "react";

const Material = () => {
  const [mt, setmt] = useState([]);
  const [sh0, setsh0] = useState(false);
  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/matl", {
        sid: localStorage.getItem("sid"),
        course: localStorage.getItem("language"),
      })
      .then((Response) => {
        setmt(Response.data);
        if (mt.length === 0) {
          setsh0("true");
        }
      });
  }, []);
  var p = "./materials/";
  return (
    <>
      <div>
        <br />
        <h4 className="text-center ">Materials</h4>
        <br />
        <div className="center">
          <div
            className="row border-0 bor  p-3 "
            style={{
              height: "70vh",
              width: "70vh",

              overflow: "auto",
            }}
          >
            {mt.map((m, i) => {
              return (
                <>
                  {" "}
                  <h1>
                    {i + 1}.
                    <a href={p + m + ".pdf"} download key={i}>
                      <button className="btn  mybtn ">
                        {" "}
                        <h5 className="btn btn-dark ">{m}</h5>
                      </button>
                    </a>
                  </h1>
                  <hr />
                </>
              );
            })}
            {sh0 && <p className="center">Nothing here</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Material;
