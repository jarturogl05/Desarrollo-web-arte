const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    confirmed: {type: Boolean, required: true},
    refreshToken: {type: String, default: null},
    userType: {type: String, required: true, default: 'normalUser'}
});

const model = mongoose.model('User', userSchema);
module.exports = model;