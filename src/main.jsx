import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
// TODO: Notifications
// Todo: auto signout
// Todo: no data
// Todo: Edit expense
// Todo: Add expense
// Todo: OTP login
