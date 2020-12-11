const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require(`../controllers/user-controller`)
const postService = require('../controllers/post-controller')
const commissionController = require(`../controllers/commission-controller`)

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');

router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/authenticateToken', userController.authenticateToken);
//router.post('/getUserProfileInfoByUsername' , userController.getUserInfo);
router.post('/createCommission', commissionController.createCommission);
router.post('/responseCommission', commissionController.ResponseCommission);
router.post('/payCommission', commissionController.PayCommission);
router.get('/confirm/:token', userController.confirmUser);

router.post('/upload', uploadStrategy, postService.UploadProfile);
router.post('/createpost', uploadStrategy, postService.createPost);

module.exports = router;