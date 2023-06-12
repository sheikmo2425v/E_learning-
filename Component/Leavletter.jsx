import axios from "axios";
import { useState } from "react";

const LeaveLetter = () => {
  const [wdate, setwdate] = useState("");
  const [edate, setedate] = useState("");
  const [reason, setreason] = useState("");
  const leave = () => {
    if (wdate !== "" && edate !== "" && reason !== "") {
      var value = {
        sid: localStorage.getItem("sid"),
        wdate: wdate,
        edate: edate,
        reason: reason,
      };
      axios.post("http://127.0.0.1:5000/leave", value).then((Response) => {
        alert(Response.data);
        setvalue(0);
        setwdate("");
        setedate("");
        setreason("");
      });
    } else {
      alert("Fill the form");
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div
        className="border-0 bor p-3"
        style={{ width: "40%", height: "61%", marginLeft: "30%" }}
      >
        <br />
        <h3 className="text-center">Leave Letter</h3>
        <br />
        <label htmlFor="wd">
          <b>From Date</b>
        </label>
        <br />
        <input
          type="date"
          className="form-control"
          value={wdate}
          onChange={(e) => setwdate(e.target.value)}
          id="wd"
          name="wd"
        />
        <br />
        <label htmlFor="ed">
          <b>To Date</b>
        </label>
        <br />
        <input
          type="date"
          className="form-control"
          value={edate}
          onChange={(e) => setedate(e.target.value)}
          name="ed"
          id="ed"
        />{" "}
        <br />
        <label htmlFor="r">
          <b>Reason</b>
        </label>{" "}
        <br />
        <textarea
          name="r"
          id="r"
          className="form-control"
          placeholder="Why you need leave"
          onChange={(e) => setreason(e.target.value)}
        />
        <br />
        <button
          className="btn mybtn"
          onClick={leave}
          style={{ marginLeft: "42%" }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default LeaveLetter;
