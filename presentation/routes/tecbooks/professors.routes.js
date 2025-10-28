const router = require("express").Router();
const { emailRateLimiter } = require("../../middlewares/tecbooks.middleware");
const createProfessorRequest =
  require("../../controllers/tecbooks/professors.controller").createProfessorRequest;

router.post(
  "/register/professor/request",
  emailRateLimiter,
  async (req, res) => {
    const professorRequest = await createProfessorRequest(req, res);
    // 2. create
    // 4. send that request to admin panel to approve or deny
    // 5. user opens and it taken to frontend with a message to wait for approval
  }
);

router.get("/register/professor/verify", (req, res) => {
  // 1. get token from params
  // 2. verify signature and expiry
  // 3. return 200 OK if ok, error 400 if not
});

router.post("/register/professor/finalize", (req, res) => {
  // 1. parse body (name, password, token)
  // 2. verify token again
  // 3. create user in the db
});

module.exports = router;
