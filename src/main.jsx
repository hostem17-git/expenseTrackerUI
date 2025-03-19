import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
// TODO: Category filter -> sync with chart selection
// TODO: Notifications
// Todo: auto signout
// TODO: Loading skeleton
// Todo: no data
// Edit expense
// Add expense
