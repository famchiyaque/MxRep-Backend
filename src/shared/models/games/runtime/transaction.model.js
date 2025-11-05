import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    
    // Transaction Details
    transactionNumber: { type: String, required: true },
    type: { 
        type: String, 
        enum: ["inflow", "outflow"], 
        required: true 
    },
    category: { 
        type: String, 
        enum: [
            // Inflows
            "sales-revenue", "loan", "investment", "asset-sale", "other-income",
            // Outflows
            "material-purchase", "asset-purchase", "salary", "expense", 
            "loan-payment", "tax", "other-expense"
        ], 
        required: true 
    },
    
    // Amount
    amount: { type: Number, required: true },
    
    // Description & Context
    description: { type: String, required: true },
    notes: { type: String },
    
    // Related Entities (optional, for tracking)
    relatedOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    relatedAssetId: { type: mongoose.Schema.Types.ObjectId, ref: "PurchasedAsset" },
    relatedEmployeeId: { type: mongoose.Schema.Types.ObjectId, ref: "HiredEmployee" },
    relatedExpenseId: { type: mongoose.Schema.Types.ObjectId, ref: "RecurringExpense" },
    relatedInventoryItemId: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem" },
    
    // Accounting
    accountingPeriod: { type: Number }, // Month number
    fiscalYear: { type: Number },
    
    // Balance Impact
    balanceBefore: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    
    // Status
    status: { 
        type: String, 
        enum: ["pending", "completed", "cancelled", "failed"], 
        default: "completed" 
    },
    
    // Dates
    transactionDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Index for efficient queries
TransactionSchema.index({ runId: 1, transactionDate: -1 });
TransactionSchema.index({ runId: 1, category: 1 });

const Transaction = mongoose.model("Transaction", TransactionSchema);

const transactionModel = {
    Transaction,
};

export default transactionModel;

