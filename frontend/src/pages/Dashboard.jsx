import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import Table from '../components/Table';
import {
    Wallet,
    ArrowDownRight,
    ArrowUpRight,
    History,
    CreditCard,
    ShieldCheck,
    Zap,
    KeyRound
} from 'lucide-react';
import axios from 'axios';

const Dashboard = ({
    onOpenDeposit,
    onOpenWithdraw,
    onOpenFastCash,
    onOpenChangePin
}) => {
    const { user, accountData, loading: authLoading } = useAuth();

    const [transactions, setTransactions] = useState([]);
    const [loadingTx, setLoadingTx] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    useEffect(() => {
        fetchTransactions(1, filterType, searchTerm);
    }, [filterType]);

    const fetchTransactions = async (page = 1, type = filterType, search = searchTerm) => {
        try {
            setLoadingTx(true);
            const res = await axios.get('/api/transactions', {
                params: { page, limit: 10, type, search }
            });
            if (res.data.success) {
                setTransactions(res.data.transactions);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error('Failed to fetch transactions:', err);
        } finally {
            setLoadingTx(false);
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        fetchTransactions(1, filterType, term);
    };

    const handleFilter = (type) => {
        setFilterType(type);
        fetchTransactions(1, type, searchTerm);
    };

    const handlePageChange = (newPage) => {
        fetchTransactions(newPage, filterType, searchTerm);
    };

    const balance = accountData?.balance !== undefined ? accountData.balance : 0;
    const deposits = accountData?.totalDeposits !== undefined ? accountData.totalDeposits : 0;
    const withdrawals = accountData?.totalWithdrawals !== undefined ? accountData.totalWithdrawals : 0;
    const txCount = accountData?.transactionCount !== undefined ? accountData.transactionCount : 0;

    return (
        <div className="space-y-8">
            {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Welcome back, {user?.name || 'Account Holder'}!
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Here is your real-time account breakdown and ATM transaction log.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Account Active
                    </span>
                </div>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatCard
                    title="Available Balance"
                    value={`₹${balance.toLocaleString('en-IN')}`}
                    icon={Wallet}
                    colorScheme="indigo"
                    trend="Primary"
                    subtext="Real-time ledger balance"
                />

                <StatCard
                    title="Total Deposits"
                    value={`₹${deposits.toLocaleString('en-IN')}`}
                    icon={ArrowDownRight}
                    colorScheme="emerald"
                    trend="+ Received"
                    subtext="Cumulative credits"
                />

                <StatCard
                    title="Total Withdrawals"
                    value={`₹${withdrawals.toLocaleString('en-IN')}`}
                    icon={ArrowUpRight}
                    colorScheme="rose"
                    trend="- Debited"
                    subtext="Cumulative cash debits"
                />

                <StatCard
                    title="Total Transactions"
                    value={txCount.toString()}
                    icon={History}
                    colorScheme="sky"
                    trend="Activity"
                    subtext="Processed ATM actions"
                />
            </div>

            {/* Quick Actions Panel */}
            <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                    Quick ATM Actions
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                        onClick={onOpenDeposit}
                        className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <ArrowDownRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">Deposit Cash</span>
                    </button>

                    <button
                        onClick={onOpenWithdraw}
                        className="p-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">Cash Withdrawal</span>
                    </button>

                    <button
                        onClick={onOpenFastCash}
                        className="p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">Fast Cash</span>
                    </button>

                    <button
                        onClick={onOpenChangePin}
                        className="p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            <KeyRound className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold">Change PIN</span>
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <Table
                transactions={transactions}
                loading={loadingTx}
                searchTerm={searchTerm}
                onSearchChange={handleSearch}
                filterType={filterType}
                onFilterChange={handleFilter}
                pagination={pagination}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Dashboard;
