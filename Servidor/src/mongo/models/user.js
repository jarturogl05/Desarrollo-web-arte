const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    refreshToken: {type: String, required: false}
});

const model = mongoose.model('User', userSchema);
module.exports = model;