const express = require('express');
const router = express.Router();
const path = require('path')
const userController = require(`../controllers/user-controller`)
const postService = require('../controllers/post-service')


const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({storage: inMemoryStorage}).single('image');

router.post('/login' , userController.login);
router.post('/create' , userController.createUser);
router.post('/authenticateToken', userController.authenticateToken);

router.post('/upload', uploadStrategy, postService.createPost);

module.exports = router;