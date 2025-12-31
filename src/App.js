import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PersonalCA/Home";
import AddComplaint from "./PersonalCA/Add";
import ShowComplaints from "./PersonalCA/Show";
import Login from "./PersonalCA/login";
import SignIn from "./PersonalCA/signIn";

function App() {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/signIn" element={<SignIn setUser={setUser} />} />
        <Route path="/Home" element={<Home user={user} />} />
        <Route path="/Add" element={<AddComplaint />} />
        <Route path="/Show" element={<ShowComplaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
