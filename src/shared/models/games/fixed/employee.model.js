import mongoose from 'mongoose'

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    efficiency: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", EmployeeSchema);

const employeeModel = {
    Employee,
};