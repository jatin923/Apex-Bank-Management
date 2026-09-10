const mysql = require('mysql2/promise');
require('dotenv').config();

let pool = null;
let useMock = false;

// Mock in-memory database store for fallback mode when MySQL is offline
const mockStore = {
    login: [
        { id: 1, formno: '4841', form_no: '4841', card_number: '5040936012345678', pin: '1234' }
    ],
    signup: [
        {
            formno: '4841',
            form_no: '4841',
            name: 'Jatin Kumar',
            fname: 'Rajesh Kumar',
            father_name: 'Rajesh Kumar',
            dob: '2000-01-15',
            DOB: '2000-01-15',
            gender: 'Male',
            email: 'jatin@example.com',
            marital: 'Unmarried',
            marital_status: 'Unmarried',
            address: '123 Tech Park Avenue',
            city: 'New Delhi',
            pincode: '110001',
            state: 'Delhi'
        }
    ],
    signuptwo: [
        {
            formno: '4841',
            form_no: '4841',
            religion: 'Hindu',
            category: 'General',
            income: 'Above 10,00,000',
            education: 'Graduate',
            occupation: 'Salaried',
            occuption: 'Salaried',
            pan: 'ABCDE1234F',
            aadhar: '123456789012',
            scitizen: 'No',
            seniorcitizen: 'No',
            eaccount: 'Yes',
            existing_account: 'Yes'
        }
    ],
    signupthree: [
        {
            formno: '4841',
            form_no: '4841',
            account_type: 'Saving Account',
            card_number: '5040936012345678',
            pin: '1234',
            facility: 'ATM CARD Internet Banking EMAIL Alerts E-Statement'
        }
    ],
    bank: [
        { id: 1, pin: '1234', date: 'Fri Sep 04 10:00:00 IST 2026', type: 'Deposit', amount: 25000 },
        { id: 2, pin: '1234', date: 'Fri Sep 04 10:15:00 IST 2026', type: 'Deposit', amount: 10000 },
        { id: 3, pin: '1234', date: 'Fri Sep 04 10:30:00 IST 2026', type: 'Withdrawl', amount: 2500 },
        { id: 4, pin: '1234', date: 'Fri Sep 04 10:45:00 IST 2026', type: 'Withdrawl', amount: 1000 }
    ]
};

async function ensureRequiredTables(p) {
    await p.execute(`
        CREATE TABLE IF NOT EXISTS signup (
            formno VARCHAR(20) PRIMARY KEY,
            form_no VARCHAR(20),
            name VARCHAR(100) NOT NULL,
            fname VARCHAR(100) NOT NULL,
            father_name VARCHAR(100),
            dob VARCHAR(50) NOT NULL,
            gender VARCHAR(20) NOT NULL,
            email VARCHAR(100) NOT NULL,
            marital VARCHAR(20) NOT NULL,
            marital_status VARCHAR(20),
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            pincode VARCHAR(20) NOT NULL,
            state VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await p.execute(`
        CREATE TABLE IF NOT EXISTS login (
            id INT AUTO_INCREMENT PRIMARY KEY,
            formno VARCHAR(20) NOT NULL,
            form_no VARCHAR(20),
            card_number VARCHAR(20) NOT NULL UNIQUE,
            pin VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await p.execute(`
        CREATE TABLE IF NOT EXISTS signuptwo (
            formno VARCHAR(20) PRIMARY KEY,
            form_no VARCHAR(20),
            religion VARCHAR(50),
            category VARCHAR(50),
            income VARCHAR(50),
            education VARCHAR(50),
            occupation VARCHAR(50),
            occuption VARCHAR(50),
            pan VARCHAR(20),
            aadhar VARCHAR(20),
            scitizen VARCHAR(10),
            seniorcitizen VARCHAR(10),
            eaccount VARCHAR(10),
            existing_account VARCHAR(10)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await p.execute(`
        CREATE TABLE IF NOT EXISTS signupthree (
            formno VARCHAR(20) PRIMARY KEY,
            form_no VARCHAR(20),
            account_type VARCHAR(50) NOT NULL,
            card_number VARCHAR(20) NOT NULL UNIQUE,
            pin VARCHAR(10) NOT NULL,
            facility TEXT
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await p.execute(`
        CREATE TABLE IF NOT EXISTS bank (
            id INT AUTO_INCREMENT PRIMARY KEY,
            pin VARCHAR(10) NOT NULL,
            \`date\` VARCHAR(100) NOT NULL,
            \`type\` VARCHAR(50) NOT NULL,
            amount DECIMAL(12, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_bank_pin (pin)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
}

async function autoMigrateSchema(p) {
    try {
        await ensureRequiredTables(p);

        // Ensure signup table has all required columns
        const [signupCols] = await p.execute("SHOW COLUMNS FROM signup");
        const colNames1 = signupCols.map(c => c.Field.toLowerCase());

        if (!colNames1.includes('fname')) {
            await p.execute("ALTER TABLE signup ADD COLUMN fname VARCHAR(100)");
        }
        if (!colNames1.includes('father_name')) {
            await p.execute("ALTER TABLE signup ADD COLUMN father_name VARCHAR(100)");
        }
        if (!colNames1.includes('dob')) {
            await p.execute("ALTER TABLE signup ADD COLUMN dob VARCHAR(50)");
        }
        if (!colNames1.includes('marital')) {
            await p.execute("ALTER TABLE signup ADD COLUMN marital VARCHAR(50)");
        }
        if (!colNames1.includes('marital_status')) {
            await p.execute("ALTER TABLE signup ADD COLUMN marital_status VARCHAR(50)");
        }
        if (!colNames1.includes('formno')) {
            await p.execute("ALTER TABLE signup ADD COLUMN formno VARCHAR(50)");
        }
        if (!colNames1.includes('form_no')) {
            await p.execute("ALTER TABLE signup ADD COLUMN form_no VARCHAR(50)");
        }

        // Ensure signuptwo table has all required columns
        const [signupTwoCols] = await p.execute("SHOW COLUMNS FROM signuptwo");
        const colNames2 = signupTwoCols.map(c => c.Field.toLowerCase());

        if (!colNames2.includes('occupation')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN occupation VARCHAR(50)");
        }
        if (!colNames2.includes('occuption')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN occuption VARCHAR(50)");
        }
        if (!colNames2.includes('scitizen')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN scitizen VARCHAR(50)");
        }
        if (!colNames2.includes('seniorcitizen')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN seniorcitizen VARCHAR(50)");
        }
        if (!colNames2.includes('eaccount')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN eaccount VARCHAR(50)");
        }
        if (!colNames2.includes('existing_account')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN existing_account VARCHAR(50)");
        }
        if (!colNames2.includes('formno')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN formno VARCHAR(50)");
        }
        if (!colNames2.includes('form_no')) {
            await p.execute("ALTER TABLE signuptwo ADD COLUMN form_no VARCHAR(50)");
        }

        // Ensure signupthree table has formno & form_no
        const [signupThreeCols] = await p.execute("SHOW COLUMNS FROM signupthree");
        const colNames3 = signupThreeCols.map(c => c.Field.toLowerCase());
        if (!colNames3.includes('formno')) {
            await p.execute("ALTER TABLE signupthree ADD COLUMN formno VARCHAR(50)");
        }
        if (!colNames3.includes('form_no')) {
            await p.execute("ALTER TABLE signupthree ADD COLUMN form_no VARCHAR(50)");
        }

        // Ensure login table has formno & form_no
        const [loginCols] = await p.execute("SHOW COLUMNS FROM login");
        const colNames4 = loginCols.map(c => c.Field.toLowerCase());
        if (!colNames4.includes('formno')) {
            await p.execute("ALTER TABLE login ADD COLUMN formno VARCHAR(50)");
        }
        if (!colNames4.includes('form_no')) {
            await p.execute("ALTER TABLE login ADD COLUMN form_no VARCHAR(50)");
        }

        console.log('✅ MySQL Database Schema compatibility migration completed successfully!');
    } catch (err) {
        console.warn('Schema Migration Warning:', err.message);
    }
}

async function initDB() {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'bankSystem',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            connectTimeout: 3000
        });

        // Test connection
        const conn = await pool.getConnection();
        conn.release();
        console.log('✅ Connected to MySQL Database:', process.env.DB_NAME);

        // Run auto-migration to ensure all column variations exist
        await autoMigrateSchema(pool);
    } catch (err) {
        console.warn('⚠️ MySQL Connection Failed:', err.message);
        console.warn('🔄 Falling back to In-Memory Demo Database mode.');
        useMock = true;
    }
}

initDB();

// Unified query wrapper that switches seamlessly between real MySQL and mock DB
async function query(sql, params = []) {
    if (!useMock && pool) {
        try {
            const [results] = await pool.execute(sql, params);
            return results;
        } catch (err) {
            console.error('MySQL Query Error:', err.message);
            throw err;
        }
    }

    // Mock query handler for standard SQL operations used in the app
    const lowerSql = sql.toLowerCase().trim();

    // LOGIN check: select * from login where card_number = ? and pin = ?
    if (lowerSql.includes('select * from login where card_number =') || lowerSql.includes('where card_number =')) {
        const card_number = params[0];
        const pin = params[1];
        const found = mockStore.login.filter(u => u.card_number === card_number && (pin ? u.pin === pin : true));
        return found;
    }

    // FIND user by formno or pin
    if (lowerSql.includes('select * from login where pin =')) {
        const pin = params[0];
        return mockStore.login.filter(u => u.pin === pin);
    }

    if (lowerSql.includes('select * from signup where formno =') || lowerSql.includes('select * from signup where form_no =')) {
        const formno = params[0];
        return mockStore.signup.filter(u => u.formno === formno || u.form_no === formno);
    }

    if (lowerSql.includes('select * from signupthree where pin =')) {
        const pin = params[0];
        return mockStore.signupthree.filter(u => u.pin === pin);
    }

    if (lowerSql.includes('select * from signupthree where card_number =')) {
        const card = params[0];
        return mockStore.signupthree.filter(u => u.card_number === card);
    }

    // BANK transactions by pin: select * from bank where pin = ?
    if (lowerSql.includes('select * from bank where pin =')) {
        const pin = params[0];
        return mockStore.bank.filter(b => b.pin === pin);
    }

    // SELECT ALL BANK transactions for admin view
    if (lowerSql.includes('select * from bank')) {
        return mockStore.bank;
    }

    // INSERT INTO signup
    if (lowerSql.includes('insert into signup')) {
        mockStore.signup.push({
            formno: params[0],
            form_no: params[0],
            name: params[1],
            fname: params[2],
            father_name: params[2],
            dob: params[3],
            DOB: params[3],
            gender: params[4],
            email: params[5],
            marital: params[6],
            marital_status: params[6],
            address: params[7],
            city: params[8],
            pincode: params[9],
            state: params[10]
        });
        return { affectedRows: 1 };
    }

    // INSERT INTO signuptwo
    if (lowerSql.includes('insert into signuptwo')) {
        mockStore.signuptwo.push({
            formno: params[0],
            form_no: params[0],
            religion: params[1],
            category: params[2],
            income: params[3],
            education: params[4],
            occupation: params[5],
            occuption: params[5],
            pan: params[6],
            aadhar: params[7],
            scitizen: params[8],
            seniorcitizen: params[8],
            eaccount: params[9],
            existing_account: params[9]
        });
        return { affectedRows: 1 };
    }

    // INSERT INTO signupthree
    if (lowerSql.includes('insert into signupthree')) {
        mockStore.signupthree.push({
            formno: params[0],
            form_no: params[0],
            account_type: params[1],
            card_number: params[2],
            pin: params[3],
            facility: params[4]
        });
        return { affectedRows: 1 };
    }

    // INSERT INTO login
    if (lowerSql.includes('insert into login')) {
        mockStore.login.push({
            id: mockStore.login.length + 1,
            formno: params[0],
            form_no: params[0],
            card_number: params[1],
            pin: params[2]
        });
        return { affectedRows: 1 };
    }

    // INSERT INTO bank (Transaction)
    if (lowerSql.includes('insert into bank')) {
        mockStore.bank.push({
            id: mockStore.bank.length + 1,
            pin: params[0],
            date: params[1],
            type: params[2],
            amount: parseFloat(params[3])
        });
        return { affectedRows: 1 };
    }

    // UPDATE PIN across tables
    if (lowerSql.includes('update bank set pin =') || lowerSql.includes('update login set pin =') || lowerSql.includes('update signupthree set pin =')) {
        const newPin = params[0];
        const oldPin = params[1];

        mockStore.login.forEach(u => { if (u.pin === oldPin) u.pin = newPin; });
        mockStore.signupthree.forEach(u => { if (u.pin === oldPin) u.pin = newPin; });
        mockStore.bank.forEach(b => { if (b.pin === oldPin) b.pin = newPin; });
        return { affectedRows: 1 };
    }

    return [];
}

module.exports = { query, isMock: () => useMock };
