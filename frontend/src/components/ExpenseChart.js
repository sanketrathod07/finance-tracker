"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { getTransactions, getBudgets, addBudget } from "../lib/api";

const categories = ["Food", "Entertainment", "Bills", "Shopping", "Others"];


export default function ExpenseChart() {
    const [monthlyData, setMonthlyData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [newBudget, setNewBudget] = useState({ category: categories[0], amount: 0 });

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const transactions = await getTransactions();
        const budgetData = await getBudgets() || [];

        // Group transactions by month
        const groupedByMonth = transactions.reduce((acc, curr) => {
            const month = new Date(curr.date).toLocaleString("default", { month: "short" });
            acc[month] = (acc[month] || 0) + curr.amount;
            return acc;
        }, {});
        setMonthlyData(Object.entries(groupedByMonth).map(([key, value]) => ({ month: key, amount: value })));

        // Group transactions by category
        const groupedByCategory = transactions.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

        // Merge with budget data
        const categoryDataProcessed = Object.entries(groupedByCategory).map(([key, value]) => ({
            category: key,
            spent: value,
            budget: budgetData.find(b => b.category === key)?.amount || 0
        }));

        setCategoryData(categoryDataProcessed);
    }

    // 📌 Handle adding a new budget
    async function handleAddBudget() {
        if (!newBudget.category || newBudget.amount <= 0) {
            console.error("Please Enter All Fields");
            return;
        };


        await addBudget(newBudget.category, newBudget.amount);
        setNewBudget({ category: categories[0], amount: 0 });
        fetchData(); 
    }


    return (
        <div className="bg-white p-6 rounded-lg shadow-md my-6">
            <h2 className="text-lg font-semibold mb-4">Expense Charts</h2>

            {/* 📌 Budget Addition Form */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Add Budget</h3>
                <select
                    name="category"
                    value={newBudget.category}
                    onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                    className="border p-2 mr-2"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Amount"
                    value={newBudget.amount}
                    onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
                    className="border p-2 mr-2"
                />
                <button onClick={handleAddBudget} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Budget
                </button>
            </div>

            {/* 📌 Monthly Expense Chartttt */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Monthly Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4F46E5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 📌 Category-wise Expense Chrat */}
            <div className="mb-6">
                <h3 className="text-md font-semibold mb-2">Expenses by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="spent" fill="#E11D48" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 📌 Budget vs Spending Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md my-6">
                <h2 className="text-lg font-semibold mb-4">Budget vs. Spending</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="spent" fill="#E11D48" />
                        <Bar dataKey="budget" fill="#10B981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
