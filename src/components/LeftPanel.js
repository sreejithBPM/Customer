import React, { useState } from "react";
import "../styles/LeftPanel.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const LeftPanel = ({ customers, onSelect, selectedId }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectCustomer = (id) => {
    onSelect(id);
  };

  const handleEditCustomer = (id) => {
    console.log("Edit customer", id); // Implement edit functionality
  };

  const handleDeleteCustomer = (id) => {
    console.log("Delete customer", id); // Implement delete functionality
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="left-panel">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="customer-list">
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className={`customer-item ${customer.id === selectedId ? "selected" : ""}`}
            onClick={() => handleSelectCustomer(customer.id)}
          >
            <div className="customer-image">
              <img
                src={`https://i.pravatar.cc/150?img=${customer.id}`} // Random image URL, replace with actual image URL
                alt={`${customer.name}'s avatar`}
              />
            </div>
            <div className="customer-info">
              <h4>{customer.name}</h4>
              <p>{customer.email}</p> {/* Extra info like email */}
            </div>
            <div className="customer-status">
              <span
                className={`status-dot ${customer.status === "active" ? "active" : "inactive"}`}
              ></span>
              <span className="role-badge">{customer.role}</span>
            </div>
            <div className="customer-actions">
              <FaEdit onClick={() => handleEditCustomer(customer.id)} className="action-icon edit-icon" />
              <FaTrashAlt onClick={() => handleDeleteCustomer(customer.id)} className="action-icon delete-icon" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftPanel;