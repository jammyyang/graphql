const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    name: String,
    city: String
});

module.exports = mongoose.model('Cafe', cafeSchema);
