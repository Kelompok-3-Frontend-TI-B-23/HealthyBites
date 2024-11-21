const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // keluar mongodb kalo error
    }
}

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to the database.');
});
mongoose.connection.on('error', (error) => {
    console.error('Mongoose error:', error.message);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

module.exports = connectToDatabase;
