import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ Ensure this is correctly imported
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
