const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commissionSchema = new Schema({
    contractorUser : {type: String, required: true},
    contractedUser : {type: String, required: true},
    CommisionType: {type: String, required: true},
    accepted : {type: Boolean, required: true, default: false},
    paid: {type: Boolean, required: true, default : false}
});

const model = mongoose.model('Commission', commissionSchema);
module.exports = model;