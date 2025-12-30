import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PersonalCA/Home";
import AddComplaint from "./PersonalCA/Add";
import ShowComplaints from "./PersonalCA/Show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add" element={<AddComplaint />} />
        <Route path="/Show" element={<ShowComplaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
