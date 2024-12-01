const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const authMiddleware = require('./middlewares/authMiddleware');
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const imageRoute = require("./routes/imageRoute");
const recipeRoutes = require("./routes/recipeRoute");


const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); // Pastikan ini sesuai dengan folder upload gambar Anda


require('dotenv').config();


app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

// rute api untuk resep
app.use("/api/recipes", recipeRoutes); 
app.use('/api/users', userRoutes);
app.use("/api/images", imageRoute);

app.use("/uploads", express.static("public/uploads")); // Folder untuk gambar
// Menyajikan folder public sebagai file statis
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/createAccount.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/recipe', (req, res) => {
    res.sendFile(__dirname + '/public/recipe.html');
});

  
// Koneksi MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


// Sever jalan
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
