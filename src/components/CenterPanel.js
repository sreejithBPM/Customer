import React, { useState } from "react";
import "../styles/Panel.css";
import AddPurchaseModal from "./AddPurchaseModal";
import ViewPurchaseModal from "./ViewPurchaseModal";
import EditPurchaseModal from "./EditPurchaseModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { addPurchase, updatePurchase, deletePurchase } from "../services/CustomerService";
import Toast from "./Toast";
const ITEMS_PER_PAGE = 5;

const CenterPanel = ({ customer, updatePurchases }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewPurchase, setViewPurchase] = useState(null);
  const [editPurchase, setEditPurchase] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Purchases");

  const handleAddPurchase = async (newPurchase) => {
    try {
      const created = await addPurchase(customer.id, newPurchase);
      updatePurchases(customer.id, [...customer.purchases, created]);
      setShowAddModal(false);
      setToastMessage("Purchase added successfully!");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to add purchase.Please check your connection.");
    }
  };

  if (!customer) {
    return <div className="center-panel"><p>Select a customer to view details.</p></div>;
  }
  
  if (!customer.purchases || customer.purchases.length === 0) {
    return (
      <div className="panel center-panel">
        <div className="panel-header">
          <h3>{customer.name}'s Purchases</h3>
          <button className="add-button" onClick={() => setShowAddModal(true)}>Add First Purchase</button>
        </div>
        <p>No purchases found for this customer.</p>
  
        {/* Toast */}
        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
  
        {/* Add Modal */}
        {showAddModal && (
          <AddPurchaseModal
            onClose={() => setShowAddModal(false)}
            onSave={handleAddPurchase}
          />
        )}
      </div>
    );
  }
  const totalPages = Math.ceil(customer.purchases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPurchases = customer.purchases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  

  const handleEditPurchase = async (updatedPurchase) => {
    try {
      const result = await updatePurchase(customer.id, updatedPurchase.id, updatedPurchase);
      const updated = customer.purchases.map((p) =>
        p.id === updatedPurchase.id ? result : p
      );
      updatePurchases(customer.id, updated);
      setEditPurchase(null);
      setToastMessage("Purchase updated successfully!");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to update purchase.");
    }
  };

  const handleDeletePurchase = async (id) => {
    try {
      await deletePurchase(customer.id, id);
      const updated = customer.purchases.filter((p) => p.id !== id);
      updatePurchases(customer.id, updated);
      setToastMessage("Purchase deleted.");
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to delete purchase.");
    }
  };
  const downloadInvoice = (purchase) => {
    const doc = new jsPDF();
    const logoImg = new Image();
  logoImg.src = "/logo1234.jpg"; // place your logo in /public/logo.png

  logoImg.onload = () => {
    doc.addImage(logoImg, "PNG", 14, 10, 30, 15);

    doc.setFontSize(18);
    doc.text("Invoice", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Invoice ID: INV-${purchase.id}`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

    // Customer Info
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 55);
    doc.setFont("helvetica", "normal");
    doc.text(`${customer.name}`, 14, 61);
    doc.text(`Customer ID: ${customer.id}`, 14, 67);
    doc.text(`Address: ${customer.address || "123 Main Street, City, ZIP"}`, 14, 73);

  
    autoTable(doc,{
      startY: 85,
      head: [["Item", "Quantity", "Unit Price ($)", "Total ($)"]],
      body: [
        [
          purchase.item,
          purchase.quantity,
          `$${purchase.price.toFixed(2)}`,
          `$${(purchase.quantity * purchase.price).toFixed(2)}`
        ]
      ],
      theme: "grid",
    });

    // Summary
    const tax = 0.05 * purchase.quantity * purchase.price;
    const total = purchase.quantity * purchase.price + tax;

    doc.text(`Subtotal: $${(purchase.quantity * purchase.price).toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10);
    doc.text(`Tax (5%): $${tax.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 16);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${total.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 25);

    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your business!", 14, doc.lastAutoTable.finalY + 40);
    doc.text("For support, contact support@yourcompany.com", 14, doc.lastAutoTable.finalY + 46);

    // Save
    doc.save(`Invoice_${purchase.id}.pdf`);
  };
};

  return (
    <div className="panel center-panel">
      {/* Tabs */}
      <div className="tabs">
        {["Purchases", "Summary", "Invoices", "Feedback", "Timeline"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Purchases Tab */}
      {activeTab === "Purchases" && (
        <>
          <div className="panel-header">
            <h3>{customer.name}'s Purchases</h3>
            <button className="add-button" onClick={() => setShowAddModal(true)}>Add Details</button>
          </div>

          <table className="purchases-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Price ($)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPurchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>{purchase.item}</td>
                  <td>{purchase.quantity}</td>
                  <td>{purchase.price}</td>
                  <td>
                  <button className="action-btn view" onClick={() => setViewPurchase(purchase)}>View</button>
                  <button className="action-btn edit" onClick={() => setEditPurchase(purchase)}>Edit</button>
                  <button className="action-btn delete" onClick={() => handleDeletePurchase(purchase.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>Prev</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
          </div>
        </>
      )}

      {/* Summary Tab */}
      {activeTab === "Summary" && (
        <div className="summary-panel">
          <h3>Summary for {customer.name}</h3>
          <p>Total Purchases: {customer.purchases.length}</p>
          <p>Total Quantity: {customer.purchases.reduce((sum, p) => sum + p.quantity, 0)}</p>
          <p>Total Value: ${customer.purchases.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2)}</p>
        </div>
      )}

       {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

      {/* Invoices Tab */}
      {activeTab === "Invoices" && (
        <>
        <div className="panel-header">
          <h3>{customer.name}'s Invoices</h3>
        </div>
        <table className="purchases-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Total ($)</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {currentPurchases.map((purchase) => (
              <tr key={purchase.id}>
                <td>{purchase.id}</td>
                <td>{purchase.item}</td>
                <td>{(purchase.price * purchase.quantity).toFixed(2)}</td>
                <td>
                  <button className="invoice-btn" onClick={() => downloadInvoice(purchase)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}

      {/* Feedback Tab */}
      {activeTab === "Feedback" && (
        <div className="summary-panel">
          <h3>Feedback for {customer.name}</h3>
          <p>No feedback available yet. (Consider adding feedback forms or comments here.)</p>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "Timeline" && (
        <div className="summary-panel">
          <h3>Activity Timeline for {customer.name}</h3>
          <ul>
            <li>📅 Purchased 3 items on March 15</li>
            <li>📧 Sent invoice on April 1</li>
            <li>💬 Left feedback on April 2</li>
            <li>📝 Updated purchase on April 5</li>
            <li>💡 This is static, but can be made dynamic!</li>
          </ul>
        </div>
      )}

      {/* Toast */}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

      {/* Modals */}
      {showAddModal && (
        <AddPurchaseModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddPurchase}
        />
      )}
      {viewPurchase && (
        <ViewPurchaseModal
          purchase={viewPurchase}
          onClose={() => setViewPurchase(null)}
        />
      )}
      {editPurchase && (
        <EditPurchaseModal
          purchase={editPurchase}
          onClose={() => setEditPurchase(null)}
          onSave={handleEditPurchase}
        />
      )}
    </div>
  );
};

export default CenterPanel;