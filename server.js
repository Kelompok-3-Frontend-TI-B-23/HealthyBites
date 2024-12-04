const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const imageRoute = require("./routes/imageRoute");
const recipeRoutes = require("./routes/recipeRoute");
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); 
const nutritionRoutes = require('./routes/nutritionRoute');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

// rute api untuk resep
app.use("/api/recipes", recipeRoutes); 
app.use('/api/users', userRoutes);
app.use("/api/images", imageRoute);
app.use("/api/nutrition", nutritionRoutes);
app.use("/uploads", express.static("public/uploads")); // Folder untuk gambar

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Atau index.html jika diganti
});


// Koneksi MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


// Sever jalan
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


