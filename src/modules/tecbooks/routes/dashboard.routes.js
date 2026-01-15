// /overview
// /production
// /financial-statements
// /financial-health
// /forecasts
// /project-evaluation

import express from "express";
import verifyJWT from "../middlewares/token-verification.middleware.js";
import rbac from "../middlewares/rbac.middleware.js";
import dashboardControllers from "../controllers/dashboard.controller.js";

const router = express.Router();

router.use(verifyJWT, rbac.student);

router.get("/overview", studentPanelControllers.getOverview);
// should just return the entire run object for the student for now

router.get("/production", studentPanelControllers.getProduction);
// will need to define many services that return specific calculations and data
// for now just run object and success

router.get("/financial-statements", studentPanelControllers.getFinancialStatements);
// will need to define many services that return specific calculations and data
// for now just run object and success

router.get("/financial-health", studentPanelControllers.getFinancialHealth);
// will need to define many services that return specific calculations and data
// for now just run object and success

router.get("/forecasts", studentPanelControllers.getForecasts);
// will need to define many services that return specific calculations and data
// for now just run object and success

router.get("/project-evaluation", studentPanelControllers.getProjectEvaluation);
// will need to define many services that return specific calculations and data
// for now just run object and success

export default router;