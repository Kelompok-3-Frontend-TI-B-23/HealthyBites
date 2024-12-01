const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadRecipe } = require("../controllers/recipeController");

const router = express.Router();

// Konfigurasi penyimpanan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Lokasi penyimpanan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadRecipe);

module.exports = router;
