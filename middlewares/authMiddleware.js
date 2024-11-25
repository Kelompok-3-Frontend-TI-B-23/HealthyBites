const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Ambil token dari header Authorization
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key'); // Verifikasi token
        req.user = decoded; // Simpan data user dari token ke req.user
        next(); // Lanjutkan ke middleware berikutnya
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
