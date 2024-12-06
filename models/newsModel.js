const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose); // Import plugin

// Definisikan schema untuk berita
const newsSchema = new Schema({
  newsId: { type: Number, unique: true }, // ID custom, numerik
  title: { type: String, required: true }, // Judul berita
  content: { type: String, required: true }, // Isi lengkap dari berita
  source: { type: String, required: true },// Sumber berita
  img: { type: String },
  time: { type: Date, default: Date.now }, // Waktu berita dipublikasikan
});

// Gunakan plugin untuk auto increment
newsSchema.plugin(autoIncrement, { inc_field: 'newsId' }); // `newsId` akan di-increment otomatis

const News = mongoose.model('News', newsSchema);

module.exports = News;
