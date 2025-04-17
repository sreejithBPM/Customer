import React, { useState } from "react";
import "../styles/Modal.css";

const AddPurchaseModal = ({ onClose, onSave }) => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!item || !quantity || !price) return;
    const newPurchase = {
      id: Date.now(),
      item,
      quantity,
      price,
      description,
    };
    onSave(newPurchase);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Add New Purchase</h3>
        <input
          type="text"
          placeholder="Item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseModal;