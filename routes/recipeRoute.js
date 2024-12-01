const express = require('express');
const router = express.Router();
const multer = require('multer');
const Recipe = require('../models/recipeModel');
const path = require('path');

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
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const recipe = JSON.parse(req.body.recipe);

    // Menambahkan path gambar ke dalam data resep
    if (req.file) {
      recipe.img = `/uploads/${req.file.filename}`;
    }

    // Simpan resep ke dalam MongoDB
    const newRecipe = new Recipe(recipe);
    await newRecipe.save();

    res.status(201).json({
      message: 'Recipe uploaded successfully!',
      recipe: newRecipe,
    });
  } catch (error) {
    console.error('Error uploading recipe:', error);
    res.status(500).json({ message: 'Error uploading recipe', error });
  }
});

module.exports = router;
