"use client";

import { useState } from "react";
import { addTransaction } from "../lib/api";

const categories = ["Food", "Entertainment", "Bills", "Shopping", "Others"];

export default function TransactionForm({ refreshData }) {
    const [formData, setFormData] = useState({
        amount: "",
        date: "",
        description: "",
        category: categories[0],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction(formData);
        refreshData();
        setFormData({ amount: "", date: "", description: "", category: categories[0] });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
            />

            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
            />

            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
            />

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border rounded mb-2"
            >
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                Add Transaction
            </button>
        </form>
    );
}
