import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import mockCustomers from "./data/mockCustomers";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);

  const updatePurchases = (customerId, updatedPurchases) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === customerId ? { ...c, purchases: updatedPurchases } : c
      )
    );
  };

  return (
    <div className="app-container">
      <LeftPanel
        customers={customers}
        selectedId={selectedCustomerId}
        onSelect={setSelectedCustomerId}
      />
      <CenterPanel
        customer={selectedCustomer}
        updatePurchases={updatePurchases}
      />
      <RightPanel customer={selectedCustomer} />
    </div>
  );
}

export default App;