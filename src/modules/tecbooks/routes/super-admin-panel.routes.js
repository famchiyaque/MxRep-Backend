import express from "express";
// import emailRateLimiter from "../middlewares/rate-limiter.middleware.js";
import verifyJWT from "../middlewares/token-verification.middleware.js";
// import registerControllers from "../controllers/register.controller.js";
import superAdminControllers from "../controllers/super-admin-panel.controller";

const router = express.Router();

router.get("/get-inbox", verifyJWT, superAdminControllers.getInbox);