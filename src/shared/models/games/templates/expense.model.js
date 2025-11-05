import mongoose from 'mongoose'

const ExpenseTemplateSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Expense Details
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String }, // e.g., "utilities", "rent", "insurance", "marketing"
    type: { type: String, enum: ["fixed", "variable", "one-time"], default: "fixed" },
    
    // Cost
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ["monthly", "quarterly", "yearly", "one-time"], default: "monthly" },
    
    createdAt: { type: Date, default: Date.now },
});

const ExpenseTemplate = mongoose.model("ExpenseTemplate", ExpenseTemplateSchema);

const expenseTemplateModel = {
    ExpenseTemplate,
};

export default expenseTemplateModel;