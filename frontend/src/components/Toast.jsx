import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ toast, onClose }) => {
    const { message, type } = toast;

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
        error: <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />,
        info: <Info className="w-5 h-5 text-sky-500 flex-shrink-0" />
    };

    const borders = {
        success: 'border-emerald-500/30 dark:border-emerald-500/20 bg-white dark:bg-slate-900',
        error: 'border-rose-500/30 dark:border-rose-500/20 bg-white dark:bg-slate-900',
        info: 'border-sky-500/30 dark:border-sky-500/20 bg-white dark:bg-slate-900'
    };

    return (
        <div className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border ${borders[type] || borders.info} transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2`}>
            <div className="flex items-center gap-3">
                {icons[type] || icons.info}
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
