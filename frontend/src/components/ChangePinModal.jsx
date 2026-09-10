import React, { useState } from 'react';
import Modal from './Modal';
import { KeyRound, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ChangePinModal = ({ isOpen, onClose }) => {
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { logout } = useAuth();
    const { showToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPin || !newPin || !confirmPin) {
            showToast('All fields are required', 'error');
            return;
        }

        if (newPin !== confirmPin) {
            showToast('New PIN and Confirm PIN do not match', 'error');
            return;
        }

        if (newPin.length !== 4 || isNaN(newPin)) {
            showToast('PIN must be a 4-digit number', 'error');
            return;
        }

        try {
            setSubmitting(true);
            const res = await axios.post('/api/account/change-pin', {
                oldPin,
                newPin,
                confirmPin
            });

            if (res.data.success) {
                showToast(res.data.message, 'success');
                setOldPin('');
                setNewPin('');
                setConfirmPin('');
                onClose();
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to change PIN', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Change Security PIN" icon={KeyRound}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        Current 4-Digit PIN
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={oldPin}
                        onChange={(e) => setOldPin(e.target.value)}
                        className="w-full px-4 py-2.5 text-center text-lg font-mono font-bold tracking-widest rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        New 4-Digit PIN
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        className="w-full px-4 py-2.5 text-center text-lg font-mono font-bold tracking-widest rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                        Re-Enter New PIN
                    </label>
                    <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={confirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        className="w-full px-4 py-2.5 text-center text-lg font-mono font-bold tracking-widest rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        required
                    />
                </div>

                <div className="flex gap-3 pt-3">
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
                        className="flex-1 py-3 text-sm font-bold rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 disabled:opacity-50 transition-all"
                    >
                        {submitting ? 'Updating...' : 'Update PIN'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePinModal;
