const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');

router.post('/upload', nutritionController.uploadNutrition);
router.get('/', nutritionController.getAllNutrition);
router.get('/:nutritionId', nutritionController.getNutritionById);
router.put('/:nutritionId', nutritionController.updateNutrition);
router.delete('/:nutritionId', nutritionController.deleteNutrition);

module.exports = router;
