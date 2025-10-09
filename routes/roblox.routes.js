const router = require('express').Router();
const foodController = require('../controllers/generateData.controller');

router.get('/', foodController.generateData);
router.get('/sendData', foodController.generateData);

module.exports = router;