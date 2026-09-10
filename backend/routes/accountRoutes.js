const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/summary', verifyToken, accountController.getAccountSummary);
router.post('/change-pin', verifyToken, accountController.changePin);

module.exports = router;
