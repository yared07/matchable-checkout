# Matchable Checkout System

A professional checkout system for booking personal training sessions (padel, fitness, tennis) built with Laravel backend and Vue.js frontend.

## Quick Start

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://127.0.0.1:8000/api

## Project Structure

```
matchable-checkout/
├── backend/                 # Laravel API
│   ├── app/Http/Controllers/Api/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── database/seeders/
│   └── routes/api.php
├── frontend/               # Vue.js App
│   ├── src/components/
│   ├── src/views/
│   ├── src/stores/
│   ├── src/services/
│   └── src/types/
└── README.md
```

## Technology Stack

### Backend
- **Laravel 12** - PHP framework
- **SQLite** - Database (development)
- **Eloquent ORM** - Database relationships
- **API Resources** - RESTful endpoints

### Frontend
- **Vue.js 3** - Progressive framework
- **TypeScript** - Type safety
- **TailwindCSS v4** - Utility-first CSS
- **Pinia** - State management
- **Vite** - Build tool

## Key Features

### Backend
- Session management (CRUD operations)
- Booking system with validation
- Real-time pricing calculations
- CORS support for frontend integration
- Comprehensive API documentation

### Frontend
- Session selection with filtering
- Real-time cart updates
- Professional booking form
- Responsive design
- Modern UI with glass morphism

## API Endpoints

- `GET /api/sessions` - Get available sessions
- `POST /api/bookings` - Create booking
- `POST /api/bookings/calculate-total` - Calculate totals

## Development Commands

```bash
# Backend
php artisan serve
php artisan migrate:fresh --seed

# Frontend
npm run dev
npm run build
npm run preview
```

## Architecture

- **Monorepo Structure** - Separate backend/frontend directories
- **RESTful API** - Laravel backend with JSON responses
- **Component-based UI** - Vue.js with reusable components
- **Type Safety** - Full TypeScript implementation
- **State Management** - Pinia store for centralized state
- **Modern Styling** - TailwindCSS with custom design system

---

**Status**: Production-ready with professional architecture and modern technologies.
