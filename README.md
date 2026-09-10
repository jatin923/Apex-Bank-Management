# Modern Bank Management System (React + Tailwind CSS + Node.js + MySQL)

A modern, responsive, and accessible digital banking & ATM management web application migrated from legacy Java Swing + MySQL architecture.

---

## 🌟 Features & Highlights

- **Authentication & ATM Login:**
  - Login with 16-digit Debit Card Number & 4-digit PIN.
  - Auto card formatting and demo fill support (`Card: 5040 9360 1234 5678`, `PIN: 1234`).
  - 3-Step Account Application Wizard (Personal Details -> Additional Info & Government IDs -> Account & ATM Card Generation).
- **Core ATM Operations:**
  - **Deposit Cash:** Quick deposit modal with preset buttons (₹1,000, ₹5,000, ₹10,000, ₹25,000).
  - **Cash Withdrawal:** Balance validation and single-withdrawal limit checks (₹10,000 max per transaction).
  - **Fast Cash:** One-click preset withdrawal grid (₹100, ₹500, ₹1,000, ₹2,000, ₹5,000, ₹10,000).
  - **Change PIN:** Update 4-digit security PIN across all database tables.
  - **Mini Statement & Ledger:** Paginated transaction history table with search, filter tabs (Deposits / Withdrawals), CSV export, and print passbook capability.
- **Modern 2026 UI/UX Design System:**
  - **Tailwind CSS v4 + Vite + React 18.**
  - **Glassmorphic Cards & Ambient Gradients.**
  - **Dark / Light Theme Toggle** with persistence.
  - **WCAG 2.2 Accessibility:** Keyboard navigation, contrast compliance, aria attributes.
  - **Shimmer Skeleton Loaders & Toast Notifications.**

---

## 🗂️ Project Architecture

```text
/youtube
├── /database
│   ├── schema.sql        # MySQL table definitions (login, signup, signuptwo, signupthree, bank)
│   └── seed.sql          # Seed data with demo accounts and initial transactions
├── /backend
│   ├── /controllers      # authController, accountController, transactionController
│   ├── /routes           # authRoutes, accountRoutes, transactionRoutes
│   ├── /middleware       # authMiddleware (JWT token verification)
│   ├── db.js             # MySQL pool connection + automatic offline mock DB fallback
│   ├── server.js         # Express server entry point
│   ├── package.json
│   └── .env
├── /frontend
│   ├── /src
│   │   ├── /components   # Navbar, Sidebar, StatCard, Table, Modal, Toast, SkeletonLoader, Modals
│   │   ├── /pages        # Login, SignupWizard, Dashboard, Transactions, Settings
│   │   ├── /context      # AuthContext, ThemeContext, ToastContext
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Database Setup (MySQL)
Import the schema and seed data into your MySQL server:
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```
*(Note: If MySQL is offline or not installed locally, the Node.js backend automatically starts with an in-memory mock database preloaded with demo data so you can test seamlessly).*

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The Express REST API will start on **`http://localhost:5000`**.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The React + Vite application will open at **`http://localhost:3000`**.

---

## 🔐 Demo Credentials
- **Debit Card Number:** `5040 9360 1234 5678`
- **PIN:** `1234`
- **Form No:** `4841`
#
