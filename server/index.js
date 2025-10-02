const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes.js');
const productRoutes = require('./routes/product.routes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk mem-parsing JSON dari body request

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Berhasil terhubung ke MongoDB');
}).catch((err) => {
    console.error('Koneksi MongoDB gagal:', err.message);
});

// Route Sederhana untuk Tes
app.get('/api', (req, res) => {
    res.json({ message: 'Halo dari server MERN!' });
});

// Semua rute di auth.routes.js akan diawali dengan /api/auth
app.use('/api/auth', authRoutes);

// Semua rute di product.routes.js akan diawali dengan /api/products
app.use('/api/products', productRoutes);

// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});


