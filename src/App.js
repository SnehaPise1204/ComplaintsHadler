import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./PersonalCA/Home";
import AddComplaint from "./PersonalCA/Add";
import ShowComplaints from "./PersonalCA/Show";
import Login from "./PersonalCA/login";
import SignIn from "./PersonalCA/signIn";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <BrowserRouter>
      <Routes>

        {/* If already logged in → go to Home */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/Home" /> : <Login setUser={setUser} />} 
        />

        <Route 
          path="/signIn" 
          element={user ? <Navigate to="/Home" /> : <SignIn setUser={setUser} />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/Home" 
          element={user ? <Home /> : <Navigate to="/" />} 
        />

        <Route 
          path="/Add" 
          element={user ? <AddComplaint /> : <Navigate to="/" />} 
        />

        <Route 
          path="/Show" 
          element={user ? <ShowComplaints /> : <Navigate to="/" />} 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
