const express = require('express');
const Product = require('../models/Product.model.js'); // Pastikan path model benar
const authMiddleware = require('../middleware/auth.middleware.js'); // Import middleware

const router = express.Router();

// --- Rute Publik ---

// GET: Mendapatkan semua produk (untuk landing page)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }); // Urutkan dari yang terbaru
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data produk.", error: error.message });
    }
});

// GET: Mendapatkan satu produk berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produk tidak ditemukan." });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data produk.", error: error.message });
    }
});


// --- Rute yang Dilindungi (Admin Only) ---

// POST: Membuat produk baru
// Middleware 'authMiddleware' akan dijalankan terlebih dahulu
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;

        const createProduct = new Product({
            name,
            description,
            price,
            imageUrl
        });

        const savedProduct = await createProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: "Gagal membuat produk baru.", error: error.message });
    }
});

// PUT: Mengupdate produk berdasarkan ID
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Mengembalikan dokumen yang sudah diupdate
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Produk tidak ditemukan." });
        }
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate produk.", error: error.message });
    }
});

// DELETE: Menghapus produk berdasarkan ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: "Produk tidak ditemukan." });
        }
        res.status(200).json({ message: "Produk berhasil dihapus." });

    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus produk.", error: error.message });
    }
});

module.exports = router;