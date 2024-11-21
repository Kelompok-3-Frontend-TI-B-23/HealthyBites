require('dotenv').config();
const path = require('path'); // modul path
const express = require('express');
const connectToDatabase = require('./config/db');

const server = express();
const PORT = process.env.PORT || 8000;


// connect MongoDB
connectToDatabase();

// middleware
server.use(express.json());

// route
const userRoutes = require('./routes/userRoutes');
server.use('/api/users', userRoutes);

// default endpoint diarahkan ke index.html
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'layout', 'index.html'));
});


// error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'Something went wrong!',
        error: err.message,
    });
});

// Start Server
server.listen(PORT, (error) => {
    if (error) {
        console.log('Error starting server:', error.message);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});
