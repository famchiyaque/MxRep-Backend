import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema({
    gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    name: { type: String, required: true },
    studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
});
  
const Team = mongoose.model("Team", TeamSchema);

const teamModel = {
    Team,
};
  
export default teamModel