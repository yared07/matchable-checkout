# Laravel Backend API

Professional Laravel backend for the Matchable Checkout System, providing RESTful API endpoints for session management and booking functionality.

## Features

- **Session Management**: CRUD operations for training sessions
- **Booking System**: Complete booking workflow with validation
- **Trainer Management**: Trainer profiles and specializations
- **Real-time Calculations**: Dynamic pricing and availability
- **Data Validation**: Comprehensive input validation
- **CORS Support**: Cross-origin request handling
- **Database Seeding**: Sample data for development

## Database Schema

### Core Tables

#### trainers
- `id` - Primary key
- `name` - Trainer full name
- `email` - Unique email address
- `phone` - Contact phone number
- `specializations` - JSON array of specializations
- `bio` - Trainer biography
- `is_active` - Active status boolean
- `created_at`, `updated_at` - Timestamps

#### sessions
- `id` - Primary key
- `trainer_id` - Foreign key to trainers
- `type` - Session type (padel, fitness, tennis)
- `start_time` - Session start datetime
- `end_time` - Session end datetime
- `duration_minutes` - Session duration
- `price` - Session price (decimal)
- `max_participants` - Maximum participants
- `current_participants` - Current participants
- `status` - Session status (available, booked, cancelled)
- `description` - Session description
- `created_at`, `updated_at` - Timestamps

#### bookings
- `id` - Primary key
- `booking_number` - Unique booking number
- `customer_name` - Customer full name
- `customer_email` - Customer email
- `customer_phone` - Customer phone
- `selected_sessions` - JSON array of session IDs
- `total_amount` - Total booking amount
- `status` - Booking status (pending, confirmed, cancelled)
- `notes` - Additional notes
- `terms_accepted` - Terms acceptance boolean
- `created_at`, `updated_at` - Timestamps

#### booking_session (Pivot Table)
- `id` - Primary key
- `booking_id` - Foreign key to bookings
- `session_id` - Foreign key to sessions
- `price_paid` - Price paid for this session
- `created_at`, `updated_at` - Timestamps

## API Endpoints

### Sessions

#### GET /api/sessions
Retrieve available sessions with filtering and pagination.

**Query Parameters:**
- `type` - Filter by session type (padel, fitness, tennis)
- `trainer_id` - Filter by trainer ID
- `date_from` - Filter by start date (YYYY-MM-DD)
- `date_to` - Filter by end date (YYYY-MM-DD)
- `min_price` - Minimum price filter
- `max_price` - Maximum price filter
- `page` - Page number for pagination

**Response:**
```json
{
  "success": true,
  "data": {
    "current_page": 1,
    "data": [...],
    "per_page": 20,
    "total": 87
  },
  "filters": {
    "types": ["padel", "fitness", "tennis"],
    "trainers": [...]
  }
}
```

#### GET /api/sessions/{id}
Retrieve a specific session by ID.

#### GET /api/sessions/trainers
Get trainers filtered by session type.

**Query Parameters:**
- `type` - Session type to filter trainers

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
  "data": {
    "id": 1,
    "booking_number": "BK-2024-001",
    "customer_name": "John Doe",
    "total_amount": "150.00",
    "status": "pending",
    "sessions": [...]
  }
}
```

#### GET /api/bookings/{id}
Retrieve a specific booking by ID.

#### POST /api/bookings/calculate-total
Calculate total for selected sessions.

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
    "total": "150.00",
    "breakdown": [...],
    "session_count": 3
  }
}
```

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- SQLite (for development) or MySQL/PostgreSQL

### Setup Steps

1. **Clone and Install Dependencies**
   ```bash
   cd backend
   composer install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

3. **Database Setup**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

4. **Start Development Server**
   ```bash
   # Interactive mode
   DISPLAY= php artisan serve --host=127.0.0.1 --port=8000
   
   # Background mode
   nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &
   ```

## Environment Variables

```env
APP_NAME="Matchable Checkout"
APP_ENV=local
APP_KEY=base64:your-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database.sqlite

CORS_ALLOWED_ORIGINS=http://localhost:5173
```

## Testing

### API Testing
```bash
# Test sessions endpoint
curl http://127.0.0.1:8000/api/sessions

# Test booking creation
curl -X POST http://127.0.0.1:8000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test User",
    "customer_email": "test@example.com",
    "customer_phone": "+1234567890",
    "session_ids": [1],
    "terms_accepted": true
  }'
```

### Sample Data
The seeder creates:
- 5 professional trainers with different specializations
- 70+ training sessions over 7 days
- Realistic pricing ($40-$100 per session)
- Multiple session types (padel, tennis, fitness)

## Error Handling

### Validation Errors
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "customer_email": ["The customer email field is required."]
  }
}
```

### API Errors
```json
{
  "success": false,
  "message": "Session not found"
}
```

## Security Features

- **Input Validation**: Comprehensive validation rules
- **CORS Protection**: Configured for frontend integration
- **SQL Injection Protection**: Eloquent ORM with parameter binding
- **XSS Protection**: Output sanitization
- **CSRF Protection**: Enabled for web routes

## Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **Eager Loading**: Prevents N+1 query problems
- **Pagination**: Efficient data loading
- **Caching**: Ready for Redis/Memcached integration

## Development Workflow

### Code Quality
```bash
# Run PHP CS Fixer
./vendor/bin/php-cs-fixer fix

# Run PHPStan
./vendor/bin/phpstan analyse

# Run Tests
php artisan test
```

### Database Management
```bash
# Reset database with fresh data
php artisan migrate:fresh --seed

# Create new migration
php artisan make:migration create_new_table

# Rollback migrations
php artisan migrate:rollback
```

## Deployment

### Production Checklist
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false`
- [ ] Configure production database
- [ ] Set up proper CORS origins
- [ ] Configure logging
- [ ] Set up SSL certificates
- [ ] Configure caching (Redis/Memcached)

### Server Requirements
- PHP 8.1+
- Composer
- Web server (Apache/Nginx)
- Database (MySQL/PostgreSQL)
- SSL certificate (recommended)

## Troubleshooting

### Common Issues

1. **"Missing X server or $DISPLAY" Error**
   - Use `DISPLAY=` prefix when starting server
   - Example: `DISPLAY= php artisan serve`

2. **Database Connection Issues**
   - Check database file permissions
   - Verify database path in `.env`
   - Run `php artisan migrate:fresh`

3. **CORS Issues**
   - Verify `CORS_ALLOWED_ORIGINS` in `.env`
   - Check frontend URL configuration

4. **Port Already in Use**
   - Kill existing process: `pkill -f "php artisan serve"`
   - Use different port: `php artisan serve --port=8001`

## Future Enhancements

- **Email Notifications**: Booking confirmations and reminders
- **Payment Integration**: Stripe/PayPal integration
- **Advanced Filtering**: More sophisticated search options
- **Real-time Updates**: WebSocket integration
- **Analytics**: Booking analytics and reporting
- **Multi-tenancy**: Support for multiple venues
- **Mobile API**: Dedicated mobile endpoints
- **Webhooks**: Third-party integrations

## Support

For technical support or questions:
- Check the troubleshooting section
- Review Laravel documentation
- Check server logs: `tail -f server.log`
- Verify API responses with curl commands

---

**Status**: Production-ready Laravel backend with comprehensive API and documentation.
