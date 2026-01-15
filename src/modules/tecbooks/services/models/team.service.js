import teamModel from "#src/shared/models/groups/team.model.js";
import { DatabaseError, NotFoundError } from "#src/utils/errors/AppError.js";

const createTeam = async (gameId, name, studentIds = []) => {
  try {
    const newTeam = await teamModel.Team.create({
      gameId,
      name,
      studentIds
    });

    return newTeam;
  } catch (err) {
    console.error("[Service] Error creating team:", err);
    
    if (err.code === 11000) {
      throw new DatabaseError("A team with this name already exists in this game", err);
    }
    
    throw new DatabaseError(`Failed to create team: ${err.message}`, err);
  }
};

const getTeamById = async (teamId) => {
  try {
    const team = await teamModel.Team.findById(teamId)
      .populate('gameId', 'name code status')
      .populate('studentIds', 'firstNames lastNames email');
    
    if (!team) {
      throw new NotFoundError(`Team with id ${teamId} not found`);
    }

    return team;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error getting team by id:", err);
    throw new DatabaseError(`Failed to get team: ${err.message}`, err);
  }
};

const getTeamsByGame = async (gameId) => {
  try {
    const teams = await teamModel.Team.find({ gameId })
      .populate('studentIds', 'firstNames lastNames email')
      .sort({ createdAt: -1 });

    return teams;
  } catch (err) {
    console.error("[Service] Error getting teams by game:", err);
    throw new DatabaseError(`Failed to get teams: ${err.message}`, err);
  }
};

const getTeamByStudent = async (gameId, studentId) => {
  try {
    const team = await teamModel.Team.findOne({ 
      gameId,
      studentIds: studentId 
    }).populate('studentIds', 'firstNames lastNames email');

    return team; // Can be null if student not in any team
  } catch (err) {
    console.error("[Service] Error getting team by student:", err);
    throw new DatabaseError(`Failed to get team: ${err.message}`, err);
  }
};

const updateTeam = async (teamId, updates) => {
  try {
    const updatedTeam = await teamModel.Team.findByIdAndUpdate(
      teamId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      throw new NotFoundError(`Team with id ${teamId} not found`);
    }

    return updatedTeam;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error updating team:", err);
    throw new DatabaseError(`Failed to update team: ${err.message}`, err);
  }
};

const addStudentToTeam = async (teamId, studentId) => {
  try {
    const updatedTeam = await teamModel.Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { studentIds: studentId } },
      { new: true, runValidators: true }
    ).populate('studentIds', 'firstNames lastNames email');

    if (!updatedTeam) {
      throw new NotFoundError(`Team with id ${teamId} not found`);
    }

    return updatedTeam;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error adding student to team:", err);
    throw new DatabaseError(`Failed to add student to team: ${err.message}`, err);
  }
};

const removeStudentFromTeam = async (teamId, studentId) => {
  try {
    const updatedTeam = await teamModel.Team.findByIdAndUpdate(
      teamId,
      { $pull: { studentIds: studentId } },
      { new: true, runValidators: true }
    ).populate('studentIds', 'firstNames lastNames email');

    if (!updatedTeam) {
      throw new NotFoundError(`Team with id ${teamId} not found`);
    }

    return updatedTeam;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error removing student from team:", err);
    throw new DatabaseError(`Failed to remove student from team: ${err.message}`, err);
  }
};

const deleteTeam = async (teamId) => {
  try {
    const deletedTeam = await teamModel.Team.findByIdAndDelete(teamId);

    if (!deletedTeam) {
      throw new NotFoundError(`Team with id ${teamId} not found`);
    }

    return deletedTeam;
  } catch (err) {
    if (err.statusCode) throw err;
    
    console.error("[Service] Error deleting team:", err);
    throw new DatabaseError(`Failed to delete team: ${err.message}`, err);
  }
};

const teamService = {
  createTeam,
  getTeamById,
  getTeamsByGame,
  getTeamByStudent,
  updateTeam,
  addStudentToTeam,
  removeStudentFromTeam,
  deleteTeam,
};

export default teamService;

