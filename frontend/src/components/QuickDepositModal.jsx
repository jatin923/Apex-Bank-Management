import React, { useState } from 'react';
import Modal from './Modal';
import { ArrowDownRight, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const QuickDepositModal = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { refreshAccount } = useAuth();
    const { showToast } = useToast();

    const presets = [1000, 5000, 10000, 25000];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) {
            showToast('Please enter a valid deposit amount', 'error');
            return;
        }

        try {
            setSubmitting(true);
            const res = await axios.post('/api/transactions/deposit', { amount });
            if (res.data.success) {
                showToast(res.data.message, 'success');
                await refreshAccount();
                setAmount('');
                onClose();
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Deposit failed', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Deposit Funds" icon={ArrowDownRight}>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Enter Amount to Deposit
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                            ₹
                        </div>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 text-lg font-bold rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            required
                        />
                    </div>
                </div>

                {/* Presets */}
                <div>
                    <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-2">Quick Presets</p>
                    <div className="grid grid-cols-4 gap-2">
                        {presets.map(val => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => setAmount(val.toString())}
                                className="py-2 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 hover:text-emerald-600 border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                            >
                                +₹{val.toLocaleString('en-IN')}
                            </button>
                        ))}
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
                        className="flex-1 py-3 text-sm font-bold rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 disabled:opacity-50 transition-all"
                    >
                        {submitting ? 'Processing...' : 'Confirm Deposit'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default QuickDepositModal;
