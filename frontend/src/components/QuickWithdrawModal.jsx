import React, { useState } from 'react';
import Modal from './Modal';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const QuickWithdrawModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { accountData, refreshAccount } = useAuth();
    const { showToast } = useToast();

    const currentBalance = accountData?.balance || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const num = parseFloat(amount);
        if (!amount || num <= 0) {
            showToast('Please enter a valid withdrawal amount', 'error');
            return;
        }

        if (num > 10000) {
            showToast('Maximum single withdrawal limit is ₹10,000', 'error');
            return;
        }

        if (num > currentBalance) {
            showToast(`Insufficient balance! Available: ₹${currentBalance.toLocaleString('en-IN')}`, 'error');
            return;
        }

        try {
            setSubmitting(true);
            const res = await axios.post('/api/transactions/withdraw', { amount });
            if (res.data.success) {
                showToast(res.data.message, 'success');
                await refreshAccount();
                setAmount('');
                onClose();
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Withdrawal failed', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Cash Withdrawal" icon={ArrowUpRight}>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">ATM Limit Warning</p>
                        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                            Maximum per-transaction cash withdrawal limit is <span className="font-bold">₹10,000</span>. Available Balance: <span className="font-bold">₹{currentBalance.toLocaleString('en-IN')}</span>
                        </p>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Amount to Withdraw
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            ₹
                        </div>
                        <input
                            type="number"
                            min="1"
                            max="10000"
                            step="any"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 text-lg font-bold rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-3 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-3 text-sm font-bold rounded-2xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30 disabled:opacity-50 transition-all"
                    >
                        {submitting ? 'Dispensing...' : 'Confirm Withdrawal'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default QuickWithdrawModal;
