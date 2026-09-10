import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, colorScheme = 'indigo', subtext }) => {
    const schemeStyles = {
        indigo: {
            iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
            badgeBg: 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/40'
        },
        emerald: {
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
            badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
        },
        rose: {
            iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
            badgeBg: 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/40'
        },
        sky: {
            iconBg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
            badgeBg: 'bg-sky-100 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40'
        }
    };

    const style = schemeStyles[colorScheme] || schemeStyles.indigo;

    return (
        <div className="glass-card rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${style.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend && (
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${style.badgeBg}`}>
                        {trend}
                    </span>
                )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {title}
            </p>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                {value}
            </h4>
            {subtext && (
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-2">
                    {subtext}
                </p>
            )}
        </div>
    );
};

export default StatCard;
