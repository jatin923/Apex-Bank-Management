-- MySQL Database Schema for Modern Bank Management System

CREATE DATABASE IF NOT EXISTS bankSystem
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE bankSystem;

DROP TABLE IF EXISTS bank;
DROP TABLE IF EXISTS signupthree;
DROP TABLE IF EXISTS signuptwo;
DROP TABLE IF EXISTS login;
DROP TABLE IF EXISTS signup;

-- 1. Signup Page 1: Personal Details
-- Duplicate columns (form_no, father_name, marital_status) keep the Node API compatible.
CREATE TABLE signup (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users / Login Credentials
CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    formno VARCHAR(20) NOT NULL,
    form_no VARCHAR(20),
    card_number VARCHAR(20) NOT NULL UNIQUE,
    pin VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Signup Page 2: Additional Details
-- occuption / seniorcitizen / existing_account match legacy Java + Node column names.
CREATE TABLE signuptwo (
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
    existing_account VARCHAR(10),
    FOREIGN KEY (formno) REFERENCES signup(formno) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Signup Page 3: Account & Card Details
CREATE TABLE signupthree (
    formno VARCHAR(20) PRIMARY KEY,
    form_no VARCHAR(20),
    account_type VARCHAR(50) NOT NULL,
    card_number VARCHAR(20) NOT NULL UNIQUE,
    pin VARCHAR(10) NOT NULL,
    facility TEXT,
    FOREIGN KEY (formno) REFERENCES signup(formno) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Transactions
-- `date` and `type` are reserved MySQL words, so they must be quoted.
CREATE TABLE bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pin VARCHAR(10) NOT NULL,
    `date` VARCHAR(100) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_bank_pin (pin)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
