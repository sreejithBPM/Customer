const API_BASE_URL = "https://localhost:7236/api/Customers"; // Adjust your port if needed

export const deleteCustomer = async (id) => {
    const response = await fetch(`${API_BASE_URL}/DeleteCustomer/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }
    return true;
  };

  export const addCustomer = async (newCustomer) => {
    console.log("Sending POST to AddCustomer:", newCustomer);
  
    const response = await fetch(`${API_BASE_URL}/AddCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add customer");
    }
  
    const data = await response.json();
    console.log("AddCustomer API response:", data);
    return data;
  };
  
  export const updateCustomer = async (id, updatedCustomer) => {
  console.log(`Sending PUT to UpdateCustomer/${id}:`, updatedCustomer);

  const response = await fetch(`${API_BASE_URL}/UpdateCustomer/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedCustomer),
  });

  if (!response.ok) {
    throw new Error("Failed to update customer");
  }

  const data = await response.json();
  console.log("UpdateCustomer API response:", data);
  return data;
};

  
export const fetchCustomers = async () => {
  const response = await fetch(`${API_BASE_URL}/GetAllCustomers`);
  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }
  return await response.json(); // Assumes API returns { customers: [...] }
};

export const addPurchase = async (customerId, purchase) => {
  const response = await fetch(`${API_BASE_URL}/AddPurchase/${customerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
  });

  
  if (!response.ok) {
    throw new Error("Failed to add purchase");
  }
  return await response.json(); // Assuming it returns the created purchase
};

export const updatePurchase = async (customerId, purchaseId, updatedPurchase) => {
  const response = await fetch(`${API_BASE_URL}/UpdatePurchase/${customerId}/${purchaseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPurchase),
  });
  if (!response.ok) {
    throw new Error("Failed to update purchase");
  }
  return await response.json();
};

export const deletePurchase = async (customerId, purchaseId) => {
  const response = await fetch(`${API_BASE_URL}/DeletePurchase/${customerId}/${purchaseId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete purchase");
  }
  return true;
};