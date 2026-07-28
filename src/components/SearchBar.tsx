import React, { useState, useEffect, useRef } from 'react';
import { GeoLocationItem } from '../types/weather';
import { searchCities } from '../services/weatherApi';
import { Search, MapPin, X, Navigation, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSelectCity: (city: GeoLocationItem) => void;
  onUseMyLocation: () => void;
  isLocating?: boolean;
}

const POPULAR_CITIES: GeoLocationItem[] = [
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', country_code: 'GB' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York', country_code: 'US' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', admin1: 'New South Wales', country_code: 'AU' },
  { id: 292223, name: 'Dubai', latitude: 25.2582, longitude: 55.3047, country: 'United Arab Emirates', country_code: 'AE' },
  { id: 1880252, name: 'Singapore', latitude: 1.2897, longitude: 103.8501, country: 'Singapore', country_code: 'SG' },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  onUseMyLocation,
  isLocating = false,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search for live suggestions
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setSelectedIndex(-1);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: GeoLocationItem) => {
    onSelectCity(item);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[selectedIndex >= 0 ? selectedIndex : 0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="relative" ref={dropdownRef}>
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setIsOpen(true)}
            placeholder="Search city, state, or country..."
            className="w-full pl-11 pr-28 py-3.5 bg-white rounded-2xl text-slate-900 placeholder:text-slate-400 border border-slate-200/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 text-sm sm:text-base transition-all"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                setIsOpen(false);
              }}
              className="absolute right-24 p-1 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* GPS Location Button */}
          <button
            type="button"
            onClick={onUseMyLocation}
            disabled={isLocating}
            className="absolute right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold border border-sky-200/80 transition-colors disabled:opacity-50"
            title="Use current location via GPS"
          >
            {isLocating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
            ) : (
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
            )}
            <span className="hidden sm:inline">My Location</span>
          </button>
        </form>

        {/* Autocomplete Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 max-h-72 overflow-y-auto divide-y divide-slate-100">
            {suggestions.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={`${item.id}-${index}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                    isSelected ? 'bg-sky-50 text-sky-900' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                  <div className="truncate">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="text-xs text-slate-500 ml-2">
                      {[item.admin1, item.country].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Popular Cities Quick Select */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
          Popular:
        </span>
        {POPULAR_CITIES.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectCity(city)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium whitespace-nowrap transition-colors border border-slate-200/60"
          >
            {city.name}
          </button>
        ))}
      </div>
    </div>
  );
};
