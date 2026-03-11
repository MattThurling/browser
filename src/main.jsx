import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VersionsPlayerScreen from "./screens/VersionsPlayerScreen";
import "./index.css";

function RootRouter() {
  const pathname = window.location.pathname;

  if (pathname === "/player") {
    return <VersionsPlayerScreen />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
