"use client";

import { useEffect, useState } from "react";
import { getBudgets, setBudget } from "../lib/api";

export default function BudgetManager({ categories }) {
    const [budgets, setBudgets] = useState({});
    const [inputValues, setInputValues] = useState({});

    useEffect(() => {
        async function fetchBudgets() {
            const data = await getBudgets();
            const budgetMap = data.reduce((acc, b) => ({ ...acc, [b.category]: b.amount }), {});
            setBudgets(budgetMap);
        }
        fetchBudgets();
    }, []);

    const handleSetBudget = async (category) => {
        const amount = inputValues[category] || budgets[category] || 0;
        await setBudget(category, amount);
        setBudgets((prev) => ({ ...prev, [category]: amount }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md my-6">
            <h2 className="text-lg font-semibold mb-4">Manage Budgets</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category} className="flex justify-between items-center py-2">
                        <span>{category}</span>
                        <input
                            type="number"
                            value={inputValues[category] || budgets[category] || ""}
                            onChange={(e) =>
                                setInputValues((prev) => ({ ...prev, [category]: e.target.value }))
                            }
                            className="p-1 border rounded w-24"
                        />
                        <button
                            onClick={() => handleSetBudget(category)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                            Set
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
