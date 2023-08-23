const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String
}, { versionKey: false });

module.exports = mongoose.model('Item', ItemSchema);