const express = require('express');
const router = express.Router();
const userController = require(`../controllers/user-controller`)
const commissionController = require(`../controllers/commission-controller`)
const profileController = require(`../controllers/profile-controller`)


router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/authenticateToken', userController.authenticateToken);
router.post('/createProfile' , profileController.createProfile);
router.post('/getUserProfileInfoByUsername' , profileController.getUserInfo);
router.post('/createCommission', commissionController.createCommission);
router.post('/responseCommission', commissionController.ResponseCommission);
router.post('/payCommission', commissionController.PayCommission);
router.post('/getAvailableCommissions', commissionController.getMyAvailableCommission);
router.get('/confirm/:token', userController.confirmUser);

module.exports = router;