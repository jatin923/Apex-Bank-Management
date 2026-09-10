const db = require('../db');

// Helper to compute current balance
async function getBalance(pin) {
    const transactions = await db.query('SELECT * FROM bank WHERE pin = ?', [pin]);
    let balance = 0;
    transactions.forEach(tx => {
        const amount = parseFloat(tx.amount) || 0;
        const type = tx.type ? tx.type.toLowerCase() : '';
        if (type.includes('deposit')) {
            balance += amount;
        } else if (type.includes('withdraw')) {
            balance -= amount;
        }
    });
    return balance;
}

// 1. Deposit Funds
async function deposit(req, res) {
    try {
        const { pin } = req.user;
        const { amount } = req.body;

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({ success: false, message: 'Please enter a valid deposit amount greater than 0' });
        }

        const dateStr = new Date().toString();
        await db.query(
            'INSERT INTO bank (pin, date, type, amount) VALUES (?, ?, ?, ?)',
            [pin, dateStr, 'Deposit', numAmount]
        );

        const newBalance = await getBalance(pin);

        return res.json({
            success: true,
            message: `Rs. ${numAmount.toLocaleString('en-IN')} Deposited Successfully`,
            amount: numAmount,
            newBalance
        });
    } catch (err) {
        console.error('Deposit error:', err);
        return res.status(500).json({ success: false, message: 'Deposit transaction failed' });
    }
}

// 2. Withdraw Funds
async function withdraw(req, res) {
    try {
        const { pin } = req.user;
        const { amount } = req.body;

        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({ success: false, message: 'Please enter a valid withdrawal amount' });
        }

        if (numAmount > 10000) {
            return res.status(400).json({ success: false, message: 'Maximum single withdrawal limit is Rs. 10,000' });
        }

        const currentBalance = await getBalance(pin);

        if (currentBalance < numAmount) {
            return res.status(400).json({ success: false, message: `Insufficient Balance. Current Balance: Rs. ${currentBalance.toLocaleString('en-IN')}` });
        }

        const dateStr = new Date().toString();
        await db.query(
            'INSERT INTO bank (pin, date, type, amount) VALUES (?, ?, ?, ?)',
            [pin, dateStr, 'Withdrawl', numAmount]
        );

        const newBalance = currentBalance - numAmount;

        return res.json({
            success: true,
            message: `Rs. ${numAmount.toLocaleString('en-IN')} Debited Successfully`,
            amount: numAmount,
            newBalance
        });
    } catch (err) {
        console.error('Withdrawal error:', err);
        return res.status(500).json({ success: false, message: 'Withdrawal transaction failed' });
    }
}

// 3. Fast Cash Withdrawal (Presets: 100, 500, 1000, 2000, 5000, 10000)
async function fastCash(req, res) {
    try {
        const { pin } = req.user;
        const { amount } = req.body;

        const numAmount = parseFloat(amount);
        const validPresets = [100, 500, 1000, 2000, 5000, 10000];

        if (!validPresets.includes(numAmount)) {
            return res.status(400).json({ success: false, message: 'Invalid Fast Cash preset amount' });
        }

        const currentBalance = await getBalance(pin);

        if (currentBalance < numAmount) {
            return res.status(400).json({ success: false, message: `Insufficient Balance for Fast Cash. Current Balance: Rs. ${currentBalance.toLocaleString('en-IN')}` });
        }

        const dateStr = new Date().toString();
        await db.query(
            'INSERT INTO bank (pin, date, type, amount) VALUES (?, ?, ?, ?)',
            [pin, dateStr, 'Withdrawl', numAmount]
        );

        const newBalance = currentBalance - numAmount;

        return res.json({
            success: true,
            message: `Fast Cash Rs. ${numAmount.toLocaleString('en-IN')} Debited Successfully`,
            amount: numAmount,
            newBalance
        });
    } catch (err) {
        console.error('FastCash error:', err);
        return res.status(500).json({ success: false, message: 'Fast Cash transaction failed' });
    }
}

// 4. Get Transactions / Mini Statement with Filter, Search & Pagination
async function getTransactions(req, res) {
    try {
        const { pin } = req.user;
        const { search, type, limit = 50, page = 1 } = req.query;

        let transactions = await db.query('SELECT * FROM bank WHERE pin = ? ORDER BY id DESC', [pin]);

        // Filter by Type if provided (Deposit or Withdrawl)
        if (type && type !== 'all') {
            transactions = transactions.filter(tx => tx.type.toLowerCase().includes(type.toLowerCase()));
        }

        // Search by amount or date string
        if (search) {
            const q = search.toLowerCase();
            transactions = transactions.filter(tx =>
                tx.amount.toString().includes(q) ||
                tx.date.toLowerCase().includes(q) ||
                tx.type.toLowerCase().includes(q)
            );
        }

        // Pagination calculation
        const total = transactions.length;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const paginated = transactions.slice(startIndex, startIndex + limitNum);

        const currentBalance = await getBalance(pin);

        return res.json({
            success: true,
            transactions: paginated,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum) || 1
            },
            currentBalance
        });
    } catch (err) {
        console.error('getTransactions error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch transaction history' });
    }
}

module.exports = {
    deposit,
    withdraw,
    fastCash,
    getTransactions
};
