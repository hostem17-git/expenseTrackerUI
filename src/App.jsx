import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./routes/Home";
import User from "./routes/User";
import Auth from "./routes/Auth";

import Expenses from "./routes/Expenses";

import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route element={<Layout />}>
          <Route path="user" element={<User />} />
          <Route path="expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
