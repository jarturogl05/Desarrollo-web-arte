const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commissionTypeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    picture: {type: String, required: false}
});

const model = mongoose.model('CommissionType', commissionTypeSchema);
module.exports = model;