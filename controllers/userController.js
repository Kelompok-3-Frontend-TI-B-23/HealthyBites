const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_static_secret_key';

// Create user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, phone } = req.body;

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username sudah digunakan. Silakan pilih username lain.' });
        }

        // Validasi password
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password harus minimal 8 karakter, mengandung huruf besar, dan angka.' });
        }

        // Validasi password confirm
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Password dan konfirmasi password tidak cocok.' });
        }

        // Validasi nomor telepon
        if (!/^\d{10,13}$/.test(phone)) {
            return res.status(400).json({ error: 'Nomor telepon harus angka 10-13 digit.' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Simpan user ke database
        const newUser = new User({ username, email, password: hashedPassword, phone });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        // Kalau misal email atau username sudah digunakan
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email sudah digunakan.' });
        }
        res.status(400).json({ error: error.message });
    }
};
  
// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        // Bandingkan password dengan hash di database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email atau password salah.' });
        }

        // Buat token JWT
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Kirim token dan user info
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Menampilkan data user yang sedang login
exports.getUser = async (req, res) => {
    try {
        // Ambil header
        const authHeader = req.headers.authorization; 
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token tidak ditemukan atau format salah.' });
        }

        const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer'
        console.log('Token:', token);

        // Verifikasi token
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log('Decoded token:', decoded);

        // Ambil user dari database
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User tidak ditemukan.' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(401).json({ error: 'Token tidak valid atau kedaluwarsa.' });
    }
};

