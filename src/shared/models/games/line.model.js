import mongoose from 'mongoose'

const LineSchema = new mongoose.Schema({
    runId: { type: mongoose.Schema.Types.ObjectId, ref: "Run", required: true },
    name: { type: String, required: true },
    processes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Process" }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    startedAt: { type: Date },
    endedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

const Line = mongoose.model("Line", LineSchema);

const lineModel = {
    Line,
};

export default lineModel