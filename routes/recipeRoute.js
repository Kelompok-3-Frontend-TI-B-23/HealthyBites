const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../models/recipeModel');
const path = require('path');
const recipeController = require('../controllers/recipeController');
// Konfigurasi multer untuk menyimpan gambar

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Menyimpan gambar di folder public/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Menyimpan gambar dengan nama unik
  }
});

const upload = multer({ storage: storage });

// Rute untuk upload resep
router.post('/upload', recipeController.uploadRecipe);

router.get('/', recipeController.getAllRecipes);

// Route untuk mendapatkan resep berdasarkan recipeId
router.get("/:recipeId", recipeController.getRecipeById); 

// Route untuk mengupdate resep
router.put('/:recipeId', recipeController.updateRecipe);

// Route untuk menghapus resep
router.delete('/:recipeId', recipeController.deleteRecipe);

module.exports = router;