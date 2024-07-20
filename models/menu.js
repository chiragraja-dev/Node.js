const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    dishName: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    dishType: {
        type: String,
        required: true,

    }
});

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
