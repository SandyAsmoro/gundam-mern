const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model.js'); // Pastikan path model benar

const router = express.Router();

// --- Rute untuk Registrasi Admin (Opsional) ---
// Catatan: Untuk keamanan, rute ini bisa dihapus setelah admin pertama dibuat.
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek apakah email sudah ada
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User dengan email ini sudah ada." });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "User berhasil dibuat." });

    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server.", error: error.message });
    }
});


// --- Rute untuk Login Admin ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cari user berdasarkan email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email atau password salah." });
        }

        // Bandingkan password yang diinput dengan yang ada di database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Email atau password salah." });
        }

        // Jika berhasil, buat JSON Web Token (JWT)
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET, // Ambil secret key dari file .env
            { expiresIn: '1h' } // Token berlaku selama 1 jam
        );

        res.status(200).json({
            message: "Login berhasil!",
            token: token,
            userId: user._id
        });

    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan pada server.", error: error.message });
    }
});

module.exports = router;