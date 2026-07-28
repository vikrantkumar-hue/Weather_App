import React from 'react';
import { TemperatureUnit, WindUnit } from '../types/weather';
import { CloudSun, RefreshCw, Sparkles } from 'lucide-react';

interface HeaderProps {
  tempUnit: TemperatureUnit;
  onToggleTempUnit: (unit: TemperatureUnit) => void;
  windUnit: WindUnit;
  onToggleWindUnit: (unit: WindUnit) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
  lastUpdated?: string;
}

export const Header: React.FC<HeaderProps> = ({
  tempUnit,
  onToggleTempUnit,
  windUnit,
  onToggleWindUnit,
  onRefresh,
  isRefreshing = false,
  lastUpdated,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Weather Intelligence
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
                <Sparkles className="w-2.5 h-2.5 text-sky-500" /> Live
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Precision forecast & smart outdoor insights
            </p>
          </div>
        </div>

        {/* Controls: Units & Refresh */}
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            title={lastUpdated ? `Last updated: ${lastUpdated}` : 'Refresh Weather'}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
          </button>

          {/* Temperature Unit Toggle */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onToggleTempUnit('C')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                tempUnit === 'C'
                  ? 'bg-white text-sky-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onToggleTempUnit('F')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                tempUnit === 'F'
                  ? 'bg-white text-sky-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              °F
            </button>
          </div>

          {/* Wind Unit Toggle */}
          <div className="hidden md:flex items-center p-0.5 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => onToggleWindUnit('kmh')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                windUnit === 'kmh'
                  ? 'bg-white text-sky-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              km/h
            </button>
            <button
              onClick={() => onToggleWindUnit('mph')}
              className={`px-2 py-1 text-xs font-medium rounded-lg transition-all ${
                windUnit === 'mph'
                  ? 'bg-white text-sky-600 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              mph
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
