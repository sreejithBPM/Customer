import React from "react";
import "../styles/Panel.css";

const RightPanel = ({ customer }) => {
  if (!customer || !Array.isArray(customer.purchases)) {
    return (
      <div className="panel right-panel">
        <h3>Insights</h3>
        <p>Select a customer to view insights</p>
      </div>
    );
  }

  const totalPurchases = customer.purchases.length;
  const totalSpent = customer.purchases.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const totalQty = customer.purchases.reduce((sum, p) => sum + p.quantity, 0);
  const avgPurchaseValue = (totalSpent / totalPurchases).toFixed(2);

  const lastPurchase = customer.purchases[customer.purchases.length - 1];
  const topItem = customer.purchases.reduce((acc, curr) => {
    return acc.quantity > curr.quantity ? acc : curr;
  });

  return (
    <div className="panel right-panel">
      <h3>Insights</h3>

      <div className="stats-cards">
        <div className="card">
          <h4>Total Purchases</h4>
          <p>{totalPurchases}</p>
        </div>
        <div className="card">
          <h4>Total Quantity</h4>
          <p>{totalQty}</p>
        </div>
        <div className="card">
          <h4>Total Spent</h4>
          <p>${totalSpent.toFixed(2)}</p>
        </div>
        <div className="card">
          <h4>Avg. Value</h4>
          <p>${avgPurchaseValue}</p>
        </div>
      </div>

      <div className="insight-section">
        <h4>Top Purchased Item</h4>
        <p>{topItem.item} ({topItem.quantity} units)</p>
      </div>

      <div className="insight-section">
        <h4>Last Purchase</h4>
        <p>
          Item: <strong>{lastPurchase.item}</strong><br />
          Quantity: {lastPurchase.quantity}<br />
          Value: ${lastPurchase.price * lastPurchase.quantity}
        </p>
      </div>

      <div className="suggestion-box">
        <h4>Suggestions</h4>
        <ul>
          <li>🛒 Consider offering a bulk discount on {topItem.item}</li>
          <li>📊 Add invoice and feedback details for better insights</li>
          <li>🔁 Encourage repeat purchase with loyalty points</li>
        </ul>
      </div>
    </div>
  );
};

export default RightPanel;