const User = require('../model/User');

// fungsi untuk menambahkan user
const addUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully!', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error adding user', error: error.message });
    }
};

module.exports = { addUser };
