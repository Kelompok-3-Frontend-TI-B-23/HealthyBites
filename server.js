const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const authMiddleware = require('./middlewares/authMiddleware');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/createAccount.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});
app.get('/recipe', (req, res) => {
    res.sendFile(__dirname + '/public/recipe.html');
});
app.get('/bmi', authMiddleware, (req, res) => {
  res.sendFile(__dirname + '/public/bmi.html');
});
  
// Koneksi MongoDB
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Route bruno
app.use('/api/users', userRoutes);

// Sever jalan
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
