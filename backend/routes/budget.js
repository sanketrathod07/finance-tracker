import express from "express";
import Budget from "../models/budget.js";

const router = express.Router();

// Get all budgets
router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Set or Update Budget
router.post("/", async (req, res) => {
    const { category, amount } = req.body;

    if (!category || amount === undefined) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        let budget = await Budget.findOne({ category });
        if (budget) {
            budget.amount = amount;
        } else {
            budget = new Budget({ category, amount });
        }
        await budget.save();
        res.status(201).json(budget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


export default router;
