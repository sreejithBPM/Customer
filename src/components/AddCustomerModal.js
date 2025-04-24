import React, { useState } from "react";
import "../styles/Modal.css";

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
      <div className="modal">
        <h3>Add New Customer</h3>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;