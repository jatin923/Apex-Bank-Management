import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Landmark, CreditCard, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Login = ({ onNavigateSignup }) => {
    const [cardNo, setCardNo] = useState('');
    const [pin, setPin] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const { showToast } = useToast();

    // Auto format card number with spaces every 4 digits
    const handleCardChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 16);
        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        setCardNo(formatted);
    };

    const handleQuickDemo = () => {
        setCardNo('5040 9360 1234 5678');
        setPin('1234');
        showToast('Demo credentials auto-filled!', 'info');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawCard = cardNo.replace(/\s/g, '');
        if (!rawCard || rawCard.length < 16) {
            showToast('Please enter a valid 16-digit Card Number', 'error');
            return;
        }
        if (!pin || pin.length !== 4) {
            showToast('Please enter your 4-digit PIN', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await login(rawCard, pin);
            if (res.success) {
                showToast(`Welcome back, ${res.user.name}!`, 'success');
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Invalid Card Number or PIN', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            {/* Ambient Animated Gradients */}
            <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-sky-500/20 blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-4xl glass-card bg-slate-900/80 rounded-3xl shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left Side: Branding & Features */}
                <div className="p-8 sm:p-10 bg-gradient-to-br from-indigo-900/60 via-slate-900 to-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
                                <Landmark className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 to-sky-300 bg-clip-text text-transparent">
                                    ApexBank
                                </h1>
                                <p className="text-xs font-semibold text-slate-400">Digital ATM & Banking System</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl sm:text-2xl font-bold leading-snug">
                                Secure, Fast & Modern Banking Experience
                            </h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Access your accounts, perform instant cash deposits, withdrawals, and manage your ATM card features with WCAG 2.2 compliant accessibility.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div className="text-xs">
                                <p className="font-bold text-slate-200">Bank-Grade Encryption</p>
                                <p className="text-slate-400 text-[11px]">Protected by 256-bit SSL & JWT Auth</p>
                            </div>
                        </div>

                        {/* Quick Demo Fill CTA */}
                        <button
                            type="button"
                            onClick={handleQuickDemo}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 text-xs font-bold transition-all"
                        >
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            Fill Demo Credentials (Card & PIN)
                        </button>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold">ATM Login</h3>
                        <p className="text-xs text-slate-400 mt-1">Enter your 16-digit Debit Card Number and 4-digit PIN</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Card Number Field */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                Card Number
                            </label>
                            <div className="relative">
                                <CreditCard className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="5040 9360 1234 5678"
                                    value={cardNo}
                                    onChange={handleCardChange}
                                    className="w-full pl-12 pr-4 py-3.5 font-mono text-sm font-bold tracking-wider rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* PIN Field */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                4-Digit PIN
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input
                                    type="password"
                                    maxLength={4}
                                    placeholder="••••"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 font-mono text-lg font-bold tracking-widest rounded-2xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'SIGN IN TO ATM'}
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-xs text-slate-400">
                            Don't have a bank account yet?{' '}
                            <button
                                onClick={onNavigateSignup}
                                className="font-bold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 ml-1 transition-colors"
                            >
                                Apply for New Account (Sign Up)
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
