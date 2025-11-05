import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import professorPanelControllers from "../controllers/professor-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.professor);

// ===== GAME ROUTES =====
// Manage Games Page
router.get("/get-my-games", professorPanelControllers.getMyGames);

// Extended Game Page
router.get("/get-game", professorPanelControllers.getGame);
router.post("/create-game", professorPanelControllers.createGame);
router.post("/update-game", professorPanelControllers.updateGame);
router.post("/activate-game", professorPanelControllers.activateGame);
router.post("/pause-game", professorPanelControllers.pauseGame);
router.post("/complete-game", professorPanelControllers.completeGame);
router.post("/delete-game", professorPanelControllers.deleteGame);

// ===== GROUP ROUTES =====
// Manage Groups Page
router.get("/get-my-groups", professorPanelControllers.getMyGroups);

// Extended Group Page
router.get("/get-group", professorPanelControllers.getGroup);
router.get("/get-institution-students", professorPanelControllers.getInstitutionStudents);
router.post("/create-group", professorPanelControllers.createGroup);
router.post("/update-group", professorPanelControllers.updateGroup);
router.post("/group/add-student", professorPanelControllers.addStudentToGroup);
router.post("/group/remove-student", professorPanelControllers.removeStudentFromGroup);
router.post("/delete-group", professorPanelControllers.deleteGroup);

// ===== CLASS ROUTES =====
// Manage Classes Page
router.get("/get-my-classes", professorPanelControllers.getMyClasses);

// Extended Class Page
router.get("/get-class", professorPanelControllers.getClass);
router.post("/create-class", professorPanelControllers.createClass);
router.post("/update-class", professorPanelControllers.updateClass);
router.post("/delete-class", professorPanelControllers.deleteClass);


// ===== TEAM ROUTES =====
router.get("/get-teams-by-game", professorPanelControllers.getTeamsByGame);
router.get("/get-team", professorPanelControllers.getTeam);
router.post("/create-team", professorPanelControllers.createTeam);
router.post("/update-team", professorPanelControllers.updateTeam);
router.post("/team/add-student", professorPanelControllers.addStudentToTeam);
router.post("/team/remove-student", professorPanelControllers.removeStudentFromTeam);
router.post("/team", professorPanelControllers.deleteTeam);


// ===== TEMPLATE ROUTES =====
// For extended game page, shows all available templates
router.get("/templates", professorPanelControllers.getAvailableTemplates);

// Will make a Templates Page later to edit, create and delete templates
router.post("/templates/bom", professorPanelControllers.createBOM);
router.post("/templates/employee", professorPanelControllers.createEmployeeTemplate);
router.post("/templates/asset", professorPanelControllers.createAssetTemplate);
router.post("/templates/material", professorPanelControllers.createMaterial);
router.post("/templates/process", professorPanelControllers.createProcess);
router.post("/templates/expense", professorPanelControllers.createExpenseTemplate);
router.post("/templates/job", professorPanelControllers.createJob);
router.post("/templates/skill", professorPanelControllers.createSkill);

// ===== GAME CONFIGURATION ROUTES =====
// Legacy: Get pre-made game configurations (not commonly used with new dynamic flow)
router.get("/game-configurations", professorPanelControllers.getAllGameConfigurations);
router.get("/game-configuration", professorPanelControllers.getGameConfiguration);

/**
 * GET /default-configs
 * 
 * Returns default configurations and available templates for game creation.
 * Used by "Create Game" page to show:
 * - Default order distribution settings (can be customized)
 * - Default premises settings (can be customized)
 * - Default game settings (initial capital, duration)
 * - Available BOMs for selection (professor chooses products)
 * - Available Expenses for selection (professor chooses fixed costs)
 * 
 * System automatically resolves:
 * - Materials (based on selected BOMs)
 * - Processes (based on selected BOMs)
 * - Assets (based on required processes)
 * - Jobs (based on required processes)
 * - Skills (based on required jobs)
 * - Employees (all available for hiring)
 */
router.get("/default-configs", professorPanelControllers.getDefaultConfigs);

// ===== INBOX ROUTE =====
router.get("/inbox", professorPanelControllers.getInbox);

export default router;
