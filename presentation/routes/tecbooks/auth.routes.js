const router = require("express").Router();
const authController = require("../../controllers/tecbooks/auth.controller.js");

router.post("/register/student/request", (req, res) => {
  // 1. no middleware for this route
  // 2. validate email matches institution's accepted domains
  // 3. generate verification token jwt with email, institution
  // 4. send email with link
  // 5. user opens and it taken to frontend
});

router.get("/register/student/verify", (req, res) => {
  // 1. get token from params
  // 2. verify signature and expiry
  // 3. return 200 OK if ok, error 400 if not
});

router.post("/register/student/finalize", (req, res) => {
  // 1. parse body (name, password, token)
  // 2. verify token again
  // 3. create user in the db
});

router.post("/auth/login", authController.loginController);

router.get("/auth/me", (req, res) => {
  // 1. parse jwt from cookies
  // 2. validate signature
  // 3. renew and return json of cookies for frontend context
});

module.exports = router;
