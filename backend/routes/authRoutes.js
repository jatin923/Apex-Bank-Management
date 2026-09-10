const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/signup/step1', authController.signupStep1);
router.post('/signup/step2', authController.signupStep2);
router.post('/signup/step3', authController.signupStep3);

module.exports = router;
