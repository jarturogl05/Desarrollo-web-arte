const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require(`../controllers/user-controller`)



router.post('/getToken', userController.getToken)
router.post('/authenticateToken', userController.authenticateToken)

module.exports = router;