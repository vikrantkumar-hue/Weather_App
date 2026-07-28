import React, { useState, useEffect, useCallback } from 'react';
import { 
  GeoLocationItem, 
  FullWeatherData, 
  TemperatureUnit, 
  WindUnit 
} from './types/weather';
import { getWeatherData, reverseGeocode, searchCities } from './services/weatherApi';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { ActivityPlanner } from './components/ActivityPlanner';
import { WeatherMetricsGrid } from './components/WeatherMetricsGrid';
import { ErrorAlert } from './components/ErrorAlert';
import { SkeletonLoader } from './components/SkeletonLoader';
import { CloudSun, Info } from 'lucide-react';

const DEFAULT_CITY: GeoLocationItem = {
  id: 2643743,
  name: 'London',
  latitude: 51.5085,
  longitude: -0.1257,
  country: 'United Kingdom',
  admin1: 'England',
  country_code: 'GB',
  timezone: 'Europe/London',
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState<GeoLocationItem>(() => {
    const saved = localStorage.getItem('wi_selected_city');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return DEFAULT_CITY;
  });

  const [weatherData, setWeatherData] = useState<FullWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem('wi_temp_unit') as TemperatureUnit) || 'C';
  });

  const [windUnit, setWindUnit] = useState<WindUnit>(() => {
    return (localStorage.getItem('wi_wind_unit') as WindUnit) || 'kmh';
  });

  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch weather function
  const fetchWeatherForLocation = useCallback(async (location: GeoLocationItem, silent = false) => {
    if (!silent) {
      setIsLoading(true);
      setWeatherData(null); // Explicitly clear weatherData when a new search/fetch starts
    } else {
      setIsRefreshing(true);
    }
    
    setError(null);

    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
      setSelectedCity(location);
      localStorage.setItem('wi_selected_city', JSON.stringify(location));
      setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    } catch (err: any) {
      setWeatherData(null); // Explicitly clear weatherData on API error
      setError(err.message || 'Failed to retrieve weather data for this location. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Search by text query string (e.g. searching "QZX998877" or "Tokyo")
  const handleSearchQuery = async (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setWeatherData(null); // Explicitly clear weatherData immediately when a new search starts
    setError(null);

    try {
      const results = await searchCities(trimmed);
      if (!results || results.length === 0) {
        setWeatherData(null); // Explicitly set weatherData to null on city lookup error
        setError(`No location found matching "${trimmed}". Please check the spelling and try another search.`);
      } else {
        const topResult = results[0];
        const data = await getWeatherData(topResult);
        setWeatherData(data);
        setSelectedCity(topResult);
        localStorage.setItem('wi_selected_city', JSON.stringify(topResult));
        setLastUpdated(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      }
    } catch (err: any) {
      setWeatherData(null); // Explicitly set weatherData to null on error
      setError(err.message || `Failed to search weather for "${trimmed}". Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWeatherForLocation(selectedCity);
  }, [fetchWeatherForLocation, selectedCity]);

  // Unit handler wrappers
  const handleToggleTempUnit = (unit: TemperatureUnit) => {
    setTempUnit(unit);
    localStorage.setItem('wi_temp_unit', unit);
  };

  const handleToggleWindUnit = (unit: WindUnit) => {
    setWindUnit(unit);
    localStorage.setItem('wi_wind_unit', unit);
  };

  // GPS Geolocation trigger
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setWeatherData(null);
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setWeatherData(null); // Explicitly clear weatherData when location search starts
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const loc = await reverseGeocode(lat, lon);
          await fetchWeatherForLocation(loc);
        } catch (err: any) {
          setWeatherData(null);
          setError('Unable to fetch weather for your exact coordinates.');
        } finally {
          setIsLocating(false);
        }
      },
      (geoErr) => {
        setIsLocating(false);
        setWeatherData(null);
        if (geoErr.code === geoErr.PERMISSION_DENIED) {
          setError('Location access was denied. Please search for your city manually in the search bar.');
        } else {
          setError('Unable to detect current GPS location. Please try searching by city name.');
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      {/* Top Navigation */}
      <Header
        tempUnit={tempUnit}
        onToggleTempUnit={handleToggleTempUnit}
        windUnit={windUnit}
        onToggleWindUnit={handleToggleWindUnit}
        onRefresh={() => fetchWeatherForLocation(selectedCity, true)}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 flex-1">
        {/* Search Bar */}
        <SearchBar
          onSelectCity={(city) => fetchWeatherForLocation(city)}
          onSearchQuery={handleSearchQuery}
          onUseMyLocation={handleUseMyLocation}
          isLocating={isLocating}
        />

        {/* Error Alert Message */}
        {error && (
          <ErrorAlert
            message={error}
            onDismiss={() => setError(null)}
            onRetry={() => fetchWeatherForLocation(selectedCity)}
          />
        )}

        {/* Loading Skeleton */}
        {isLoading && <SkeletonLoader />}

        {/* Render Weather Dashboard when data available */}
        {!isLoading && weatherData && (
          <div className="space-y-6">
            {/* Current Weather Hero Card */}
            <CurrentWeatherCard
              data={weatherData}
              tempUnit={tempUnit}
              windUnit={windUnit}
            />

            {/* 24-Hour Forecast Scrollable Timeline */}
            <HourlyForecast
              hourly={weatherData.hourly}
              tempUnit={tempUnit}
            />

            {/* Grid layout for 7-Day Forecast & Outdoor Activity Planner */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* 7-Day Forecast (7 cols on large) */}
              <div className="lg:col-span-7">
                <DailyForecast
                  daily={weatherData.daily}
                  tempUnit={tempUnit}
                  windUnit={windUnit}
                />
              </div>

              {/* Activity & Travel Planner (5 cols on large) */}
              <div className="lg:col-span-5">
                <ActivityPlanner data={weatherData} />
              </div>
            </div>

            {/* Additional Environmental Weather Metrics */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-700 tracking-tight uppercase">
                Atmospheric Metrics & Air Conditions
              </h3>
              <WeatherMetricsGrid
                data={weatherData}
                windUnit={windUnit}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-sky-600" />
            <span className="font-semibold text-slate-700">Weather Intelligence</span>
            <span>• Powered by Open-Meteo Weather APIs</span>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && <span>Updated at {lastUpdated}</span>}
            <span>Real-time Geocoding & High-Resolution Forecast</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
