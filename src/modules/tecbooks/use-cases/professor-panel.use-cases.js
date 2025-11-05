import classService from "../services/models/class.service.js";
import groupService from "../services/models/group.service.js";
import gameService from "../services/models/game.service.js";
import teamService from "../services/models/team.service.js";
import gameConfigurationService from "../services/models/game-configuration.service.js";
import templateService from "../services/models/template.service.js";
import userService from "../services/models/user.service.js";
import ordersConfigService from "../services/models/orders-config.service.js";
import premisesConfigService from "../services/models/premises-config.service.js";
import { BadRequestError, NotFoundError, ForbiddenError } from "#src/utils/errors/AppError.js";

// ===== STUDENT USE CASES =====
const getInstitutionStudents = async (institutionId) => {
  const students = await userService.getUsersByInstitutionAndRole(institutionId, 'student');
  return students;
};

// ===== CLASS USE CASES =====

const createClass = async (institutionId, professorId, name, description, code) => {
  const newClass = await classService.createClass(institutionId, professorId, name, description, code);
  return newClass;
};

const getMyClasses = async (professorId) => {
  const classes = await classService.getClassesByProfessor(professorId);
  return classes;
};

const getClass = async (classId, professorId) => {
  const classDoc = await classService.getClassById(classId);
  
  // Verify ownership
  if (classDoc.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to access this class");
  }
  
  return classDoc;
};

const updateClass = async (classId, professorId, updates) => {
  // Verify ownership
  const classDoc = await classService.getClassById(classId);
  if (classDoc.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to update this class");
  }
  
  const updatedClass = await classService.updateClass(classId, updates);
  return updatedClass;
};

const deleteClass = async (classId, professorId) => {
  // Verify ownership
  const classDoc = await classService.getClassById(classId);
  if (classDoc.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to delete this class");
  }
  
  const deletedClass = await classService.deleteClass(classId);
  return deletedClass;
};

// ===== GROUP USE CASES =====

const createGroup = async (classId, professorId, name, description, code) => {
  // Verify class ownership
  const classDoc = await classService.getClassById(classId);
  if (classDoc.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to create groups in this class");
  }
  
  const newGroup = await groupService.createGroup(classId, professorId, name, description, code);
  return newGroup;
};

const getMyGroups = async (professorId) => {
  const groups = await groupService.getGroupsByProfessor(professorId);
  return groups;
};

const getGroup = async (groupId, professorId) => {
  const group = await groupService.getGroupById(groupId);
  
  // Verify ownership
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to access this group");
  }
  
  return group;
};

const updateGroup = async (groupId, professorId, updates) => {
  // Verify ownership
  const group = await groupService.getGroupById(groupId);
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to update this group");
  }
  
  const updatedGroup = await groupService.updateGroup(groupId, updates);
  return updatedGroup;
};

const addStudentToGroup = async (groupId, professorId, studentId) => {
  // Verify ownership
  const group = await groupService.getGroupById(groupId);
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to modify this group");
  }
  
  // Verify student exists and is in same institution
  const student = await userService.getUserById(studentId);
  if (student.role !== 'student') {
    throw new BadRequestError("User is not a student");
  }
  
  const updatedGroup = await groupService.addStudentToGroup(groupId, studentId);
  return updatedGroup;
};

const removeStudentFromGroup = async (groupId, professorId, studentId) => {
  // Verify ownership
  const group = await groupService.getGroupById(groupId);
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to modify this group");
  }
  
  const updatedGroup = await groupService.removeStudentFromGroup(groupId, studentId);
  return updatedGroup;
};

const deleteGroup = async (groupId, professorId) => {
  // Verify ownership
  const group = await groupService.getGroupById(groupId);
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to delete this group");
  }
  
  const deletedGroup = await groupService.deleteGroup(groupId);
  return deletedGroup;
};

// ===== GAME USE CASES =====

const createGame = async (institutionId, professorId, gameData) => {
  // Verify group ownership
  const group = await groupService.getGroupById(gameData.groupId);
  if (group.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to create games for this group");
  }
  
  // Step 1: Create OrdersConfig
  const ordersConfig = await ordersConfigService.createOrdersConfig(
    gameData.ordersConfig || ordersConfigService.getDefaultOrdersConfig()
  );
  
  // Step 2: Create or use PremisesConfig
  let premisesConfigId;
  if (gameData.premisesConfigId) {
    // Use existing premises config
    premisesConfigId = gameData.premisesConfigId;
  } else if (gameData.premisesConfig) {
    // Create new premises config
    const premisesConfig = await premisesConfigService.createPremisesConfig(gameData.premisesConfig);
    premisesConfigId = premisesConfig._id;
  } else {
    // Create default premises config
    const defaultPremises = premisesConfigService.getDefaultPremisesConfig();
    const premisesConfig = await premisesConfigService.createPremisesConfig(defaultPremises);
    premisesConfigId = premisesConfig._id;
  }
  
  // Step 3: Create GameConfiguration
  const gameConfiguration = await gameConfigurationService.createGameConfiguration({
    name: gameData.configurationName || `${gameData.name} Configuration`,
    description: gameData.configurationDescription || `Configuration for ${gameData.name}`,
    initialCapital: gameData.initialCapital || 1000000,
    gameDurationMonths: gameData.gameDurationMonths || 12,
    premisesConfigId: premisesConfigId,
    ordersConfigId: ordersConfig._id,
    availableAssetIds: gameData.selectedAssetIds || [],
    availableEmployeeIds: gameData.selectedEmployeeIds || [],
    availableBOMIds: gameData.selectedBOMIds || [],
    availableExpenseIds: gameData.selectedExpenseIds || [],
    availableMaterialIds: gameData.selectedMaterialIds || [],
    availableProcessIds: gameData.selectedProcessIds || [],
  });
  
  // Step 4: Create Game
  const newGame = await gameService.createGame(
    institutionId,
    professorId,
    gameData.groupId,
    gameConfiguration._id,
    gameData.name,
    gameData.description
  );
  
  return newGame;
};

const getMyGames = async (professorId) => {
  const games = await gameService.getGamesByProfessor(professorId);
  return games;
};

const getGame = async (gameId, professorId) => {
  const game = await gameService.getGameById(gameId);
  
  // Verify ownership
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to access this game");
  }
  
  return game;
};

const updateGame = async (gameId, professorId, updates) => {
  // Verify ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to update this game");
  }
  
  const updatedGame = await gameService.updateGame(gameId, updates);
  return updatedGame;
};

const activateGame = async (gameId, professorId) => {
  // Verify ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to activate this game");
  }
  
  if (game.status !== 'draft' && game.status !== 'paused') {
    throw new BadRequestError("Game can only be activated from draft or paused status");
  }
  
  const activatedGame = await gameService.activateGame(gameId);
  return activatedGame;
};

const pauseGame = async (gameId, professorId) => {
  // Verify ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to pause this game");
  }
  
  if (game.status !== 'active') {
    throw new BadRequestError("Only active games can be paused");
  }
  
  const pausedGame = await gameService.pauseGame(gameId);
  return pausedGame;
};

const completeGame = async (gameId, professorId) => {
  // Verify ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to complete this game");
  }
  
  const completedGame = await gameService.completeGame(gameId);
  return completedGame;
};

const deleteGame = async (gameId, professorId) => {
  // Verify ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to delete this game");
  }
  
  const deletedGame = await gameService.deleteGame(gameId);
  return deletedGame;
};

// ===== TEAM USE CASES =====

const createTeam = async (gameId, professorId, name, studentIds) => {
  // Verify game ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to create teams for this game");
  }
  
  // Verify all students exist and are in the group
  const group = await groupService.getGroupById(game.groupId._id);
  const groupMemberIds = group.members.map(m => m._id.toString());
  
  for (const studentId of studentIds) {
    if (!groupMemberIds.includes(studentId.toString())) {
      throw new BadRequestError(`Student ${studentId} is not in the game's group`);
    }
  }
  
  const newTeam = await teamService.createTeam(gameId, name, studentIds);
  return newTeam;
};

const getTeamsByGame = async (gameId, professorId) => {
  // Verify game ownership
  const game = await gameService.getGameById(gameId);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to view teams for this game");
  }
  
  const teams = await teamService.getTeamsByGame(gameId);
  return teams;
};

const getTeam = async (teamId, professorId) => {
  const team = await teamService.getTeamById(teamId);
  
  // Verify game ownership
  const game = await gameService.getGameById(team.gameId._id);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to access this team");
  }
  
  return team;
};

const updateTeam = async (teamId, professorId, updates) => {
  const team = await teamService.getTeamById(teamId);
  
  // Verify game ownership
  const game = await gameService.getGameById(team.gameId._id);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to update this team");
  }
  
  const updatedTeam = await teamService.updateTeam(teamId, updates);
  return updatedTeam;
};

const addStudentToTeam = async (teamId, professorId, studentId) => {
  const team = await teamService.getTeamById(teamId);
  
  // Verify game ownership
  const game = await gameService.getGameById(team.gameId._id);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to modify this team");
  }
  
  // Verify student is in the group
  const group = await groupService.getGroupById(game.groupId._id);
  const groupMemberIds = group.members.map(m => m._id.toString());
  
  if (!groupMemberIds.includes(studentId.toString())) {
    throw new BadRequestError("Student is not in the game's group");
  }
  
  const updatedTeam = await teamService.addStudentToTeam(teamId, studentId);
  return updatedTeam;
};

const removeStudentFromTeam = async (teamId, professorId, studentId) => {
  const team = await teamService.getTeamById(teamId);
  
  // Verify game ownership
  const game = await gameService.getGameById(team.gameId._id);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to modify this team");
  }
  
  const updatedTeam = await teamService.removeStudentFromTeam(teamId, studentId);
  return updatedTeam;
};

const deleteTeam = async (teamId, professorId) => {
  const team = await teamService.getTeamById(teamId);
  
  // Verify game ownership
  const game = await gameService.getGameById(team.gameId._id);
  if (game.professorId._id.toString() !== professorId.toString()) {
    throw new ForbiddenError("You don't have permission to delete this team");
  }
  
  const deletedTeam = await teamService.deleteTeam(teamId);
  return deletedTeam;
};

// ===== TEMPLATE USE CASES =====

const getAvailableTemplates = async (institutionId, professorId) => {
  const [boms, employees, assets, materials, processes, expenses, jobs, skills] = await Promise.all([
    templateService.getBOMs(institutionId, professorId),
    templateService.getEmployeeTemplates(institutionId, professorId),
    templateService.getAssetTemplates(institutionId, professorId),
    templateService.getMaterials(institutionId, professorId),
    templateService.getProcesses(institutionId, professorId),
    templateService.getExpenseTemplates(institutionId, professorId),
    templateService.getJobs(institutionId, professorId),
    templateService.getSkills(institutionId, professorId),
  ]);
  
  return {
    boms,
    employees,
    assets,
    materials,
    processes,
    expenses,
    jobs,
    skills,
  };
};

const createBOM = async (institutionId, professorId, bomData) => {
  const newBOM = await templateService.createBOM({
    ...bomData,
    institutionId,
    professorId,
    scope: bomData.scope || "professor",
  });
  return newBOM;
};

const createEmployeeTemplate = async (institutionId, professorId, employeeData) => {
  const newEmployee = await templateService.createEmployeeTemplate({
    ...employeeData,
    institutionId,
    professorId,
    scope: employeeData.scope || "professor",
  });
  return newEmployee;
};

const createAssetTemplate = async (institutionId, professorId, assetData) => {
  const newAsset = await templateService.createAssetTemplate({
    ...assetData,
    institutionId,
    professorId,
    scope: assetData.scope || "professor",
  });
  return newAsset;
};

const createMaterial = async (institutionId, professorId, materialData) => {
  const newMaterial = await templateService.createMaterial({
    ...materialData,
    institutionId,
    professorId,
    scope: materialData.scope || "professor",
  });
  return newMaterial;
};

const createProcess = async (institutionId, professorId, processData) => {
  const newProcess = await templateService.createProcess({
    ...processData,
    institutionId,
    professorId,
    scope: processData.scope || "professor",
  });
  return newProcess;
};

const createExpenseTemplate = async (institutionId, professorId, expenseData) => {
  const newExpense = await templateService.createExpenseTemplate({
    ...expenseData,
    institutionId,
    professorId,
    scope: expenseData.scope || "professor",
  });
  return newExpense;
};

const createJob = async (institutionId, professorId, jobData) => {
  const newJob = await templateService.createJob({
    ...jobData,
    institutionId,
    professorId,
    scope: jobData.scope || "professor",
  });
  return newJob;
};

const createSkill = async (institutionId, professorId, skillData) => {
  const newSkill = await templateService.createSkill({
    ...skillData,
    institutionId,
    professorId,
    scope: skillData.scope || "professor",
  });
  return newSkill;
};

// ===== GAME CONFIGURATION USE CASES =====

const getAllGameConfigurations = async () => {
  const configs = await gameConfigurationService.getAllGameConfigurations();
  return configs;
};

const getGameConfiguration = async (configId) => {
  const config = await gameConfigurationService.getGameConfigurationById(configId);
  return config;
};

const getDefaultConfigs = async () => {
  const ordersConfig = ordersConfigService.getDefaultOrdersConfig();
  const premisesConfig = premisesConfigService.getDefaultPremisesConfig();
  
  return {
    ordersConfig,
    premisesConfig,
    gameSettings: {
      initialCapital: 1000000,
      gameDurationMonths: 12,
    }
  };
};

const professorPanelUseCases = {
  // Students
  getInstitutionStudents,
  // Classes
  createClass,
  getMyClasses,
  getClass,
  updateClass,
  deleteClass,
  
  // Groups
  createGroup,
  getMyGroups,
  getGroup,
  updateGroup,
  addStudentToGroup,
  removeStudentFromGroup,
  deleteGroup,
  
  // Games
  createGame,
  getMyGames,
  getGame,
  updateGame,
  activateGame,
  pauseGame,
  completeGame,
  deleteGame,
  
  // Teams
  createTeam,
  getTeamsByGame,
  getTeam,
  updateTeam,
  addStudentToTeam,
  removeStudentFromTeam,
  deleteTeam,
  
  // Templates
  getAvailableTemplates,
  createBOM,
  createEmployeeTemplate,
  createAssetTemplate,
  createMaterial,
  createProcess,
  createExpenseTemplate,
  createJob,
  createSkill,
  
  // Game Configurations
  getAllGameConfigurations,
  getGameConfiguration,
  getDefaultConfigs,
};

export default professorPanelUseCases;
