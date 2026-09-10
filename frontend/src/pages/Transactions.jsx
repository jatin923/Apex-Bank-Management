import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Download, Printer, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Transactions = () => {
    const { user, accountData } = useAuth();
    const { showToast } = useToast();

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

    useEffect(() => {
        fetchTransactions(1, filterType, searchTerm);
    }, [filterType]);

    const fetchTransactions = async (page = 1, type = filterType, search = searchTerm) => {
        try {
            setLoading(true);
            const res = await axios.get('/api/transactions', {
                params: { page, limit: 20, type, search }
            });
            if (res.data.success) {
                setTransactions(res.data.transactions);
                setPagination(res.data.pagination);
            }
        } catch (err) {
            console.error('Failed to fetch transactions:', err);
        } finally {
            setLoading(false);
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

    const handlePrint = () => {
        window.print();
    };

    const handleExportCSV = () => {
        if (!transactions.length) {
            showToast('No transactions to export', 'error');
            return;
        }

        const headers = ['Date', 'Type', 'Amount (INR)', 'Status'];
        const rows = transactions.map(tx => [
            `"${tx.date}"`,
            `"${tx.type}"`,
            tx.amount,
            'Completed'
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Mini_Statement_${user?.formno || 'bank'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Statement CSV downloaded!', 'success');
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        Mini Statement & Account History
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Detailed passbook record for Card: •••• •••• •••• {user?.card_number?.slice(-4) || '4841'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 text-xs font-bold transition-colors"
                    >
                        <Download className="w-4 h-4 text-indigo-500" /> Export CSV
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-colors"
                    >
                        <Printer className="w-4 h-4" /> Print Statement
                    </button>
                </div>
            </div>

            <Table
                transactions={transactions}
                loading={loading}
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

export default Transactions;
