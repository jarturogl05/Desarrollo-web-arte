const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require(`../controllers/user-controller`)


router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/getUserProfileInfoByUsername' , userController.getUserInfo);
router.post('/authenticateToken', userController.authenticateToken);

module.exports = router;