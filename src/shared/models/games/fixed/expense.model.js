import mongoose from 'mongoose'

const ExpenseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["fixed", "variable", "one-time"], default: "fixed" },
    cost: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", ExpenseSchema);

const expenseModel = {
    Expense,
};