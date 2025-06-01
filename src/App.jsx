import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./routes/Home";

import Expenses from "./routes/Expenses";

import Layout from "./components/Layout";
import FAQ from "./routes/FAQ";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path="faq" element={<FAQ/>} />
        
        <Route element={<Layout />}>
          <Route path="expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
