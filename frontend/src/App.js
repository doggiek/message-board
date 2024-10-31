import React from "react";
// import DefaultComponent from "./components/DefaultComponent";
import MessageBoard from "./components/MessageBoard";
import Arco from "./components/Arco";

const App = () => {
  return (
    <div className="example-div">
      <div className="head-title">MessageBoard Demo</div>
      <hr style={{ borderTop: "1px solid", width: "100%" }} />
      <div className="example-row">
        <MessageBoard />
      </div>
      <div className="example-row">
        <Arco />
      </div>
      {/* <div className="example-row">
        <DefaultComponent />
      </div> */}
    </div>
  );
};

export default App;
