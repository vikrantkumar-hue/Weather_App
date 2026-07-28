import React from 'react';
import { HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemp, formatHour, getWeatherCondition } from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Clock, Droplets } from 'lucide-react';

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
  tempUnit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly, tempUnit }) => {
  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            24-Hour Forecast
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500">Hourly trend</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-2 px-2">
        {hourly.map((item, idx) => {
          const condition = getWeatherCondition(item.weatherCode);
          const isNow = idx === 0;

          return (
            <div
              key={`${item.time}-${idx}`}
              className={`flex-shrink-0 w-24 p-3 rounded-2xl border text-center transition-all ${
                isNow
                  ? 'bg-gradient-to-b from-sky-500 to-blue-600 text-white border-sky-600 shadow-md shadow-sky-500/20'
                  : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/80 text-slate-800'
              }`}
            >
              <p className={`text-xs font-semibold ${isNow ? 'text-sky-100' : 'text-slate-500'}`}>
                {isNow ? 'Now' : formatHour(item.time)}
              </p>

              <div className="my-2.5 flex justify-center">
                <WeatherIcon
                  name={condition.iconName}
                  className={`w-7 h-7 ${isNow ? 'text-amber-300' : 'text-sky-600'}`}
                />
              </div>

              <p className={`text-base font-bold ${isNow ? 'text-white' : 'text-slate-900'}`}>
                {formatTemp(item.temperature, tempUnit)}
              </p>

              {item.precipitationProbability > 0 ? (
                <div className={`mt-2 inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  isNow 
                    ? 'bg-white/20 text-white' 
                    : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                }`}>
                  <Droplets className="w-2.5 h-2.5 shrink-0" />
                  <span>{item.precipitationProbability}%</span>
                </div>
              ) : (
                <div className="h-5 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
