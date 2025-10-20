const router = require("express").Router();
const foodController = require("../controllers/generateData.controller.js");

router.get("/", foodController.generateData);
router.get("/sendData", foodController.generateData);

module.exports = router;
