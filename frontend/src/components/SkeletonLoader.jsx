import React from 'react';

export const StatCardSkeleton = () => (
    <div className="glass-card rounded-2xl p-6 shadow-sm animate-pulse">
        <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 animate-shimmer"></div>
            <div className="w-16 h-6 rounded-full bg-slate-200 dark:bg-slate-800 animate-shimmer"></div>
        </div>
        <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800 mb-2 animate-shimmer"></div>
        <div className="w-36 h-8 rounded-lg bg-slate-300 dark:bg-slate-700 animate-shimmer"></div>
    </div>
);

export const TableRowSkeleton = () => (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
        <td className="py-4 px-4"><div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-shimmer"></div></td>
        <td className="py-4 px-4"><div className="w-16 h-6 rounded-full bg-slate-200 dark:bg-slate-800 animate-shimmer"></div></td>
        <td className="py-4 px-4"><div className="w-32 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-shimmer"></div></td>
        <td className="py-4 px-4"><div className="w-20 h-5 rounded bg-slate-300 dark:bg-slate-700 animate-shimmer"></div></td>
    </tr>
);

export default { StatCardSkeleton, TableRowSkeleton };
