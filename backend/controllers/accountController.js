const db = require('../db');

// 1. Get Account Summary & Details
async function getAccountSummary(req, res) {
    try {
        const { pin, card_number, formno } = req.user;

        // Fetch User Profile
        const signups = await db.query('SELECT * FROM signup WHERE formno = ?', [formno]);
        const profile = signups[0] || {};

        // Fetch Account & Card Info
        const signupthrees = await db.query('SELECT * FROM signupthree WHERE card_number = ?', [card_number]);
        const accountInfo = signupthrees[0] || {};

        // Calculate Balance and Transaction Totals
        const transactions = await db.query('SELECT * FROM bank WHERE pin = ?', [pin]);

        let balance = 0;
        let totalDeposits = 0;
        let totalWithdrawals = 0;

        transactions.forEach(tx => {
            const amount = parseFloat(tx.amount) || 0;
            const type = tx.type ? tx.type.toLowerCase() : '';
            if (type.includes('deposit')) {
                balance += amount;
                totalDeposits += amount;
            } else if (type.includes('withdraw')) {
                balance -= amount;
                totalWithdrawals += amount;
            }
        });

        return res.json({
            success: true,
            account: {
                formno,
                card_number,
                pin,
                name: profile.name || 'Account Holder',
                email: profile.email || '',
                phone: profile.pincode ? `+91 ${profile.pincode}` : 'N/A',
                city: profile.city || '',
                state: profile.state || '',
                account_type: accountInfo.account_type || 'Saving Account',
                facility: accountInfo.facility || 'ATM CARD',
                balance,
                totalDeposits,
                totalWithdrawals,
                transactionCount: transactions.length
            }
        });
    } catch (err) {
        console.error('getAccountSummary error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch account details' });
    }
}

// 2. Change PIN
async function changePin(req, res) {
    try {
        const { pin: currentPin } = req.user;
        const { oldPin, newPin, confirmPin } = req.body;

        if (!oldPin || !newPin || !confirmPin) {
            return res.status(400).json({ success: false, message: 'All PIN fields are required' });
        }

        if (oldPin !== currentPin) {
            return res.status(400).json({ success: false, message: 'Old PIN does not match current PIN' });
        }

        if (newPin !== confirmPin) {
            return res.status(400).json({ success: false, message: 'New PIN and Confirm PIN do not match' });
        }

        if (newPin.length !== 4 || isNaN(newPin)) {
            return res.status(400).json({ success: false, message: 'PIN must be a 4-digit number' });
        }

        // Update PIN in all tables
        await db.query('UPDATE bank SET pin = ? WHERE pin = ?', [newPin, oldPin]);
        await db.query('UPDATE login SET pin = ? WHERE pin = ?', [newPin, oldPin]);
        await db.query('UPDATE signupthree SET pin = ? WHERE pin = ?', [newPin, oldPin]);

        return res.json({
            success: true,
            message: 'PIN changed successfully! Please use your new PIN for future transactions.',
            newPin
        });
    } catch (err) {
        console.error('changePin error:', err);
        return res.status(500).json({ success: false, message: 'Failed to change PIN' });
    }
}

module.exports = {
    getAccountSummary,
    changePin
};
