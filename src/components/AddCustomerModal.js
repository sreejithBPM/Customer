import React, { useState } from "react";
import "../styles/CustomerModal.css"; // ensure this file exists
const AddCustomerModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purchases : []
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
  console.log("Submitting new customer:", form);
  if (form.name && form.email && form.phone) {
    onSave(form);
  } else {
    alert("All fields are required.");
  }
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Customer</h3>
        

        <div className="modal-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="modal-actions">
          
          <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;