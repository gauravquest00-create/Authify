import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// React app ko HTML ke #root me inject karna
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);