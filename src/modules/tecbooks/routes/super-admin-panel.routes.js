import cors from 'cors'
import express from "express";
// import emailRateLimiter from "../middlewares/rate-limiter.middleware.js";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js"
// import registerControllers from "../controllers/register.controller.js";
import superAdminControllers from "../controllers/super-admin-panel.controller.js";

const router = express.Router();

// router.get("/get-inbox", verifyJWT, rbac.superAdmin, superAdminControllers.getInbox)
router.get("/get-all-institutions", verifyJWT, rbac.superAdmin, superAdminControllers.getAllInstitutions)
router.get("/get-inbox", verifyJWT, rbac.superAdmin, superAdminControllers.getInbox);
router.get("/get-institution-request", verifyJWT, rbac.superAdmin, superAdminControllers.getInstitutionRequest)
router.post("/approve-institution-request", verifyJWT, rbac.superAdmin, superAdminControllers.approveInstitutionRequest)
router.post("/decline-institution-request", verifyJWT, rbac.superAdmin, superAdminControllers.declineInstitutionRequest)


export default router