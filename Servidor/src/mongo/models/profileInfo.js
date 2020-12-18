const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    description: {type: String, maxlength: 355},
    profilePictureURL: {type: String, required: true, default: "https://cdn.onlinewebfonts.com/svg/img_401900.png"},
    commission: [{type: mongoose.Schema.Types.ObjectId, ref: 'commissionType', required: false}],
    twitter: {type: String, default: null},
    facebook: {type: String, default: null},
    instagram: {type: String, default: null},
    youtube: {type: String, default: null}
});

const model = mongoose.model('Profile', profileSchema);
module.exports = model;