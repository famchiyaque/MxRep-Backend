import mongoose from 'mongoose'

const RecurringExpenseSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    expenseTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseTemplate", required: true },
    
    // Expense Details
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    
    // Cost
    amount: { type: Number, required: true },
    frequency: { 
        type: String, 
        enum: ["monthly", "quarterly", "yearly", "one-time"], 
        default: "monthly" 
    },
    
    // Tracking
    totalPaid: { type: Number, default: 0 },
    paymentCount: { type: Number, default: 0 },
    
    // Status
    status: { 
        type: String, 
        enum: ["active", "paused", "cancelled", "completed"], 
        default: "active" 
    },
    
    // Dates
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    nextPaymentDate: { type: Date },
    lastPaymentDate: { type: Date },
    
    // Payment History
    payments: [{
        date: { type: Date },
        amount: { type: Number },
        transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const RecurringExpense = mongoose.model("RecurringExpense", RecurringExpenseSchema);

const recurringExpenseModel = {
    RecurringExpense,
};

export default recurringExpenseModel;

