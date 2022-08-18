import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./calculator";

const container = document.getElementById("giving-calculator");

if (container) {
  ReactDOM.render(<Calculator />, container);
}
