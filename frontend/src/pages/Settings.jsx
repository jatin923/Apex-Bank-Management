import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, CreditCard, ShieldCheck, KeyRound, Mail, MapPin, Building2, Calendar } from 'lucide-react';

const Settings = ({ onOpenChangePin }) => {
    const { user, accountData } = useAuth();

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Account Profile & Settings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Manage your bank profile information and security options.
                </p>
            </div>

            {/* Profile Overview Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800/80">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-sky-400 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-indigo-500/20">
                            {user?.name ? user.name.charAt(0) : 'U'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {user?.name || 'Account Holder'}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                Form No: #{user?.formno} • Account Type: {accountData?.account_type || 'Saving Account'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onOpenChangePin}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 border border-indigo-200 dark:border-indigo-800/50 text-xs font-bold transition-colors"
                    >
                        <KeyRound className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        Update Security PIN
                    </button>
                </div>

                {/* Profile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <CreditCard className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Debit Card Number</p>
                            <p className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                                {user?.card_number ? user.card_number.match(/.{1,4}/g)?.join(' ') : '•••• •••• •••• 4841'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <Mail className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Email Address</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                                {accountData?.email || user?.email || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <MapPin className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">City & State</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                                {accountData?.city || 'New Delhi'}, {accountData?.state || 'Delhi'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <Building2 className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase">Banking Facilities</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                                {accountData?.facility || 'ATM CARD, Internet Banking'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
