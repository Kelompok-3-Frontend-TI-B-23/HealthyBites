const express = require('express');
const router = express.Router();
const multer = require('multer');
const Berita = require('../models/newsModel'); // Model berita
const path = require('path');
const newsController = require('../controllers/newsController');

// Konfigurasi multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Menyimpan gambar di folder public/uploads
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Menyimpan gambar dengan nama unik;
     console.log('Received newsId:');
  }
  
});

const upload = multer({ storage: storage });

// Rute untuk upload berita
router.post('/upload', newsController.uploadNews);

// Route untuk mendapatkan berita berdasarkan judul
router.get('/api/news/bytitle/:title', newsController.getNewsByTitle);

// Route untuk mendapatkan semua berita
console.error("route berita");
router.get('/', newsController.getAllNews);

// Route untuk mendapatkan berita berdasarkan ID
router.get('/:newsId', newsController.getNewsById);

// Route untuk mengupdate berita
router.put('/:newsId', newsController.updateNews);

// Route untuk menghapus berita
router.delete('/:newsId', newsController.deleteNews);

module.exports = router;
