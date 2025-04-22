import React, { useState, useEffect } from "react";
import "../styles/CustomerModal.css";
const EditCustomerModal = ({ onClose, onSave, customer }) => {
  const [formData, setFormData] = useState({ ...customer });

  useEffect(() => {
    setFormData({ ...customer });
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData.id, formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Customer</h2>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Update</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;