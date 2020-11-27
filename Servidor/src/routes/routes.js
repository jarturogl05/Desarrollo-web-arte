const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require(`../controllers/user-controller`)
const commissionController = require(`../controllers/commission-controller`)


router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/createCommission', commissionController.createCommission);
router.post('/responseCommission', commissionController.ResponseCommission);
router.post('/payCommission', commissionController.PayCommission);
router.get('/confirm/:token', userController.confirmUser);

module.exports = router;