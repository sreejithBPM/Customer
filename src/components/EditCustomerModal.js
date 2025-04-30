import React, { useState, useEffect } from "react";
import "../styles/CustomerModal.css"; // ensure this file exists

const EditCustomerModal = ({ customer, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: customer.id,
    name: customer.name || "",
    email: customer.email || "",
    phone: customer.phone || "",
    purchases: customer.purchases || []
  });

  useEffect(() => {
    setForm({
      id: customer.id,
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      purchases: customer.purchases || []
    });
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const updatedCustomer = {
      ...form,
      purchases: form.purchases || []
    };
    console.log("Updating customer:", updatedCustomer);
    onSave(form.id, updatedCustomer);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Customer</h2>
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

export default EditCustomerModal;