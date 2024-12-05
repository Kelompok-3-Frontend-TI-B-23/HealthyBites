const News = require("../models/newsModel");
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Only images are allowed');
      error.code = 'LIMIT_FILE_TYPES';
      return cb(error, false);
    }
    cb(null, true);
  }
});

// Controller untuk mengunggah berita
exports.uploadNews = [
  upload.single('image'), // Untuk menangani file gambar
  async (req, res) => {
    try {
      // Ambil data form dari req.body
      console.log('Request Body:', req.body); // Debugging
      console.log('Uploaded File:', req.file); // Debugging
      const news = {
        title: req.body.title,
        content: req.body.content,
        source: req.body.source,
        date: req.body.date || Date.now(), 
      };

      // Periksa jika ada file gambar
      if (req.file) {
        news.img = `/uploads/${req.file.filename}`;
      }

      // Simpan data ke MongoDB
      const newNews = new News(news);
      await newNews.save();

      res.status(201).json({
        message: 'News uploaded successfully!',
        news: newNews,
      });
    } catch (error) {
      console.error('Error uploading news:', error);
      res.status(500).json({ message: 'Error uploading news', error });
    }
  },
];

// Controller untuk mendapatkan berita berdasarkan judul
exports.getNewsByTitle = async (req, res) => {
  try {
    const news = await News.findOne({ title: req.params.title });
    if (!news) {
      return res.status(404).json({ msg: 'News not found' });
    }
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Fungsi untuk mengambil semua berita
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Controller untuk memperbarui berita
exports.updateNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return res.status(400).json({ message: 'Invalid newsId format' });
    }

    const updatedNews = await News.findByIdAndUpdate(newsId, req.body, { new: true });

    if (!updatedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Error updating news', error });
  }
};

// Controller untuk menghapus berita
exports.deleteNews = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return res.status(400).json({ message: 'Invalid newsId format' });
    }

    const deletedNews = await News.findByIdAndDelete(newsId);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Error deleting news', error });
  }
};

// Controller untuk mendapatkan berita berdasarkan ID
exports.getNewsById = async (req, res) => {
  try {
    const newsId = req.params.newsId;
    console.log("Received newsId:", newsId); // Debugging

    // Cek apakah newsId adalah ObjectId yang valid
    if (!mongoose.Types.ObjectId.isValid(newsId)) {
      return res.status(400).json({ message: 'Invalid newsId format' });
    }

    // Cari berdasarkan ObjectId
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news); // Mengirimkan berita yang ditemukan
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
