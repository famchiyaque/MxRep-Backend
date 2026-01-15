import gameService from "../services/models/game.service.js";
import runService from "../services/models/run.service.js";
import teamService from "../services/models/team.service.js";
import groupService from "../services/models/group.service.js";
import { ForbiddenError, BadRequestError } from "#src/utils/errors/AppError.js";

const getMyGames = async (studentId) => {
  const games = await gameService.getGamesByStudent(studentId);
  return games;
}

const getGame = async (gameId, studentId) => {
  const game = await gameService.getGameById(gameId);
  
  // Verify student is in the group
  const group = await groupService.getGroupById(game.groupId._id || game.groupId);
  const groupMemberIds = group.members.map(m => m._id?.toString() || m.toString());
  
  if (!groupMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to access this game");
  }

  // Get the student's team in this game
  const team = await teamService.getTeamByStudent(gameId, studentId);
  
  // Convert game to plain object if it's a Mongoose document
  const gameObj = game.toObject ? game.toObject() : game;
  
  return {
    ...gameObj,
    myTeam: team
  };
}

const getRuns = async (gameId, teamId, studentId) => {
  // Verify student is in the team
  const team = await teamService.getTeamById(teamId);
  const teamMemberIds = team.studentIds.map(s => s._id?.toString() || s.toString());
  
  if (!teamMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to access these runs");
  }

  // Verify team belongs to the game
  const teamGameId = team.gameId._id?.toString() || team.gameId.toString();
  if (teamGameId !== gameId.toString()) {
    throw new BadRequestError("Team does not belong to this game");
  }

  const runs = await runService.getRunsByGame(gameId, teamId);
  return runs;
}

const createRun = async (gameId, teamId, studentId) => {
  // Verify student is in the team
  const team = await teamService.getTeamById(teamId);
  const teamMemberIds = team.studentIds.map(s => s._id?.toString() || s.toString());
  
  if (!teamMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to create runs for this team");
  }

  // Verify team belongs to the game
  const teamGameId = team.gameId._id?.toString() || team.gameId.toString();
  if (teamGameId !== gameId.toString()) {
    throw new BadRequestError("Team does not belong to this game");
  }

  // Get game to access configuration
  const game = await gameService.getGameById(gameId);
  
  // Verify game is active
  if (game.status !== "active") {
    throw new BadRequestError("Cannot create runs for games that are not active");
  }

  const run = await runService.createRun(gameId, teamId, game.configurationId._id || game.configurationId);
  return run;
}

const activateRun = async (runId, studentId) => {
  const run = await runService.getRunById(runId);
  
  // Verify student is in the team
  const team = await teamService.getTeamById(run.teamId._id || run.teamId);
  const teamMemberIds = team.studentIds.map(s => s._id?.toString() || s.toString());
  
  if (!teamMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to activate this run");
  }

  const activatedRun = await runService.activateRun(runId);
  return activatedRun;
}

const pauseRun = async (runId, studentId) => {
  const run = await runService.getRunById(runId);
  
  // Verify student is in the team
  const team = await teamService.getTeamById(run.teamId._id || run.teamId);
  const teamMemberIds = team.studentIds.map(s => s._id?.toString() || s.toString());
  
  if (!teamMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to pause this run");
  }

  const pausedRun = await runService.pauseRun(runId);
  return pausedRun;
}

const completeRun = async (runId, studentId) => {
  const run = await runService.getRunById(runId);
  
  // Verify student is in the team
  const team = await teamService.getTeamById(run.teamId._id || run.teamId);
  const teamMemberIds = team.studentIds.map(s => s._id?.toString() || s.toString());
  
  if (!teamMemberIds.includes(studentId.toString())) {
    throw new ForbiddenError("You don't have permission to complete this run");
  }

  const completedRun = await runService.completeRun(runId);
  return completedRun;
}

const studentPanelUseCases = {
    getMyGames,
    getGame,
    getRuns,
    createRun,
    activateRun,
    pauseRun,
    completeRun,
}

export default studentPanelUseCases;
