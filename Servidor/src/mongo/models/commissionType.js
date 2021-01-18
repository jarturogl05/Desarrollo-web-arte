const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema;

const commissionTypeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    picture: {type: String, required: false}
}, {
    timestamps: true
}
);

commissionTypeSchema.plugin(mongoosePaginate);
const model = mongoose.model('CommissionType', commissionTypeSchema);
module.exports = model;
