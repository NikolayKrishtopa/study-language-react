import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../public/vendor/fonts/fonts.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
