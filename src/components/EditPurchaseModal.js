import React, { useState } from "react";
import "../styles/Modal.css";

const EditPurchaseModal = ({ purchase, onClose, onSave }) => {
  const [item, setItem] = useState(purchase.item);
  const [quantity, setQuantity] = useState(purchase.quantity);
  const [price, setPrice] = useState(purchase.price);
  const [description, setDescription] = useState(purchase.description || "");

  const handleSave = () => {
    if (!item || !quantity || !price) return;
    const updatedPurchase = {
      ...purchase,
      item,
      quantity,
      price,
      description,
    };
    onSave(updatedPurchase);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Edit Purchase</h3>
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
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditPurchaseModal;