import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Add.css";

function AddComplaint() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    district: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "complaints"), {
        ...form,
        createdAt: new Date(),
      });

      alert("Complaint added successfully");

      setForm({
        name: "",
        address: "",
        city: "",
        district: "",
        mobile: "",
      });
    } catch (error) {
      console.error("Error adding complaint:", error);
      alert("Failed to add complaint");
    }
  };


  return (
    <div className="Container">
      <div className="form-card">
        <h1>Enter Complaint</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              name="mobile"
              type="tel"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddComplaint;
