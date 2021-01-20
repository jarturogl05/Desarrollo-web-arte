const { body } = require('express-validator');

exports.login = [
    body('username').trim()
];

exports.createUser = [
    body('username').trim(), 
    body('email').isEmail().normalizeEmail()
]
