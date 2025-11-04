import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import adminPanelControllers from "../controllers/admin-panel.controller.js";

const router = express.Router();

// Inbox and requests
router.get("/get-inbox", verifyJWT, rbac.institutionAdmin, adminPanelControllers.getInbox);
router.get("/get-professor-request", verifyJWT, rbac.institutionAdmin, adminPanelControllers.getProfessorRequest);
router.post("/approve-professor", verifyJWT, rbac.institutionAdmin, adminPanelControllers.approveProfessorRequest);
router.post("/decline-professor", verifyJWT, rbac.institutionAdmin, adminPanelControllers.declineProfessorRequest);

// Institution users
router.get("/get-institution-professors", verifyJWT, rbac.institutionAdmin, adminPanelControllers.getInstitutionProfessors);
router.get("/get-institution-students", verifyJWT, rbac.institutionAdmin, adminPanelControllers.getInstitutionStudents);

export default router