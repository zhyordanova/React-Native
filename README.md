# ExpenseTracker

React Native expense tracker app built with Expo.

## Features
- Add, edit, and delete expenses
- Recent (last 7 days) and all expenses views
- Global loading and error overlays
- Firebase Realtime Database persistence

## Requirements
- Node.js (LTS recommended)
- npm

## Setup
```bash
npm install
```

## Run
```bash
npx expo start
```

## Project structure
```
App.js
assets/
componets/
screens/
store/
UI/
util/
```

## Key folders
- componets/: reusable UI components (forms, lists, buttons)
- screens/: app screens (RecentExpenses, AllExpenses, ManageExpense)
- store/: context state (expenses, UI loading/error)
- UI/: overlays and shared UI widgets
- util/: helpers (dates, HTTP)

## Navigation and main screens
- Tabs:
	- RecentExpenses: expenses from the last 7 days
	- AllExpenses: full history
- Stack:
	- ManageExpense: add or edit an expense

## Data flow (context → UI)
1. UI screens call HTTP helpers in util/http.js
2. Responses are stored in ExpenseContext
3. UI reads context state to render lists and totals
4. UIContext controls global loading and error overlays

## Data model
Each expense has:
- id: string
- description: string
- amount: number
- date: JavaScript Date

## Backend
- Firebase Realtime Database
- HTTP client: axios
- Base URL is configured in util/http.js

## Scripts
- Start dev server: `npx expo start`

## Run on device or emulator
- Physical device: install Expo Go, scan the QR code from the dev server
- iOS simulator: press i in the dev server UI
- Android emulator: press a in the dev server UI

## Future improvements
- Pull-to-refresh on expense lists
- Categories and filters
- Export/import of data
- Offline support and caching

## Troubleshooting
- If `expo start` fails, use `npx expo start` (local CLI)
- If reload does not work, ensure the dev server is running and the device is on the same network
- If data does not load, verify Firebase URL and network access
