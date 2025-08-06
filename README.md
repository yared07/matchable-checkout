# Matchable Checkout System

A professional checkout system for booking personal training sessions for padel, fitness, and tennis. Built with Laravel backend and Vue.js frontend.

## Project Structure

```
matchable-checkout/
├── backend/                 # Laravel API backend
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   └── Http/Middleware/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/api.php
│   └── README.md
├── frontend/               # Vue.js frontend (to be implemented)
└── README.md
```

## Backend Implementation (Laravel)

### ✅ Completed Features

- **Database Design**: Complete schema with trainers, sessions, bookings, and relationships
- **API Endpoints**: Full REST API with session management and booking system
- **Data Validation**: Comprehensive input validation and error handling
- **CORS Support**: Cross-origin request handling for frontend integration
- **Sample Data**: Seeded database with realistic training sessions and trainers
- **Documentation**: Complete API documentation and setup instructions

### 🗄️ Database Schema

#### Core Tables
1. **trainers** - Trainer profiles with specializations
2. **sessions** - Available training sessions with pricing
3. **bookings** - Customer bookings with session selections
4. **booking_session** - Pivot table for booking-session relationships

#### Key Features
- Automatic booking number generation
- Session availability tracking
- Real-time pricing calculations
- Trainer specialization management

### 🔌 API Endpoints

#### Sessions
- `GET /api/sessions` - Get available sessions with filtering
- `GET /api/sessions/{id}` - Get specific session details
- `GET /api/sessions/trainers` - Get trainers by session type

#### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/{id}` - Get booking details
- `POST /api/bookings/calculate-total` - Calculate session totals

### 🚀 Quick Start

1. **Setup Backend**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan db:seed
   ```

2. **Start the Server**
   
   **Option 1: Development Mode (Interactive)**
   ```bash
   DISPLAY= php artisan serve --host=127.0.0.1 --port=8000
   ```
   
   **Option 2: Background Mode (Recommended for Testing)**
   ```bash
   nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &
   ```

3. **Test API**
   ```bash
   # Test sessions endpoint
   curl http://127.0.0.1:8000/api/sessions
   
   # Test booking calculation
   curl -X POST http://127.0.0.1:8000/api/bookings/calculate-total \
     -H "Content-Type: application/json" \
     -d '{"session_ids": [1, 2, 3]}'
   ```

### 🔧 Server Management

**Check if server is running:**
```bash
ps aux | grep "php artisan serve"
```

**View server logs:**
```bash
tail -f backend/server.log
```

**Stop the server:**
```bash
# Find the process
ps aux | grep "php artisan serve"
# Kill the process (replace PID with actual process ID)
kill <PID>
```

### 📊 Sample Data

The backend includes seeded data with:
- **5 Professional Trainers** with different specializations
- **70+ Training Sessions** over the next 7 days
- **Multiple Session Types**: Padel, Tennis, Fitness
- **Realistic Pricing**: $40-$100 per session based on type and trainer

### 🔧 Technical Features

- **Laravel 12** with modern PHP 8.1+ features
- **SQLite Database** for easy development (configurable for production)
- **Eloquent ORM** with relationships and model events
- **API Resource Controllers** with proper HTTP status codes
- **Database Transactions** for data integrity
- **CORS Middleware** for frontend integration
- **Comprehensive Validation** with detailed error messages

### 📚 Documentation

- **API Documentation**: `backend/API_DOCUMENTATION.md`
- **Setup Guide**: `backend/README.md`
- **Database Schema**: Detailed in backend README

## Frontend Implementation (Vue.js)

### 🚧 Coming Soon

The frontend will be implemented with:
- **Vue 3** with Composition API
- **TailwindCSS** for styling
- **Modern UI Components** for session selection and booking
- **Real-time Updates** for session availability
- **Responsive Design** for mobile and desktop

## Core Features Implemented

### ✅ Backend Requirements Met

1. **Session Management**
   - ✅ Display available sessions (padel, fitness, tennis)
   - ✅ Allow selection of time slots, duration, and trainers
   - ✅ Filtering by session type, trainer, date, and price

2. **Cart & Pricing**
   - ✅ Display summary of selected sessions
   - ✅ Show pricing breakdown and total calculation
   - ✅ Real-time total calculation API

3. **Booking System**
   - ✅ Collect customer details (name, email, phone)
   - ✅ Terms and conditions confirmation
   - ✅ Complete booking validation and processing

4. **Database Integration**
   - ✅ Sessions table with availability tracking
   - ✅ Bookings table with customer information
   - ✅ Automatic session availability updates
   - ✅ Total cost calculation based on session types

5. **API Endpoints**
   - ✅ `GET /sessions` - Retrieve available sessions
   - ✅ `POST /bookings` - Process bookings with validation
   - ✅ Additional endpoints for filtering and calculations

### 🎯 Production-Ready Features

- **Error Handling**: Comprehensive validation and error responses
- **Data Integrity**: Database transactions and constraints
- **Performance**: Indexed queries and efficient relationships
- **Security**: Input validation and CORS configuration
- **Documentation**: Complete API documentation
- **Testing**: Sample data and test scripts

## Troubleshooting

### Common Issues

1. **"Missing X server or $DISPLAY" Error**
   - **Solution**: Use `DISPLAY=` prefix when starting the server
   - **Example**: `DISPLAY= php artisan serve --host=127.0.0.1 --port=8000`

2. **"Could not open input file: artisan" Error**
   - **Solution**: Make sure you're in the backend directory
   - **Fix**: `cd backend` before running artisan commands

3. **Port Already in Use**
   - **Solution**: Use a different port or kill existing process
   - **Example**: `php artisan serve --host=127.0.0.1 --port=8001`

### Server Status Check

```bash
# Check if server is running
curl -I http://127.0.0.1:8000/api/sessions

# Check process
ps aux | grep "php artisan serve"

# Check logs
tail -f backend/server.log
```

## Next Steps

1. **Frontend Development**: Implement Vue.js frontend with modern UI
2. **Enhanced Features**: Email notifications, payment integration
3. **Testing**: Unit and integration tests
4. **Deployment**: Production-ready configuration

## Technology Stack

- **Backend**: Laravel 12, PHP 8.1+, SQLite/MySQL
- **Frontend**: Vue.js 3, TailwindCSS (planned)
- **API**: RESTful with JSON responses
- **Database**: Relational with proper relationships

---

**Status**: Backend implementation complete and ready for frontend integration! 🎉
