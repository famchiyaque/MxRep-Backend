import authRoutes from "./auth.routes.js"
import registerRoutes from "./register.routes.js"
// import adminPanelRoutes from "./admin-panel.routes.js"
// import professorPanelRoutes from "./professor-panel.routes.js"
// import studentPanelRoutes from "./student-panel.routes.js"
// import dashboardRoutes from "./dashboard.routes.js"

import express from "express"
const router = express.Router()

router.use("/mxrep/auth", authRoutes)
router.use("/mxrep/register", registerRoutes)
// router.use("/mxrep/admin-panel", adminPanelRoutes)
// router.use("/mxrep/professor-panel", professorPanelRoutes)
// router.use("/mxrep/student-panel", studentPanelRoutes)
// router.use("/mxrep/dashboard", dashboardRoutes)

export default router