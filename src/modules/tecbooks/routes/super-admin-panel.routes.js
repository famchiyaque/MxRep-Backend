import cors from 'cors'
import express from "express";
// import emailRateLimiter from "../middlewares/rate-limiter.middleware.js";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js"
// import registerControllers from "../controllers/register.controller.js";
import superAdminControllers from "../controllers/super-admin-panel.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.superAdmin);

// Manage Institution Page
router.get("/get-all-institutions", superAdminControllers.getAllInstitutions)
router.get("/get-institution-by-id", superAdminControllers.getInstitutionById)

// Inbox Page
router.get("/get-inbox", superAdminControllers.getInbox);
router.get("/get-institution-request", superAdminControllers.getInstitutionRequest)
router.post("/approve-institution-request", superAdminControllers.approveInstitutionRequest)
router.post("/decline-institution-request", superAdminControllers.declineInstitutionRequest)


export default router