import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

const App = () => {
  return(
  <div className="container">
    <div>App home</div>
    <Register/>
    <Login/>
  </div>);
};

export default App;
