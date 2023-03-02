import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import ChatProvider from "./context/ChatProvider";
// import "./styles.scss";
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChatProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatProvider>
  </AuthProvider>
);
