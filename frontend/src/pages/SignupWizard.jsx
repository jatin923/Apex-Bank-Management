import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { Landmark, ArrowLeft, ArrowRight, CheckCircle2, Copy, ShieldCheck } from 'lucide-react';

const SignupWizard = ({ onNavigateLogin }) => {
    const [step, setStep] = useState(1);
    const [formno, setFormno] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(null);

    const { showToast } = useToast();

    // Step 1 Form State
    const [step1Data, setStep1Data] = useState({
        name: '',
        fname: '',
        dob: '2000-01-15',
        gender: 'Male',
        email: '',
        marital: 'Unmarried',
        address: '',
        city: '',
        pincode: '',
        state: ''
    });

    // Step 2 Form State
    const [step2Data, setStep2Data] = useState({
        religion: 'Hindu',
        category: 'General',
        income: 'Above 10,00,000',
        education: 'Graduate',
        occupation: 'Salaried',
        pan: '',
        aadhar: '',
        scitizen: 'No',
        eaccount: 'Yes'
    });

    // Step 3 Form State
    const [step3Data, setStep3Data] = useState({
        account_type: 'Saving Account',
        services: ['ATM CARD', 'Internet Banking', 'EMAIL Alerts']
    });

    // Step 1 Submit
    const handleStep1Submit = async (e) => {
        e.preventDefault();
        if (!step1Data.name || !step1Data.fname || !step1Data.email) {
            showToast('Please fill all mandatory personal details', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup/step1', step1Data);
            if (res.data.success) {
                setFormno(res.data.formno);
                showToast('Personal details saved! Proceeding to Step 2', 'success');
                setStep(2);
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Step 1 failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Step 2 Submit
    const handleStep2Submit = async (e) => {
        e.preventDefault();
        if (!step2Data.pan || !step2Data.aadhar) {
            showToast('PAN Number and Aadhar Number are required', 'error');
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup/step2', {
                ...step2Data,
                formno
            });
            if (res.data.success) {
                showToast('Additional details saved! Proceeding to Step 3', 'success');
                setStep(3);
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Step 2 failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Step 3 Final Submit
    const handleStep3Submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('/api/auth/signup/step3', {
                ...step3Data,
                formno
            });
            if (res.data.success) {
                setResultData(res.data.data);
                setStep(4); // Success step
                showToast('Bank Account Created Successfully!', 'success');
            }
        } catch (err) {
            showToast(err.response?.data?.message || 'Account creation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard!`, 'info');
    };

    return (
        <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

            <div className="relative w-full max-w-3xl glass-card bg-slate-900/90 rounded-3xl shadow-2xl border border-slate-800 p-6 sm:p-10">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                            <Landmark className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">New Account Application</h2>
                            <p className="text-xs text-slate-400">Step {step <= 3 ? step : 3} of 3 {formno ? `• Form No: #${formno}` : ''}</p>
                        </div>
                    </div>

                    <button
                        onClick={onNavigateLogin}
                        className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Login
                    </button>
                </div>

                {/* Progress Bar */}
                {step <= 3 && (
                    <div className="mb-8">
                        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                            <span className={step >= 1 ? 'text-indigo-400' : ''}>1. Personal Details</span>
                            <span className={step >= 2 ? 'text-indigo-400' : ''}>2. Additional Details</span>
                            <span className={step >= 3 ? 'text-indigo-400' : ''}>3. Account Setup</span>
                        </div>
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-300"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* STEP 1: Personal Details */}
                {step === 1 && (
                    <form onSubmit={handleStep1Submit} className="space-y-4">
                        <h3 className="text-base font-bold text-indigo-400 mb-2">Page 1: Personal Information</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Jatin Kumar"
                                    value={step1Data.name}
                                    onChange={e => setStep1Data({ ...step1Data, name: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Father's Name *</label>
                                <input
                                    type="text"
                                    placeholder="Rajesh Kumar"
                                    value={step1Data.fname}
                                    onChange={e => setStep1Data({ ...step1Data, fname: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    value={step1Data.dob}
                                    onChange={e => setStep1Data({ ...step1Data, dob: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Gender</label>
                                <select
                                    value={step1Data.gender}
                                    onChange={e => setStep1Data({ ...step1Data, gender: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Lgbtq</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    placeholder="jatin@example.com"
                                    value={step1Data.email}
                                    onChange={e => setStep1Data({ ...step1Data, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Marital Status</label>
                                <select
                                    value={step1Data.marital}
                                    onChange={e => setStep1Data({ ...step1Data, marital: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>Unmarried</option>
                                    <option>Married</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Address</label>
                                <input
                                    type="text"
                                    placeholder="123 Tech Park Avenue"
                                    value={step1Data.address}
                                    onChange={e => setStep1Data({ ...step1Data, address: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">City</label>
                                <input
                                    type="text"
                                    placeholder="New Delhi"
                                    value={step1Data.city}
                                    onChange={e => setStep1Data({ ...step1Data, city: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Pincode</label>
                                <input
                                    type="text"
                                    placeholder="110001"
                                    value={step1Data.pincode}
                                    onChange={e => setStep1Data({ ...step1Data, pincode: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">State</label>
                                <input
                                    type="text"
                                    placeholder="Delhi"
                                    value={step1Data.state}
                                    onChange={e => setStep1Data({ ...step1Data, state: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
                            >
                                {loading ? 'Saving...' : 'Next: Additional Details'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 2: Additional Details */}
                {step === 2 && (
                    <form onSubmit={handleStep2Submit} className="space-y-4">
                        <h3 className="text-base font-bold text-indigo-400 mb-2">Page 2: Additional Details & Identity verification</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Religion</label>
                                <select
                                    value={step2Data.religion}
                                    onChange={e => setStep2Data({ ...step2Data, religion: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>Hindu</option>
                                    <option>Muslim</option>
                                    <option>Sikh</option>
                                    <option>Christian</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Category</label>
                                <select
                                    value={step2Data.category}
                                    onChange={e => setStep2Data({ ...step2Data, category: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>General</option>
                                    <option>OBC</option>
                                    <option>SC</option>
                                    <option>ST</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Annual Income</label>
                                <select
                                    value={step2Data.income}
                                    onChange={e => setStep2Data({ ...step2Data, income: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>Null</option>
                                    <option>&lt;1,50,000</option>
                                    <option>&lt;2,50,000</option>
                                    <option>5,00,000</option>
                                    <option>Upto 10,00,000</option>
                                    <option>Above 10,00,000</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Educational Qualification</label>
                                <select
                                    value={step2Data.education}
                                    onChange={e => setStep2Data({ ...step2Data, education: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                >
                                    <option>Graduate</option>
                                    <option>Non-Graduate</option>
                                    <option>Post-Graduate</option>
                                    <option>Doctrate</option>
                                    <option>Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">PAN Number *</label>
                                <input
                                    type="text"
                                    placeholder="ABCDE1234F"
                                    value={step2Data.pan}
                                    onChange={e => setStep2Data({ ...step2Data, pan: e.target.value.toUpperCase() })}
                                    className="w-full px-4 py-2.5 font-mono text-sm font-bold tracking-wider rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Aadhar Number *</label>
                                <input
                                    type="text"
                                    placeholder="123456789012"
                                    maxLength={12}
                                    value={step2Data.aadhar}
                                    onChange={e => setStep2Data({ ...step2Data, aadhar: e.target.value })}
                                    className="w-full px-4 py-2.5 font-mono text-sm font-bold tracking-wider rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="py-3.5 px-6 rounded-2xl border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
                            >
                                {loading ? 'Saving...' : 'Next: Account Setup'} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 3: Account Setup */}
                {step === 3 && (
                    <form onSubmit={handleStep3Submit} className="space-y-6">
                        <h3 className="text-base font-bold text-indigo-400 mb-2">Page 3: Account & Card Configuration</h3>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Select Account Type</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { type: 'Saving Account', desc: 'Standard savings with interest earnings' },
                                    { type: 'Fixed Deposit Account', desc: 'High yield long term deposit' },
                                    { type: 'Current Account', desc: 'Commercial account for business transactions' },
                                    { type: 'Recurring Deposit Account', desc: 'Monthly investment plan' }
                                ].map(item => (
                                    <label
                                        key={item.type}
                                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${step3Data.account_type === item.type
                                                ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                                                : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:border-slate-600'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="account_type"
                                            checked={step3Data.account_type === item.type}
                                            onChange={() => setStep3Data({ ...step3Data, account_type: item.type })}
                                            className="sr-only"
                                        />
                                        <p className="text-sm font-bold">{item.type}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="py-3.5 px-6 rounded-2xl border border-slate-700 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                            >
                                {loading ? 'Issuing Card & Account...' : 'Submit Application & Create Account'}
                            </button>
                        </div>
                    </form>
                )}

                {/* STEP 4: Success Result */}
                {step === 4 && resultData && (
                    <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-white">Application Approved!</h3>
                            <p className="text-xs text-slate-400 mt-1">Your ATM Card and Digital Banking credentials have been generated.</p>
                        </div>

                        {/* Generated Card & PIN Box */}
                        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-md mx-auto text-left space-y-4 relative overflow-hidden">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                <div>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase">Debit Card Number</p>
                                    <p className="text-lg font-mono font-bold text-indigo-300 tracking-wider">
                                        {resultData.card_number.match(/.{1,4}/g)?.join(' ')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(resultData.card_number, 'Card Number')}
                                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <div>
                                    <p className="text-[10px] font-mono text-slate-400 uppercase">ATM Security PIN</p>
                                    <p className="text-xl font-mono font-black text-emerald-400 tracking-widest">
                                        {resultData.pin}
                                    </p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(resultData.pin, 'PIN')}
                                    className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 border border-slate-700"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={onNavigateLogin}
                            className="w-full max-w-md py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all mx-auto"
                        >
                            Proceed to ATM Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignupWizard;
