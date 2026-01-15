import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import studentPanelControllers from "../controllers/student-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.student);

router.get("/get-my-games", studentPanelControllers.getMyGames);
// should return all games that the student is a member of, so that would be
// all active games that belong to a group that the student is a member of

router.get("/get-game", studentPanelControllers.getGame);
// should return full game object as well as the full team and users the 
// student is a member of 

router.get("/get-runs", studentPanelControllers.getRuns);
// should return all runs of this team in this game

router.post("/create-run", studentPanelControllers.createRun);
// should create run object which is instance of the game for the student

router.post("/activate-run", studentPanelControllers.activateRun);
// should turn status to active

router.post("/pause-run", studentPanelControllers.pauseRun);
// should turn status to paused or stopped

router.post("/complete-run", studentPanelControllers.completeRun);
// should turn status to completed

// Coming soon...
// router.get("/get-inbox", professorPanelControllers.getInbox);
// router.get("/update-profile", professorPanelControllers.updateProfile);

export default router;