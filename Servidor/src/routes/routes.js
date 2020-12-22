const express = require('express');
const router = express.Router();
const userController = require(`../controllers/user-controller`)
const postService = require('../controllers/post-controller')
const commissionController = require(`../controllers/commission-controller`)
const profileController = require(`../controllers/profile-controller`)

const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');

router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/authenticateToken', userController.authenticateToken);

router.post('/updateProfile' , profileController.updateProfile);
router.post('/getUserProfileInfoByUsername' , profileController.getUserInfo);

router.post('/createCommissionType', commissionController.createCommission);
router.post('/EditCommissionType', commissionController.editCommissionType);
router.post('/DeleteCommissionType', commissionController.deleteCommissionType);
router.post('/askCommission', commissionController.askCommission);
router.post('/responseCommission', commissionController.ResponseCommission);
router.post('/payCommission', commissionController.PayCommission);
router.post('/getAvailableCommissions', commissionController.getMyAvailableCommission);
router.post('/getAllMyCommissionTypes', commissionController.getAllMyCommissionTypes);

router.get('/confirm/:token', userController.confirmUser);

router.post('/upload', uploadStrategy, postService.UploadProfile);
router.post('/createpost', uploadStrategy, postService.createPost);

module.exports = router;