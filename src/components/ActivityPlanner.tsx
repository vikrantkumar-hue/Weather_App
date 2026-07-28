import React, { useState } from 'react';
import { 
  FullWeatherData, 
  ActivityRecommendation, 
  PackingRecommendation,
  ActivityRating 
} from '../types/weather';
import { 
  generateActivityRecommendations, 
  generatePackingRecommendations 
} from '../utils/weather';
import { WeatherIcon } from './WeatherIcon';
import { Sparkles, CheckCircle2, AlertCircle, Luggage, Compass, Layers, ShieldAlert } from 'lucide-react';

interface ActivityPlannerProps {
  data: FullWeatherData;
}

export const ActivityPlanner: React.FC<ActivityPlannerProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'activities' | 'packing'>('activities');

  const { current, daily } = data;
  const todayDaily = daily && daily.length > 0 ? daily[0] : undefined;

  const activities: ActivityRecommendation[] = generateActivityRecommendations(current, todayDaily);
  const packingList: PackingRecommendation[] = generatePackingRecommendations(current, todayDaily);

  const getRatingBadgeClass = (rating: ActivityRating) => {
    switch (rating) {
      case 'excellent':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'good':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'fair':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'poor':
        return 'bg-rose-100 text-rose-800 border-rose-300';
    }
  };

  const getRatingScoreBarClass = (rating: ActivityRating) => {
    switch (rating) {
      case 'excellent': return 'bg-emerald-500';
      case 'good': return 'bg-sky-500';
      case 'fair': return 'bg-amber-500';
      case 'poor': return 'bg-rose-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header & Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Intelligence & Travel Planner
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated outdoors & gear advice tailored to today's climate
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('activities')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'activities'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Outdoor Sports & Recreation
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'packing'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Luggage className="w-3.5 h-3.5" />
            Travel & Gear Advice
          </button>
        </div>
      </div>

      {/* Tab Content: Outdoor Activity Recommendations */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col justify-between gap-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs text-sky-600">
                      <WeatherIcon name={act.iconName} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{act.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{act.summary}</p>
                    </div>
                  </div>

                  {/* Rating Tag */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border capitalize shrink-0 ${getRatingBadgeClass(
                      act.rating
                    )}`}
                  >
                    {act.rating}
                  </span>
                </div>

                {/* Suitability Progress Indicator */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500">
                    <span>Suitability Index</span>
                    <span className="font-bold text-slate-800">{act.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getRatingScoreBarClass(
                        act.rating
                      )}`}
                      style={{ width: `${act.score}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tips & Recommendations */}
              <div className="bg-white/80 rounded-xl p-2.5 border border-slate-200/60 space-y-1 text-xs">
                {act.tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Travel & Packing List */}
      {activeTab === 'packing' && (
        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-sky-900">
                Weather-Based Travel & Outfit Guide
              </p>
              <p className="text-xs text-sky-800/90 mt-0.5">
                Calculated based on current temperature ({Math.round(current.temperature)}°C), wind speed, precipitation, and UV level.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {packingList.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex items-start gap-3"
              >
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 shrink-0">
                  <WeatherIcon name={item.iconName} className="w-5 h-5" />
                </div>
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600 uppercase tracking-wider mb-1">
                    {item.category}
                  </span>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {item.item}
                  </h5>
                  <p className="text-[11px] text-slate-500 mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
