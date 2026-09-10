const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/deposit', verifyToken, transactionController.deposit);
router.post('/withdraw', verifyToken, transactionController.withdraw);
router.post('/fast-cash', verifyToken, transactionController.fastCash);
router.get('/', verifyToken, transactionController.getTransactions);

module.exports = router;
