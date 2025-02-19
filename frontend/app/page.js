"use client";

import { useState, useEffect } from "react";
import TransactionForm from "@/src/components/TransactionForm";
import TransactionList from "@/src/components/TransactionList";
import ExpenseChart from "@/src/components/ExpenseChart";
import { getTransactions } from "@/src/lib/api";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-black px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="py-6 text-center">
        <h1 className="text-4xl font-extrabold text-blue-400">
          Personal Finance Visualizer
        </h1>
        <p className="text-gray-300 mt-2">
          Track and visualize your expenses easily.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
          <h2 className="text-xl text-white font-bold mb-4">Add Transaction</h2>
          <TransactionForm refreshData={fetchData} />
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
          <h2 className="text-xl text-white font-bold mb-4">Transaction List</h2>
          <TransactionList transactions={transactions} refreshData={fetchData} />
        </div>
      </main>

      <section className="max-w-6xl mx-auto mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl text-white font-bold mb-4">Expense Overview</h2>
        <ExpenseChart transactions={transactions} chartType="Category Distribution" />
      </section>
    </div>
  );
}