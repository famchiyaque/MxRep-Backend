import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import professorPanelControllers from "../controllers/professor-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.professor);

// My Games + Create Game Page
router.get("/get-my-games", professorPanelControllers.getMyGames);
router.get("/get-game", professorPanelControllers.getGame);
router.post("/create-game", professorPanelControllers.createGame);

// Manage Groups Page
router.get("/get-my-groups", professorPanelControllers.getMyGroups);
router.get("/get-group", professorPanelControllers.getGroup);
router.post("/create-group", professorPanelControllers.createGroup);

// Manage Classes Page
router.get("/get-my-classes", professorPanelControllers.getMyClasses);
router.get("/get-class", professorPanelControllers.getClass);
router.post("/create-class", professorPanelControllers.createClass);

// Inbox Page
router.get("/get-inbox", professorPanelControllers.getInbox);

// Profile Page
// Todo: add edit-profile route

export default router