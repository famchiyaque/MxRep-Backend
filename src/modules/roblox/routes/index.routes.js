import express from "express"
const router = express.Router();
import generateDataController from "../controllers/generateData.controller.js"

router.get("/", generateDataController.generateData);
router.get("/sendData", generateDataController.generateData);

export default router;
