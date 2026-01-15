import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    // Ownership & Organization
    institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    
    // Game Info
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // Unique code for students to join
    description: { type: String },
    
    // Configuration
    configurationId: { type: mongoose.Schema.Types.ObjectId, ref: "GameConfiguration", required: true },
    
    // Status & Timing
    status: { type: String, enum: ["draft", "active", "paused", "completed", "archived"], default: "draft" },
    startDate: { type: Date },
    endDate: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
  
const Game = mongoose.model("Game", GameSchema);
  
const GameModel = {
    Game,
};
  
export default GameModel;