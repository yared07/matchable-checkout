# Matchable Checkout Backend API

A Laravel-based REST API for the Matchable checkout system that handles session booking for padel, fitness, and tennis training.

## Features

- **Session Management**: CRUD operations for training sessions
- **Trainer Management**: Trainer profiles with specializations
- **Booking System**: Complete booking flow with validation
- **Real-time Pricing**: Dynamic calculation of session costs
- **Availability Tracking**: Automatic session availability updates
- **CORS Support**: Cross-origin request handling for frontend integration

## Database Schema

### Tables

1. **trainers**
   - `id` (Primary Key)
   - `name` (string)
   - `email` (string, unique)
   - `phone` (string)
   - `specializations` (json array)
   - `bio` (text, nullable)
   - `is_active` (boolean)
   - `created_at`, `updated_at`

2. **sessions**
   - `id` (Primary Key)
   - `trainer_id` (Foreign Key)
   - `type` (enum: padel, fitness, tennis)
   - `start_time` (datetime)
   - `end_time` (datetime)
   - `duration_minutes` (integer)
   - `price` (decimal)
   - `max_participants` (integer)
   - `current_participants` (integer)
   - `status` (enum: available, booked, cancelled)
   - `description` (text, nullable)
   - `created_at`, `updated_at`

3. **bookings**
   - `id` (Primary Key)
   - `booking_number` (string, unique)
   - `customer_name` (string)
   - `customer_email` (string)
   - `customer_phone` (string)
   - `selected_sessions` (json array)
   - `total_amount` (decimal)
   - `status` (enum: pending, confirmed, cancelled)
   - `notes` (text, nullable)
   - `terms_accepted` (boolean)
   - `created_at`, `updated_at`

4. **booking_session** (Pivot Table)
   - `id` (Primary Key)
   - `booking_id` (Foreign Key)
   - `session_id` (Foreign Key)
   - `price_paid` (decimal)
   - `created_at`, `updated_at`

## API Endpoints

### Sessions

#### GET /api/sessions
Get all available sessions with optional filtering.

**Query Parameters:**
- `type` (optional): Filter by session type (padel, fitness, tennis)
- `trainer_id` (optional): Filter by trainer
- `date_from` (optional): Filter by start date
- `date_to` (optional): Filter by end date
- `min_price` (optional): Filter by minimum price
- `max_price` (optional): Filter by maximum price

**Response:**
```json
{
  "success": true,
  "data": {
    "data": [...],
    "current_page": 1,
    "per_page": 20,
    "total": 100
  },
  "filters": {
    "types": ["padel", "fitness", "tennis"],
    "trainers": [...]
  }
}
```

#### GET /api/sessions/{id}
Get a specific session by ID.

#### GET /api/sessions/trainers
Get trainers filtered by session type.

**Query Parameters:**
- `type` (required): Session type (padel, fitness, tennis)

### Bookings

#### POST /api/bookings
Create a new booking.

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "session_ids": [1, 2, 3],
  "terms_accepted": true,
  "notes": "Optional notes"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "booking_number": "BK-ABC12345",
    "customer_name": "John Doe",
    "total_amount": "180.00",
    "status": "confirmed",
    "sessions": [...]
  }
}
```

#### GET /api/bookings/{id}
Get a specific booking by ID.

#### POST /api/bookings/calculate-total
Calculate total cost for selected sessions.

**Request Body:**
```json
{
  "session_ids": [1, 2, 3]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": "180.00",
    "breakdown": [...],
    "session_count": 3
  }
}
```

## Installation & Setup

### Prerequisites
- PHP 8.1+
- Composer
- SQLite (or MySQL/PostgreSQL)

### Installation Steps

1. **Clone and install dependencies:**
   ```bash
   cd backend
   composer install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database setup:**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Start the server:**
   
   **Option 1: Development Mode (Interactive)**
   ```bash
   DISPLAY= php artisan serve --host=127.0.0.1 --port=8000
   ```
   
   **Option 2: Background Mode (Recommended for Testing)**
   ```bash
   nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &
   ```

### Environment Variables

Create a `.env` file with the following variables:

```env
APP_NAME="Matchable Checkout API"
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_CONNECTION=sync
```

## Server Management

### Starting the Server

**For Development:**
```bash
# Interactive mode (press Ctrl+C to stop)
DISPLAY= php artisan serve --host=127.0.0.1 --port=8000
```

**For Background Testing:**
```bash
# Start in background
nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &

# Check if running
ps aux | grep "php artisan serve"

# View logs
tail -f server.log
```

### Stopping the Server

**If running in background:**
```bash
# Find the process
ps aux | grep "php artisan serve"

# Kill the process (replace PID with actual process ID)
kill <PID>
```

### Testing the API

**Quick Test:**
```bash
# Test sessions endpoint
curl http://127.0.0.1:8000/api/sessions

# Test booking calculation
curl -X POST http://127.0.0.1:8000/api/bookings/calculate-total \
  -H "Content-Type: application/json" \
  -d '{"session_ids": [1, 2, 3]}'
```

**Run the test script:**
```bash
php test_api.php
```

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

4. **Database Connection Issues**
   - **Solution**: Ensure SQLite file exists and is writable
   - **Fix**: `touch database/database.sqlite && chmod 666 database/database.sqlite`

### Server Status Check

```bash
# Check if server is running
curl -I http://127.0.0.1:8000/api/sessions

# Check process
ps aux | grep "php artisan serve"

# Check logs
tail -f server.log
```

## Testing

Run the test script to verify API functionality:

```bash
php test_api.php
```

## Sample Data

The seeder creates:
- 5 trainers with different specializations
- 70+ sessions over the next 7 days
- Various session types and pricing

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["validation error"]
  }
}
```

## Security Features

- Input validation on all endpoints
- SQL injection protection via Eloquent ORM
- CORS middleware for frontend integration
- Transaction-based booking operations
- Automatic session availability updates

## Performance Optimizations

- Database indexes on frequently queried fields
- Eager loading of relationships
- Pagination for large datasets
- Efficient session filtering

## Future Enhancements

- Email notifications for bookings
- Payment gateway integration
- Advanced availability management
- User authentication and authorization
- Booking cancellation and rescheduling
- Session reviews and ratings
