import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TestOne from "./test/test_one";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<TestOne />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
