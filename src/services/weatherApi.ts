import { GeoLocationItem, FullWeatherData, CurrentWeatherData, DailyForecastItem, HourlyForecastItem } from '../types/weather';

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Search cities by name using Open-Meteo Geocoding API
 */
export async function searchCities(query: string): Promise<GeoLocationItem[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `${GEOCODING_API_URL}?name=${encodeURIComponent(trimmed)}&count=8&language=en&format=json`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Geocoding search failed with status ${response.status}`);
  }

  const data = await response.json();
  if (!data.results || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((item: any) => ({
    id: item.id,
    name: item.name,
    latitude: item.latitude,
    longitude: item.longitude,
    country: item.country || '',
    admin1: item.admin1 || '',
    country_code: item.country_code || '',
    timezone: item.timezone || 'auto',
    population: item.population || 0,
  }));
}

/**
 * Fetch full weather forecast for a latitude & longitude
 */
export async function getWeatherData(location: GeoLocationItem): Promise<FullWeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'weather_code',
      'wind_speed_10m',
      'uv_index'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max'
    ].join(','),
    timezone: location.timezone || 'auto'
  });

  const url = `${FORECAST_API_URL}?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather forecast request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error('Weather data unavailable for this location.');
  }

  // Parse Current Data
  const current: CurrentWeatherData = {
    temperature: data.current.temperature_2m ?? 0,
    apparentTemperature: data.current.apparent_temperature ?? data.current.temperature_2m ?? 0,
    relativeHumidity: data.current.relative_humidity_2m ?? 0,
    windSpeed: data.current.wind_speed_10m ?? 0,
    windDirection: data.current.wind_direction_10m ?? 0,
    weatherCode: data.current.weather_code ?? 0,
    isDay: data.current.is_day === 1,
    time: data.current.time ?? new Date().toISOString(),
    pressure: data.current.pressure_msl ?? 1013,
    precipitation: data.current.precipitation ?? 0,
    cloudCover: data.current.cloud_cover ?? 0,
  };

  // Parse Hourly Data (next 24-36 hours)
  const hourly: HourlyForecastItem[] = [];
  if (data.hourly && Array.isArray(data.hourly.time)) {
    const times: string[] = data.hourly.time;
    const nowTimeStr = data.current.time || new Date().toISOString();
    
    // Find current hour index
    let startIndex = times.findIndex(t => t >= nowTimeStr);
    if (startIndex === -1) startIndex = 0;

    // Slice next 24 hours
    for (let i = startIndex; i < Math.min(startIndex + 24, times.length); i++) {
      hourly.push({
        time: times[i],
        temperature: data.hourly.temperature_2m[i] ?? 0,
        apparentTemperature: data.hourly.apparent_temperature[i] ?? 0,
        weatherCode: data.hourly.weather_code[i] ?? 0,
        precipitationProbability: data.hourly.precipitation_probability[i] ?? 0,
        windSpeed: data.hourly.wind_speed_10m[i] ?? 0,
        humidity: data.hourly.relative_humidity_2m[i] ?? 0,
        uvIndex: data.hourly.uv_index[i] ?? 0,
      });
    }
  }

  // Parse Daily Data (7 days)
  const daily: DailyForecastItem[] = [];
  if (data.daily && Array.isArray(data.daily.time)) {
    const days: string[] = data.daily.time;
    for (let i = 0; i < Math.min(7, days.length); i++) {
      daily.push({
        date: days[i],
        weatherCode: data.daily.weather_code[i] ?? 0,
        tempMax: data.daily.temperature_2m_max[i] ?? 0,
        tempMin: data.daily.temperature_2m_min[i] ?? 0,
        apparentTempMax: data.daily.apparent_temperature_max[i] ?? 0,
        apparentTempMin: data.daily.apparent_temperature_min[i] ?? 0,
        precipitationSum: data.daily.precipitation_sum[i] ?? 0,
        precipitationProbabilityMax: data.daily.precipitation_probability_max[i] ?? 0,
        windSpeedMax: data.daily.wind_speed_10m_max[i] ?? 0,
        uvIndexMax: data.daily.uv_index_max[i] ?? 0,
        sunrise: data.daily.sunrise[i] ?? '',
        sunset: data.daily.sunset[i] ?? '',
      });
    }
  }

  return {
    location: {
      ...location,
      timezone: data.timezone || location.timezone || 'auto'
    },
    current,
    hourly,
    daily,
    timezone: data.timezone || 'auto'
  };
}

/**
 * Reverse geocode latitude/longitude to a city name
 */
export async function reverseGeocode(latitude: number, longitude: number): Promise<GeoLocationItem> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
    );
    if (response.ok) {
      const data = await response.json();
      const name = data.address?.city || data.address?.town || data.address?.village || data.address?.suburb || 'Current Location';
      const country = data.address?.country || '';
      const admin1 = data.address?.state || '';
      return {
        id: Math.floor(Math.random() * 100000),
        name,
        latitude,
        longitude,
        country,
        admin1,
        country_code: data.address?.country_code?.toUpperCase() || '',
      };
    }
  } catch {
    // Fallback if reverse geocoding fails
  }

  return {
    id: 999999,
    name: 'Your Location',
    latitude,
    longitude,
    country: '',
  };
}
