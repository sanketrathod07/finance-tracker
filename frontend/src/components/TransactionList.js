"use client";

import { useEffect, useState } from "react";
import { getTransactions, deleteTransaction, updateTransaction } from "../lib/api";


const categories = ["Food", "Entertainment", "Bills", "Shopping", "Others"];


export default function TransactionList({ refreshData }) {
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data = await getTransactions();
            setTransactions(data);
        }
        fetchData();
    }, [transactions]);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleDelete = async (id) => {
        await deleteTransaction(id);
        setTransactions(transactions.filter(t => t._id !== id));
    };

    const handleEditClick = (transaction) => {
        setEditTransaction(transaction._id);
        setEditForm({ ...transaction });
    };

    const handleChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await updateTransaction(editTransaction, editForm);
        setTransactions(transactions.map(t => (t._id === editTransaction ? { ...t, ...editForm } : t)));
        setEditTransaction(null);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4 h-[87%]">
            <h2 className="text-lg font-semibold mb-2">Transaction List</h2>
            <ul className="divide-y divide-gray-200">
                {transactions.map((t) => (
                    <li key={t._id} className="flex justify-between items-center py-2">
                        {editTransaction === t._id ? (
                            <div className="flex gap-2 flex-wrap">
                                <input
                                    type="text"
                                    name="description"
                                    value={editForm.description}
                                    onChange={handleChange}
                                    className="p-1 border rounded w-40"
                                />
                                <input
                                    type="number"
                                    name="amount"
                                    value={editForm.amount}
                                    onChange={handleChange}
                                    className="p-1 border rounded w-20"
                                />
                                <input
                                    type="date"
                                    name="date"
                                    value={editForm.date.split("T")[0]}
                                    onChange={handleChange}
                                    className="p-1 border rounded"
                                />
                                <select
                                    name="category"
                                    value={editForm.category}
                                    onChange={handleChange}
                                    className="p-1 border rounded"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <button onClick={handleSave} className="text-green-500 shadow-md p-1">✔️</button>
                                <button onClick={() => setEditTransaction(null)} className="text-gray-500 shadow-md p-1">❌</button>
                            </div>
                        ) : (
                            <span>{formatDate(t.date)} - {t.description} - ₹{t.amount}</span>
                        )}
                        <div>
                            {editTransaction !== t._id && (
                                <button onClick={() => handleEditClick(t)} className="text-yellow-500 mr-2">✏️</button>
                            )}
                            <button onClick={() => handleDelete(t._id)} className="text-red-500">🗑️</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
