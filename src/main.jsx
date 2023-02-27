import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthProvider>
);
