const Loading = () => {
  return (
    <>
      <div
        className="container-fluid main_bg"
        style={{ height: "100%", position: "fixed" }}
      >
        <div
          className="container-fluid  center "
          style={{ alignItems: "center", marginTop: "20%" }}
        >
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
