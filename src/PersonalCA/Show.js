import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Timestamp, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import "./Show.css";

function ShowComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchType, setSearchType] = useState("city");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const snapshot = await getDocs(collection(db, "complaints"));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setComplaints(data);
    setFiltered(data);
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === "") {
      setFiltered(complaints);
      return;
    }

    const result = complaints.filter(c =>
      c[searchType]?.toString().toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(result);
  };

  const markCompleted = async (id) => {
    const complaintRef = doc(db, "complaints", id);

    await updateDoc(complaintRef, { 
      completed: true,
      completedAt: Timestamp.now()
    });

    const updated = complaints.map(c =>
      c.id === id 
        ? { ...c, completed: true, completedAt: Timestamp.now() }
        : c
    );

    setComplaints(updated);
    handleSearch(searchText);
  };

  const markInCompleted = async (id) => {
    const complaintRef = doc(db, "complaints", id);
    
    await updateDoc(complaintRef, { 
      completed: false,
      completedAt: null
    });

    const updated = complaints.map(c =>
      c.id === id
        ? { ...c, completed: false, completedAt: null }
        : c
    );

    setComplaints(updated);
    handleSearch(searchText);
  };

  const activeComplaints = filtered.filter(c => !c.completed);
  const completedComplaints = filtered.filter(c => c.completed);

  return (
    <div className="complaints-container">
      <div className="header-section">
        <h1>Complaints Dashboard</h1>
        <h2>All Complaints</h2>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="search-select"
        >
          <option value="city">Search by City</option>
          <option value="district">Search by District</option>
          <option value="name">Search by Name</option>
        </select>

        <input
          type="text"
          placeholder={`Enter ${searchType}...`}
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Active Complaints */}
      <div className="complaints-list">
        {activeComplaints.length === 0 ? (
          <div className="empty-state">
            <h3>No active complaints found</h3>
          </div>
        ) : (
          activeComplaints.map(c => (
            <div key={c.id} className="complaint-card">
              <ul className="complaint-details">
                <li><b>Name:</b> {c.name}</li>
                <li><b>Address:</b> {c.address}</li>
                <li><b>City:</b> {c.city}</li>
                <li><b>District:</b> {c.district}</li>
                <li><b>Mobile:</b> {c.mobile}</li>
              </ul>

              <button onClick={() => markCompleted(c.id)} className="complete-btn">
                Mark Completed
              </button>
            </div>
          ))
        )}
      </div>

      {/* Completed Complaints */}
      {completedComplaints.length > 0 && (
        <div className="completed-section">
          <h2>Completed Complaints</h2>

          {completedComplaints.map(c => (
            <div key={c.id} className="complaint-card completed">
              <ul className="complaint-details">
                <li><b>Name:</b> {c.name}</li>
                <li><b>Address:</b> {c.address}</li>
                <li><b>City:</b> {c.city}</li>
                <li><b>District:</b> {c.district}</li>
                <li><b>Mobile:</b> {c.mobile}</li>

                <li>
                  <b>Completed Date:</b>{" "}
                  {c.completedAt
                    ? c.completedAt.toDate().toLocaleDateString()
                    : "—"}
                </li>
              </ul>

              <button onClick={() => markInCompleted(c.id)} className="complete-btn">
                Place Complaint Again
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowComplaints;
