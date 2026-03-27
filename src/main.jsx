import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import VersionsPlayerScreen from "./screens/VersionsPlayerScreen";
import "./index.css";
import { useEffect, useState } from "react";

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const syncPathname = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", syncPathname);
    window.addEventListener("codex:navigate", syncPathname);

    return () => {
      window.removeEventListener("popstate", syncPathname);
      window.removeEventListener("codex:navigate", syncPathname);
    };
  }, []);

  return pathname;
}

function RootRouter() {
  const pathname = usePathname();

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
