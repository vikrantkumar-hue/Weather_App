import React from 'react';
import { FullWeatherData, WindUnit } from '../types/weather';
import { formatWind, getWindDirectionLabel } from '../utils/weather';
import { Droplets, Wind, Gauge, Eye, Cloud, Thermometer, Compass, Sun } from 'lucide-react';

interface WeatherMetricsGridProps {
  data: FullWeatherData;
  windUnit: WindUnit;
}

export const WeatherMetricsGrid: React.FC<WeatherMetricsGridProps> = ({ data, windUnit }) => {
  const { current, daily } = data;
  const todayDaily = daily && daily.length > 0 ? daily[0] : null;

  // Approximate Dew Point: T - ((100 - RH)/5)
  const dewPoint = Math.round(current.temperature - ((100 - current.relativeHumidity) / 5));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* 1. Dew Point */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Dew Point</span>
          <Droplets className="w-4 h-4 text-blue-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">{dewPoint}°C</p>
        <p className="text-[10px] font-medium text-slate-500">
          {dewPoint > 20 ? 'Muggy feel' : dewPoint > 15 ? 'Humid' : 'Comfortable'}
        </p>
      </div>

      {/* 2. Cloud Cover */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Cloud Cover</span>
          <Cloud className="w-4 h-4 text-sky-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">{current.cloudCover}%</p>
        <p className="text-[10px] font-medium text-slate-500">
          {current.cloudCover > 80 ? 'Fully overcast' : current.cloudCover > 40 ? 'Partly cloudy' : 'Clear skies'}
        </p>
      </div>

      {/* 3. Wind Direction */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Wind Bearing</span>
          <Compass className="w-4 h-4 text-indigo-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">
          {getWindDirectionLabel(current.windDirection)} ({current.windDirection}°)
        </p>
        <p className="text-[10px] font-medium text-slate-500">
          Blowing towards {getWindDirectionLabel((current.windDirection + 180) % 360)}
        </p>
      </div>

      {/* 4. Daily Max Wind Gust */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Max Gusts</span>
          <Wind className="w-4 h-4 text-teal-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">
          {todayDaily ? formatWind(todayDaily.windSpeedMax, windUnit) : formatWind(current.windSpeed * 1.3, windUnit)}
        </p>
        <p className="text-[10px] font-medium text-slate-500">Peak velocity today</p>
      </div>

      {/* 5. Rainfall Accumulation */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Precipitation</span>
          <Droplets className="w-4 h-4 text-cyan-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">
          {todayDaily ? `${todayDaily.precipitationSum} mm` : `${current.precipitation} mm`}
        </p>
        <p className="text-[10px] font-medium text-slate-500">
          {todayDaily && todayDaily.precipitationProbabilityMax > 0 
            ? `${todayDaily.precipitationProbabilityMax}% rain chance`
            : 'Low rain likelihood'}
        </p>
      </div>

      {/* 6. Pressure Level */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200/80 transition-colors shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-slate-500">
          <span className="text-xs font-semibold uppercase tracking-wider">Barometer</span>
          <Gauge className="w-4 h-4 text-purple-500" />
        </div>
        <p className="text-xl font-bold text-slate-900">{Math.round(current.pressure)} hPa</p>
        <p className="text-[10px] font-medium text-slate-500">
          {current.pressure > 1020 ? 'High pressure (Fair)' : current.pressure < 1005 ? 'Low pressure (Stormy)' : 'Stable barometric'}
        </p>
      </div>
    </div>
  );
};
