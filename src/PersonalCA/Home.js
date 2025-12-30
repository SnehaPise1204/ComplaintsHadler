import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navTo = useNavigate();

  return (
    <>
      <header>
        <h1>ComplaintsHandler</h1>
        <p>Handle Complaints wisely</p>
      </header>

      <div className="nav-container">
        <div className="NavButton" onClick={() => navTo("/Add")}>
          Add Complaint
        </div>

        <div className="NavButton" onClick={() => navTo("/Show")}>
          Show Complaints
        </div>
      </div>
    </>
  );
}

export default Home;
