import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// Fetch all transactions
export const getTransactions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/transactions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        return [];
    }
};

// Add a new transaction
export const addTransaction = async (transaction) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/transactions`, transaction);
        return response.data;
    } catch (error) {
        console.error("Error adding transaction:", error.message);
        return null;
    }
};

// Edit/update a transaction
export const updateTransaction = async (id, updatedTransaction) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/transactions/${id}`, updatedTransaction);
        return response.data;
    } catch (error) {
        console.error("Error updating transaction:", error.message);
        return null;
    }
};

// Delete a transaction
export const deleteTransaction = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/transactions/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting transaction:", error.message);
        return false;
    }
};


export async function getBudgets() {
    const response = await axios.get(`${API_BASE_URL}/api/budgets`);
    return response.data;
}

export async function addBudget(category, amount) {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/budgets`, { category, amount });
        console.log("Budget added successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding budget:", error.response?.data || error.message);
        return null;
    }
}
