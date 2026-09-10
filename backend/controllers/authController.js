const db = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_bank_jwt_key_2026';

// 1. Sign In / Login Controller
async function login(req, res) {
    try {
        const { card_number, pin } = req.body;

        if (!card_number || !pin) {
            return res.status(400).json({ success: false, message: 'Please provide Card Number and PIN' });
        }

        // Clean card number (remove hyphens/spaces if user pasted them)
        const cleanCardNo = card_number.replace(/\s|-/g, '');

        const users = await db.query(
            'SELECT * FROM login WHERE card_number = ? AND pin = ?',
            [cleanCardNo, pin]
        );

        if (!users || users.length === 0) {
            return res.status(401).json({ success: false, message: 'Incorrect Card Number or PIN' });
        }

        const user = users[0];
        const userFormNo = user.formno || user.form_no || '';

        // Fetch user profile name & details if available
        let profile = {};
        if (userFormNo) {
            const signups = await db.query('SELECT * FROM signup WHERE formno = ? OR form_no = ?', [userFormNo, userFormNo]);
            if (signups && signups.length > 0) {
                profile = signups[0];
            }
        }

        const accountDetails = await db.query('SELECT * FROM signupthree WHERE card_number = ?', [cleanCardNo]);

        const token = jwt.sign(
            { formno: userFormNo, card_number: user.card_number, pin: user.pin },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                formno: userFormNo,
                card_number: user.card_number,
                pin: user.pin,
                name: profile.name || 'Account Holder',
                email: profile.email || '',
                account_type: (accountDetails[0] && accountDetails[0].account_type) || 'Savings Account'
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Internal server error during login' });
    }
}

// 2. Signup Step 1: Personal Details
async function signupStep1(req, res) {
    try {
        const { name, fname, dob, gender, email, marital, address, city, pincode, state } = req.body;

        if (!name || !fname || !email) {
            return res.status(400).json({ success: false, message: 'Please fill in all mandatory fields (Name, Father Name, Email)' });
        }

        // Generate unique 4-digit formno
        const formno = Math.floor(1000 + Math.random() * 9000).toString();

        await db.query(
            'INSERT INTO signup (formno, form_no, name, fname, father_name, dob, gender, email, marital, marital_status, address, city, pincode, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                formno,
                formno,
                name,
                fname,
                fname,
                dob || '',
                gender || 'Male',
                email,
                marital || 'Unmarried',
                marital || 'Unmarried',
                address || '',
                city || '',
                pincode || '',
                state || ''
            ]
        );

        return res.json({
            success: true,
            message: 'Personal details saved',
            formno
        });
    } catch (err) {
        console.error('Signup Step 1 error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to process signup step 1' });
    }
}

// 3. Signup Step 2: Additional Details
async function signupStep2(req, res) {
    try {
        const { formno, religion, category, income, education, occupation, pan, aadhar, scitizen, eaccount } = req.body;

        if (!formno || !pan || !aadhar) {
            return res.status(400).json({ success: false, message: 'PAN Number and Aadhar Number are required' });
        }

        await db.query(
            'INSERT INTO signuptwo (formno, form_no, religion, category, income, education, occupation, occuption, pan, aadhar, scitizen, seniorcitizen, eaccount, existing_account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                formno,
                formno,
                religion || 'Hindu',
                category || 'General',
                income || 'Null',
                education || 'Graduate',
                occupation || 'Salaried',
                occupation || 'Salaried',
                pan,
                aadhar,
                scitizen || 'No',
                scitizen || 'No',
                eaccount || 'Yes',
                eaccount || 'Yes'
            ]
        );

        return res.json({
            success: true,
            message: 'Additional details saved',
            formno
        });
    } catch (err) {
        console.error('Signup Step 2 error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to process signup step 2' });
    }
}

// 4. Signup Step 3: Account Details + Card & PIN Generation
async function signupStep3(req, res) {
    try {
        const { formno, account_type, services } = req.body;

        if (!formno || !account_type) {
            return res.status(400).json({ success: false, message: 'Please select an account type' });
        }

        // Generate 16-digit Card Number starting with 5040
        const random12 = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        const card_number = '5040' + random12.substring(4);

        // Generate 4-digit PIN
        const pin = Math.floor(1000 + Math.random() * 9000).toString();

        const facilityStr = Array.isArray(services) ? services.join(' ') : (services || 'ATM CARD');

        // Insert into signupthree
        await db.query(
            'INSERT INTO signupthree (formno, form_no, account_type, card_number, pin, facility) VALUES (?, ?, ?, ?, ?, ?)',
            [formno, formno, account_type, card_number, pin, facilityStr]
        );

        // Insert into login table
        await db.query(
            'INSERT INTO login (formno, form_no, card_number, pin) VALUES (?, ?, ?, ?)',
            [formno, formno, card_number, pin]
        );

        // Add an initial bonus deposit of Rs. 1000
        const initialDate = new Date().toString();
        await db.query(
            'INSERT INTO bank (pin, date, type, amount) VALUES (?, ?, ?, ?)',
            [pin, initialDate, 'Deposit', 1000]
        );

        return res.json({
            success: true,
            message: 'Account created successfully!',
            data: {
                formno,
                account_type,
                card_number,
                pin,
                initialBalance: 1000
            }
        });
    } catch (err) {
        console.error('Signup Step 3 error:', err);
        return res.status(500).json({ success: false, message: err.message || 'Failed to complete signup' });
    }
}

module.exports = {
    login,
    signupStep1,
    signupStep2,
    signupStep3
};
