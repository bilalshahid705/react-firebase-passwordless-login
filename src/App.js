import React from "react";
import Layout from "./components/layout";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </div>
  );
};

export default App;
