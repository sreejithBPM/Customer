import React from "react";
import "../styles/Modal.css";

const ViewPurchaseModal = ({ purchase, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Purchase Details</h3>
        <p><strong>ID:</strong> {purchase.id}</p>
        <p><strong>Item:</strong> {purchase.item}</p>
        <p><strong>Quantity:</strong> {purchase.quantity}</p>
        <p><strong>Price:</strong> ${purchase.price}</p>
        {purchase.description && (
          <p><strong>Description:</strong> {purchase.description}</p>
        )}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchaseModal;