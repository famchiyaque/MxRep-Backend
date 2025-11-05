import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    professorId: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", required: true },
    name: { type: String, required: true },
    string: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    configurationId: { type: mongoose.Schema.Types.ObjectId, ref: "GameConfiguration", required: true },
    createdAt: { type: Date, default: Date.now },
});
  
const Game = mongoose.model("Game", GameSchema);
  
const GameModel = {
    Game,
};
  
export default GameModel