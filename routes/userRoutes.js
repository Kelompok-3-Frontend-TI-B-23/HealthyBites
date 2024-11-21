const express = require('express');
const { addUser } = require('../controller/userController');
const router = express.Router();

// endpoint untuk menambahkan user
router.post('/add', addUser);

module.exports = router;
