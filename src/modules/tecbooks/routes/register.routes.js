import express from "express";
import emailRateLimiter from "../middlewares/rate-limiter.middleware.js";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import registerControllers from "../controllers/register.controller.js";

const router = express.Router();

router.get("/get-institutions", registerControllers.getAllInstitutions);

// STUDENT REGISTRY ROUTES: request -> verify -> finalize
router.post("/student/request", emailRateLimiter, (req, res) => {
  // 1. Rate limiter middleware
  // 2. validate email matches institution's accepted domains
  // 3. generate verification token jwt with email, institution
  // 4. send email that contains button with link with jwt (exp for 1 hour)
});

router.get("/student/verify-invite-token", verifyJWT, (req, res) => {
  // 1. Verify JWT middleware
  // 4. generate new token with (exp for 15 minutes)
  // 5. return new token (email, institution, exp)
});

router.post("/student/finalize", verifyJWT, (req, res) => {
  // 1. Verify JWT middleware
  // 2. parse body (name, password, token)
  // 3. Call create user use-case
  // 4. generate
});

// PROFESSOR REGISTRY ROUTES:
// 1. request -> (approved by admin) -> finalize
// 2. join-from-invite
router.post(
  "/professor/request",
  emailRateLimiter,
  registerControllers.createProfessorRequest
);

router.get("/professor/verify-invite-token", verifyJWT, (req, res) => {
  // 1. Verify JWT middleware
  // 4. generate new token with (exp for 1 hour)
  // 5. return new token (email, institution, exp)
});

router.post("/professor/finalize", emailRateLimiter, async (req, res) => {});

router.post("/admin/accept-professor-request", verifyJWT, (req, res) => {});

router.post("/admin/decline-professor-request", verifyJWT, (req, res) => {});

router.post("/admin/invite-professor", verifyJWT, (req, res) => {});

export default router;
