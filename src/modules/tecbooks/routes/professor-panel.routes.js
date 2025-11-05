import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import professorPanelControllers from "../controllers/professor-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.professor);

// My Games + Create Game Page
router.get("/get-my-games", professorPanelControllers.getMyGames);
router.get("/get-game", professorPanelControllers.getGame);

// Game Page
// get all students of the group to which the game belongs to
// get all teams
// create team
// add student to team and/or edit team (add various students, remove students, edit team name)
// activate game
// deactivate game
// end game

// Create game page
router.post("/create-game", professorPanelControllers.createGame);
// get default game configurations
// this includes get the boms, employees, assets, expenses,
// so the professor can choose which to include in the game

// Manage Groups Page
router.get("/get-my-groups", professorPanelControllers.getMyGroups);
router.get("/get-group", professorPanelControllers.getGroup);
router.post("/create-group", professorPanelControllers.createGroup);
// get all students in the institution so the professor can choose which students to add to the group
// add student to group
// activate grouop
// deactivate group

// Manage Classes Page
router.get("/get-my-classes", professorPanelControllers.getMyClasses);
router.get("/get-class", professorPanelControllers.getClass);
router.post("/create-class", professorPanelControllers.createClass);

// Inbox Page
router.get("/get-inbox", professorPanelControllers.getInbox);

// Profile Page
// Todo: add edit-profile route

export default router

// API Endpoints Summary

```
# Game Management
POST   /api/games                    # Create game
GET    /api/games/:id                # Get game details
PUT    /api/games/:id                # Update game
DELETE /api/games/:id                # Delete game
POST   /api/games/:id/activate       # Activate game
POST   /api/games/:id/complete       # End game

# Team Management
POST   /api/games/:gameId/teams      # Create team
GET    /api/games/:gameId/teams      # List teams
PUT    /api/teams/:id                # Update team
DELETE /api/teams/:id                # Delete team

# Gameplay
POST   /api/games/join               # Student joins game
GET    /api/runs/:id                 # Get run state
POST   /api/runs/:id/purchase-material
POST   /api/runs/:id/hire-employee
POST   /api/runs/:id/buy-asset
POST   /api/runs/:id/create-line
POST   /api/runs/:id/start-production
GET    /api/runs/:id/transactions    # Financial history
GET    /api/runs/:id/report          # Performance report

# Templates (Professor)
GET    /api/templates/boms           # Available BOMs
GET    /api/templates/employees      # Available employees
GET    /api/templates/assets         # Available assets
POST   /api/templates/boms           # Create custom BOM
# ... etc
```