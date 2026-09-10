import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Landmark, Sun, Moon, LogOut, CreditCard, ShieldCheck, User } from 'lucide-react';

const Navbar = ({ onOpenDeposit, onOpenWithdraw }) => {
    const { user, accountData, logout } = useAuth();
    const { darkMode, toggleTheme } = useTheme();

    const formattedCard = user?.card_number
        ? `•••• •••• •••• ${user.card_number.slice(-4)}`
        : '•••• •••• •••• 4841';

    const balance = accountData?.balance !== undefined ? accountData.balance : 0;

    return (
        <header className="sticky top-0 z-30 w-full glass-nav border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-extrabold text-lg">
                        <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                            ApexBank
                        </span>
                        <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50">
                            Digital ATM
                        </span>
                    </div>
                </div>

                {/* Account Quick Balance & Actions */}
                {user && (
                    <div className="flex items-center gap-3 sm:gap-4">
                        {/* Quick Balance Pill */}
                        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Balance:</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                ₹{balance.toLocaleString('en-IN')}
                            </span>
                        </div>

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Light/Dark Theme"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
                        </button>

                        {/* User Menu */}
                        <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                            <div className="hidden md:block text-right">
                                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
                                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end">
                                    <CreditCard className="w-3 h-3" /> {formattedCard}
                                </p>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-2"
                                title="Sign Out"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="hidden sm:inline text-xs font-bold">Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
