const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commissionSchema = new Schema({
    contractorUserId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    contractedUserId : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    comments : {type: String, required: true},
    commissionType: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'commissionType'},
    status : {type: String, required: true}
}, {
    timestamps: true
});


const model = mongoose.model('Commission', commissionSchema);
module.exports = model;