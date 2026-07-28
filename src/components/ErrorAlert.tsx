import React from 'react';
import { AlertCircle, X, RefreshCw, Search } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss, onRetry }) => {
  return (
    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 shadow-xs flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2">
      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />

      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-bold text-rose-900">Weather Request Alert</h4>
        <p className="text-xs text-rose-700 leading-relaxed">{message}</p>

        {onRetry && (
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Try Again
            </button>
          </div>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
