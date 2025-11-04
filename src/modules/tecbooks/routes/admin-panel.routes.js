import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import adminPanelControllers from "../controllers/admin-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.institutionAdmin);

// Manage Professors + Professor Page
router.get("/get-institution-professors", adminPanelControllers.getInstitutionProfessors);
router.get("/get-professor", adminPanelControllers.getProfessor)
router.post("/invite-professor", adminPanelControllers.inviteProfessor)

// Manage Students + Student Page
router.get("/get-institution-students", adminPanelControllers.getInstitutionStudents);
router.get("/get-student", adminPanelControllers.getStudent)

// Inbox  + Professor Request Page
router.get("/get-inbox", adminPanelControllers.getInbox);
router.get("/get-professor-request", adminPanelControllers.getProfessorRequest);
router.post("/approve-professor", adminPanelControllers.approveProfessorRequest);
router.post("/decline-professor", adminPanelControllers.declineProfessorRequest);

export default router