import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
);
// TODO: Notifications
// Todo: auto signout
// Todo: no data
// Todo: Edit expense done, update date pending
// Todo: Add expense
// Todo: OTP login
