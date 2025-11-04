import express from "express";
import emailRateLimiter from "../middlewares/rate-limiter.middleware.js";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import registerControllers from "../controllers/register.controller.js";

const router = express.Router();

router.get("/get-institutions", registerControllers.getAllInstitutions);

// STUDENT REGISTRY ROUTES: request -> verify -> finalize
router.post("/student/request", emailRateLimiter, registerControllers.createStudentRequest);

router.get("/student/verify-token", verifyJWT, registerControllers.verifyStudentToken);

router.post("/student/finalize", verifyJWT, registerControllers.finalizeStudentRegistration);

// PROFESSOR REGISTRY ROUTES:
// 1. request -> (approved by admin) -> finalize
// 2. join-from-invite
router.post("/professor/request", emailRateLimiter, registerControllers.createProfessorRequest);

router.get("/professor/verify-invite-token", verifyJWT, (req, res) => {
  // 1. Verify JWT middleware
  // 4. generate new token with (exp for 1 hour)
  // 5. return new token (email, institution, exp)
});

router.post("/professor/finalize", emailRateLimiter, async (req, res) => {});

router.post("/institution/request", emailRateLimiter, registerControllers.createInstitutionRequest)

router.post("/admin/accept-professor-request", verifyJWT, (req, res) => {});

router.post("/admin/decline-professor-request", verifyJWT, (req, res) => {});

router.post("/admin/invite-professor", verifyJWT, (req, res) => {});

export default router;
