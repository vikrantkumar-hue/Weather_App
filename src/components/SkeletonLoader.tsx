import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full space-y-6 animate-pulse">
      {/* Current Hero Card Skeleton */}
      <div className="p-8 rounded-3xl bg-slate-200/70 h-72 w-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-slate-300 rounded-lg" />
            <div className="h-4 w-32 bg-slate-300 rounded-md" />
          </div>
          <div className="h-6 w-24 bg-slate-300 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-slate-300 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-14 w-32 bg-slate-300 rounded-xl" />
              <div className="h-4 w-24 bg-slate-300 rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-300 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Timeline Skeleton */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4">
        <div className="h-6 w-40 bg-slate-200 rounded-lg" />
        <div className="flex gap-3 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-24 h-28 bg-slate-100 rounded-2xl shrink-0" />
          ))}
        </div>
      </div>

      {/* Daily Forecast Skeleton */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
        <div className="h-6 w-48 bg-slate-200 rounded-lg" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
};
