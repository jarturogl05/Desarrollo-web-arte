const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, required: true, unique: true},
    description: {type: String, maxlength: 355},
    profilePictureURL: {type: String, required: true, default: "https://cdn.onlinewebfonts.com/svg/img_401900.png"},
    commission: {type: String, default:null},
    twitter: {type: String, default: null},
    facebook: {type: String, default: null},
    instagram: {type: String, default: null},
    youtube: {type: String, default: null},
    userType: {type: String, required: true, default: 'normalUser'}
});

const model = mongoose.model('User', userSchema);
module.exports = model;