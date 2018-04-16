const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const beanSchema = new Schema({
    name: String,
    region: String,
    cafeId: String
});

module.exports = mongoose.model('Bean', beanSchema);
