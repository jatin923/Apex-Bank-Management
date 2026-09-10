-- Seed data for Bank Management System demo account
-- Card Number: 5040936012345678
-- PIN: 1234
-- Form No: 4841

USE bankSystem;

DELETE FROM bank WHERE pin = '1234';
DELETE FROM login WHERE formno = '4841';
DELETE FROM signupthree WHERE formno = '4841';
DELETE FROM signuptwo WHERE formno = '4841';
DELETE FROM signup WHERE formno = '4841';

INSERT INTO signup (
    formno, form_no, name, fname, father_name, dob, gender, email,
    marital, marital_status, address, city, pincode, state
) VALUES (
    '4841', '4841', 'Jatin Kumar', 'Rajesh Kumar', 'Rajesh Kumar', '2000-01-15',
    'Male', 'jatin@example.com', 'Unmarried', 'Unmarried',
    '123 Tech Park Avenue', 'New Delhi', '110001', 'Delhi'
);

INSERT INTO signuptwo (
    formno, form_no, religion, category, income, education, occupation, occuption,
    pan, aadhar, scitizen, seniorcitizen, eaccount, existing_account
) VALUES (
    '4841', '4841', 'Hindu', 'General', 'Above 10,00,000', 'Graduate', 'Salaried', 'Salaried',
    'ABCDE1234F', '123456789012', 'No', 'No', 'Yes', 'Yes'
);

INSERT INTO signupthree (formno, form_no, account_type, card_number, pin, facility)
VALUES (
    '4841', '4841', 'Saving Account', '5040936012345678', '1234',
    'ATM CARD Internet Banking EMAIL Alerts E-Statement'
);

INSERT INTO login (formno, form_no, card_number, pin)
VALUES ('4841', '4841', '5040936012345678', '1234');

INSERT INTO bank (pin, `date`, `type`, amount) VALUES
('1234', 'Fri Sep 04 10:00:00 IST 2026', 'Deposit', 25000.00),
('1234', 'Fri Sep 04 10:15:00 IST 2026', 'Deposit', 10000.00),
('1234', 'Fri Sep 04 10:30:00 IST 2026', 'Withdrawl', 2500.00),
('1234', 'Fri Sep 04 10:45:00 IST 2026', 'Withdrawl', 1000.00);
