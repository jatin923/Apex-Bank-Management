import React from 'react';
import { TableRowSkeleton } from './SkeletonLoader';
import { ArrowDownRight, ArrowUpRight, Search, Inbox, ChevronLeft, ChevronRight } from 'lucide-react';

const Table = ({
    transactions = [],
    loading = false,
    searchTerm = '',
    onSearchChange,
    filterType = 'all',
    onFilterChange,
    pagination,
    onPageChange
}) => {
    return (
        <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800/80">
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction History</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Mini Statement & Account Ledger</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Filter Tabs */}
                    <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
                        <button
                            onClick={() => onFilterChange('all')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'all'
                                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => onFilterChange('deposit')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'deposit'
                                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            Deposits
                        </button>
                        <button
                            onClick={() => onFilterChange('withdraw')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${filterType === 'withdraw'
                                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                        >
                            Withdrawals
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search transaction..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full sm:w-48 pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                            <th className="py-3 px-4">Date & Time</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                        {loading ? (
                            <>
                                <TableRowSkeleton />
                                <TableRowSkeleton />
                                <TableRowSkeleton />
                            </>
                        ) : transactions.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="py-12 text-center">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                                            <Inbox className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                            No Transactions Found
                                        </p>
                                        <p className="text-xs text-slate-400 max-w-xs">
                                            Try depositing or withdrawing cash to generate activity records.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx, idx) => {
                                const isDeposit = tx.type.toLowerCase().includes('deposit');
                                const amount = parseFloat(tx.amount) || 0;
                                return (
                                    <tr key={tx.id || idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                                        <td className="py-3.5 px-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                                            {tx.date}
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${isDeposit
                                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40'
                                                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40'
                                                }`}>
                                                {isDeposit ? (
                                                    <ArrowDownRight className="w-3.5 h-3.5" />
                                                ) : (
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                )}
                                                {isDeposit ? 'Deposit' : 'Withdrawal'}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                                                Completed
                                            </span>
                                        </td>
                                        <td className={`py-3.5 px-4 text-right text-sm font-extrabold font-mono ${isDeposit ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                                            }`}>
                                            {isDeposit ? '+' : '-'}₹{amount.toLocaleString('en-IN')}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Page <span className="font-bold text-slate-900 dark:text-white">{pagination.page}</span> of{' '}
                        <span className="font-bold text-slate-900 dark:text-white">{pagination.totalPages}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={pagination.page <= 1}
                            onClick={() => onPageChange(pagination.page - 1)}
                            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            disabled={pagination.page >= pagination.totalPages}
                            onClick={() => onPageChange(pagination.page + 1)}
                            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
