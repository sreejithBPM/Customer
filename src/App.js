import React, { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
//import mockCustomers from "./data/mockCustomers";
import "./App.css";
import { fetchCustomers,deleteCustomer , addCustomer,updateCustomer,} from "./services/CustomerService";
import AddCustomerModal from "./components/AddCustomerModal";
import EditCustomerModal from "./components/EditCustomerModal";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      console.log("Fetched data:", data);
      
      if (data?.customers) {
        setCustomers(data.customers);
      } else {
        console.error("API returned unexpected structure:", data);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };


  const handleAddCustomer = async (newCustomer) => {
    console.log("Attempting to add customer:", newCustomer); // log input
    try {
      const saved = await addCustomer(newCustomer);
      console.log("Customer added successfully:", saved); // log response
      setCustomers(prev => [...prev, saved]);
      setShowAddModal(false);
    } catch (err) {
      console.error("Error adding customer:", err);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditCustomerData(customer);
  };

  const handleUpdateCustomer = async (id, updatedCustomer) => {
    console.log(`Updating customer with ID ${id}:`, updatedCustomer); // log input
  
    try {
      const saved = await updateCustomer(id, updatedCustomer);
      console.log("Customer updated successfully:", saved); // log response
  
      setCustomers(prev => prev.map(c => c.id === id ? saved : c));
      setEditCustomerData(null);
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };


  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(prev => prev.filter(c => c.id !== id)); // remove from UI
      if (selectedCustomerId === id) setSelectedCustomerId(null); // reset selected
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

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
        onAddCustomer={() => setShowAddModal(true)}
        onEditCustomer={handleEditCustomer}
        onDelete={handleDeleteCustomer} 
      />
      <CenterPanel
        customer={selectedCustomer}
        updatePurchases={updatePurchases}
      />
      <RightPanel customer={selectedCustomer} />

      {showAddModal && <AddCustomerModal onClose={() => setShowAddModal(false)} onSave={handleAddCustomer} />}
      {editCustomerData && (
        <EditCustomerModal
          customer={editCustomerData}
          onClose={() => setEditCustomerData(null)}
          onSave={handleUpdateCustomer}
        />
      )}
    </div>
  );
}

export default App;