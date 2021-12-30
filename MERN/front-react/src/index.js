import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
ReactDOM.render(
  <Router>
    <Navbar></Navbar>
    <App />
  </Router>,
  document.getElementById("root")
);
