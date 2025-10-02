const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }, // Path ke gambar produk
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);