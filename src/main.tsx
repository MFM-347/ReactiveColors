import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

function Root() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

root.render(<Root />);
