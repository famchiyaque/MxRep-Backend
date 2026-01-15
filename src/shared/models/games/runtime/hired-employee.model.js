import mongoose from 'mongoose'

const HiredEmployeeSchema = new mongoose.Schema({
    // References
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    employeeTemplateId: { type: mongoose.Schema.Types.ObjectId, ref: "EmployeeTemplate", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    
    // Employee Instance Details
    employeeName: { type: String, required: true },
    employeeNumber: { type: String }, // Internal tracking number
    
    // Compensation
    monthlySalary: { type: Number, required: true },
    totalPaid: { type: Number, default: 0 },
    hiringCost: { type: Number, default: 0 },
    
    // Performance
    efficiency: { type: Number, default: 1.0 },
    productivityScore: { type: Number, default: 100 },
    hoursWorked: { type: Number, default: 0 },
    
    // Assignment
    status: { 
        type: String, 
        enum: ["active", "on-leave", "training", "terminated"], 
        default: "active" 
    },
    assignedToLineId: { type: mongoose.Schema.Types.ObjectId, ref: "Line" },
    assignedToProcessId: { type: mongoose.Schema.Types.ObjectId, ref: "ProcessStation" },
    
    // Dates
    hireDate: { type: Date, required: true },
    terminationDate: { type: Date },
    lastPaymentDate: { type: Date },
    
    // Training & Development
    trainingCompleted: [{
        skillId: { type: mongoose.Schema.Types.ObjectId, ref: "Skill" },
        completedDate: { type: Date },
        cost: { type: Number },
    }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const HiredEmployee = mongoose.model("HiredEmployee", HiredEmployeeSchema);

const hiredEmployeeModel = {
    HiredEmployee,
};

export default hiredEmployeeModel;

