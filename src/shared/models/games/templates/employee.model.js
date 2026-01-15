import mongoose from 'mongoose'

const EmployeeTemplateSchema = new mongoose.Schema({
    // Multi-tenancy & Ownership
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    scope: { type: String, enum: ["system", "institution", "professor"], default: "professor" },
    
    // Employee Template Details
    name: { type: String, required: true },
    description: { type: String, required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    
    // Performance
    baseEfficiency: { type: Number, required: true, default: 1.0, min: 0.1, max: 2.0 },
    
    // Cost
    monthlySalary: { type: Number, required: true },
    hiringCost: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now },
});

const EmployeeTemplate = mongoose.model("EmployeeTemplate", EmployeeTemplateSchema);

const employeeTemplateModel = {
    EmployeeTemplate,
};

export default employeeTemplateModel;