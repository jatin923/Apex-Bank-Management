import React, { useState } from 'react';
import Modal from './Modal';
import { Zap } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const FastCashModal = ({ isOpen, onClose }) => {
    const [submitting, setSubmitting] = useState(false);
    const { accountData, refreshAccount } = useAuth();
    const { showToast } = useToast();

    const presets = [100, 500, 1000, 2000, 5000, 10000];
    const currentBalance = accountData?.balance || 0;

    const handleFastCashSelect = async (amount) => {
        if (amount > currentBalance) {
            showToast(`Insufficient balance for ₹${amount}. Available: ₹${currentBalance.toLocaleString('en-IN')}`, 'error');
            return;
        }

        try {
            setSubmitting(true);
            const res = await axios.post('/api/transactions/fast-cash', { amount });
            if (res.data.success) {
                showToast(res.data.message, 'success');
                await refreshAccount();
                onClose();
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Fast Cash withdrawal failed', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Fast Cash ATM" icon={Zap}>
            <div className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select a pre-set amount for instant cash withdrawal without typing.
                </p>

                <div className="grid grid-cols-2 gap-3 py-2">
                    {presets.map(amt => (
                        <button
                            key={amt}
                            disabled={submitting}
                            onClick={() => handleFastCashSelect(amt)}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-amber-950/50 hover:text-amber-700 dark:hover:text-amber-300 border border-slate-200/80 dark:border-slate-700/80 text-left transition-all duration-200 hover:-translate-y-0.5"
                        >
                            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Fast Cash</p>
                            <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                                ₹{amt.toLocaleString('en-IN')}
                            </p>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-3 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-2"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
};

export default FastCashModal;
