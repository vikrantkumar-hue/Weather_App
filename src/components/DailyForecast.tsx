import React, { useState } from 'react';
import { DailyForecastItem, TemperatureUnit, WindUnit } from '../types/weather';
import { 
  formatTemp, 
  formatWind, 
  formatDayName, 
  formatShortDate, 
  getWeatherCondition, 
  formatTime,
  getUVDescription 
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Calendar, Droplets, Wind, Sunrise, Sunset, ChevronDown, ChevronUp } from 'lucide-react';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  tempUnit: TemperatureUnit;
  windUnit: WindUnit;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, tempUnit, windUnit }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // expand today by default

  if (!daily || daily.length === 0) return null;

  // Calculate overall 7-day min & max to render proportional temp range bar
  const overallMin = Math.min(...daily.map((d) => d.tempMin));
  const overallMax = Math.max(...daily.map((d) => d.tempMax));
  const tempSpan = overallMax - overallMin || 1;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            7-Day Weather Forecast
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500">Tap day for full details</span>
      </div>

      <div className="space-y-2.5">
        {daily.map((day, idx) => {
          const condition = getWeatherCondition(day.weatherCode);
          const isExpanded = expandedIndex === idx;

          // Proportional range bar calculations
          const leftPercent = Math.max(0, Math.min(100, ((day.tempMin - overallMin) / tempSpan) * 100));
          const widthPercent = Math.max(10, Math.min(100 - leftPercent, ((day.tempMax - day.tempMin) / tempSpan) * 100));

          const uvInfo = getUVDescription(day.uvIndexMax);

          return (
            <div
              key={day.date}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-sky-300 bg-sky-50/40 shadow-xs' 
                  : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              {/* Card Header Row */}
              <div
                onClick={() => toggleExpand(idx)}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                {/* Date & Day Name */}
                <div className="w-28 sm:w-36 shrink-0">
                  <p className="text-sm font-bold text-slate-900">
                    {formatDayName(day.date)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatShortDate(day.date)}
                  </p>
                </div>

                {/* Weather Condition Icon & Label */}
                <div className="flex items-center gap-2.5 flex-1 min-w-[120px]">
                  <div className="p-1.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                    <WeatherIcon name={condition.iconName} className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700 truncate hidden sm:inline">
                    {condition.label}
                  </span>
                </div>

                {/* Precipitation Badge */}
                {day.precipitationProbabilityMax > 10 ? (
                  <div className="hidden sm:flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-100/80 px-2 py-1 rounded-lg shrink-0">
                    <Droplets className="w-3 h-3 text-blue-600" />
                    <span>{day.precipitationProbabilityMax}%</span>
                  </div>
                ) : (
                  <div className="hidden sm:block w-16" />
                )}

                {/* Temperature Range & Progress Bar */}
                <div className="flex items-center gap-3 w-40 sm:w-52 shrink-0 justify-end">
                  <span className="text-xs font-bold text-slate-600 w-9 text-right">
                    {formatTemp(day.tempMin, tempUnit)}
                  </span>

                  {/* Temperature Gradient Bar */}
                  <div className="relative flex-1 h-2 bg-slate-200/80 rounded-full overflow-hidden hidden xs:block">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-amber-400 to-red-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-900 w-9 text-left">
                    {formatTemp(day.tempMax, tempUnit)}
                  </span>
                </div>

                {/* Expand Chevron */}
                <div className="text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-sky-600" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white/80">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <p className="text-slate-500 font-medium">Precipitation</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {day.precipitationSum > 0 ? `${day.precipitationSum} mm` : 'No rain'}
                    </p>
                    <p className="text-[10px] text-blue-600 font-medium mt-0.5">
                      {day.precipitationProbabilityMax}% chance
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <p className="text-slate-500 font-medium">Max Wind Speed</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {formatWind(day.windSpeedMax, windUnit)}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Daily max gust</p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <p className="text-slate-500 font-medium">Max UV Index</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-sm font-bold text-slate-900">{day.uvIndexMax}</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${uvInfo.badge}`}>
                        {uvInfo.label}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
                    <p className="text-slate-500 font-medium">Sun Schedule</p>
                    <div className="flex items-center gap-2 mt-0.5 text-slate-800 font-semibold text-[11px]">
                      <span className="flex items-center gap-1">
                        <Sunrise className="w-3 h-3 text-amber-500" />
                        {day.sunrise ? formatTime(day.sunrise) : '6:15 AM'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Sunset className="w-3 h-3 text-indigo-500" />
                        {day.sunset ? formatTime(day.sunset) : '8:20 PM'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
