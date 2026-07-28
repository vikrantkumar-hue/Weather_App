# Weather Intelligence App (Level 2)
A responsive Weather Intelligence Application built with Google AI Studio App Build, version-controlled with GitHub, and continuously deployed via Cloudflare Pages.

## APIs Used
- Open-Meteo Geocoding API: https://geocoding-api.open-meteo.com/v1/search
- Open-Meteo Forecast API: https://api.open-meteo.com/v1/forecast

## Cloudflare Pages Deployment Configuration
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework Preset: `Vite`

## Verification & Testing Steps
1. Valid City 1 (London): Fetches real-time weather and 7-day forecast.
2. Valid City 2 (Bengaluru): Resolves lat/lon and updates cards.
3. Invalid City (Vikrant City): Clears previous city cards and displays a red error banner.
