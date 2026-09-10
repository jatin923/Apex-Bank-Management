import React from 'react';
import {
    LayoutDashboard,
    ArrowDownRight,
    ArrowUpRight,
    Zap,
    KeyRound,
    Receipt,
    UserCheck,
    CreditCard
} from 'lucide-react';

const Sidebar = ({
    activeTab,
    setActiveTab,
    onOpenDeposit,
    onOpenWithdraw,
    onOpenFastCash,
    onOpenChangePin
}) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Mini Statement', icon: Receipt },
        { id: 'settings', label: 'Account Profile', icon: UserCheck }
    ];

    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="glass-card rounded-3xl p-5 shadow-sm border border-slate-200/80 dark:border-slate-800/80 sticky top-24">
                <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
                        Main Menu
                    </p>
                    <nav className="flex flex-col gap-1">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${isActive
                                            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <hr className="border-slate-100 dark:border-slate-800 my-4" />

                {/* Quick ATM Actions */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-3">
                        ATM Operations
                    </p>
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={onOpenDeposit}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/40 transition-colors"
                        >
                            <ArrowDownRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            Deposit Cash
                        </button>

                        <button
                            onClick={onOpenWithdraw}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200/60 dark:border-rose-800/40 transition-colors"
                        >
                            <ArrowUpRight className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            Cash Withdrawal
                        </button>

                        <button
                            onClick={onOpenFastCash}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-200/60 dark:border-amber-800/40 transition-colors"
                        >
                            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            Fast Cash
                        </button>

                        <button
                            onClick={onOpenChangePin}
                            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 border border-indigo-200/60 dark:border-indigo-800/40 transition-colors"
                        >
                            <KeyRound className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            Change PIN
                        </button>
                    </div>
                </div>

                {/* Card Widget Badge */}
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white shadow-lg relative overflow-hidden border border-slate-800">
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full bg-indigo-500/20 blur-xl pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-3">
                        <CreditCard className="w-6 h-6 text-indigo-400" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-300 uppercase">
                            DEBIT CARD
                        </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-400">Card Status</p>
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        Active & Secured
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
