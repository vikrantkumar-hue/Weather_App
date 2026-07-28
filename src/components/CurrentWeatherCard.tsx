import React from 'react';
import { FullWeatherData, TemperatureUnit, WindUnit } from '../types/weather';
import { 
  getWeatherCondition, 
  formatTemp, 
  formatWind, 
  getWindDirectionLabel, 
  getUVDescription,
  formatTime 
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { MapPin, Thermometer, Droplets, Wind, Gauge, Sunrise, Sunset, Eye, Compass, CloudRain } from 'lucide-react';

interface CurrentWeatherCardProps {
  data: FullWeatherData;
  tempUnit: TemperatureUnit;
  windUnit: WindUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  data,
  tempUnit,
  windUnit,
}) => {
  const { location, current, daily } = data;
  const condition = getWeatherCondition(current.weatherCode);

  const todayDaily = daily && daily.length > 0 ? daily[0] : null;
  const tempMax = todayDaily ? todayDaily.tempMax : current.temperature + 3;
  const tempMin = todayDaily ? todayDaily.tempMin : current.temperature - 3;
  const uvInfo = getUVDescription(todayDaily?.uvIndexMax ?? 2);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm ${condition.theme.skyBg} p-6 sm:p-8 transition-all`}>
      {/* Decorative Atmospheric Radial Accent */}
      <div 
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: condition.theme.accentColor }}
      />

      <div className="relative z-10 space-y-6">
        {/* Top Bar: Location & Date */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-600 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {location.name}
              </h2>
              {location.country_code && (
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white/80 border border-slate-200 text-slate-700 shadow-2xs">
                  {location.country_code}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-slate-600 mt-1 pl-7">
              {[location.admin1, location.country].filter(Boolean).join(', ')}
            </p>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${condition.theme.badgeBg}`}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: condition.theme.accentColor }} />
              {condition.label}
            </span>
            <p className="text-xs text-slate-500 mt-1">
              Local Time: {formatTime(current.time)}
            </p>
          </div>
        </div>

        {/* Main Temperature & Weather Visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* Left Column: Huge Temperature Readout */}
          <div className="flex items-center gap-6">
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-md text-sky-600">
              <WeatherIcon name={condition.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tighter">
                  {formatTemp(current.temperature, tempUnit)}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Feels like <span className="text-slate-900 font-bold">{formatTemp(current.apparentTemperature, tempUnit)}</span>
              </p>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 mt-2">
                <span className="inline-flex items-center gap-1">
                  High: <strong className="text-red-600">{formatTemp(tempMax, tempUnit)}</strong>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  Low: <strong className="text-blue-600">{formatTemp(tempMin, tempUnit)}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Environmental Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Wind */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Wind</p>
                <p className="text-sm font-bold text-slate-900">
                  {formatWind(current.windSpeed, windUnit)}
                </p>
                <p className="text-[10px] text-slate-500">
                  {getWindDirectionLabel(current.windDirection)} ({current.windDirection}°)
                </p>
              </div>
            </div>

            {/* Humidity */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Humidity</p>
                <p className="text-sm font-bold text-slate-900">{current.relativeHumidity}%</p>
                <p className="text-[10px] text-slate-500">
                  {current.relativeHumidity > 70 ? 'High' : current.relativeHumidity < 30 ? 'Dry' : 'Comfortable'}
                </p>
              </div>
            </div>

            {/* UV Index */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">UV Index</p>
                <p className="text-sm font-bold text-slate-900">
                  {todayDaily ? todayDaily.uvIndexMax : 2}
                </p>
                <span className={`text-[10px] font-semibold ${uvInfo.color}`}>
                  {uvInfo.label}
                </span>
              </div>
            </div>

            {/* Pressure */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Pressure</p>
                <p className="text-sm font-bold text-slate-900">{Math.round(current.pressure)} hPa</p>
                <p className="text-[10px] text-slate-500">Normal</p>
              </div>
            </div>

            {/* Sunrise */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Sunrise className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Sunrise</p>
                <p className="text-sm font-bold text-slate-900">
                  {todayDaily?.sunrise ? formatTime(todayDaily.sunrise) : '6:15 AM'}
                </p>
              </div>
            </div>

            {/* Sunset */}
            <div className="p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xs flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800">
                <Sunset className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Sunset</p>
                <p className="text-sm font-bold text-slate-900">
                  {todayDaily?.sunset ? formatTime(todayDaily.sunset) : '8:20 PM'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
