# API Documentation

## Base URL
```
http://localhost:8000/api
```

## Server Setup

### Starting the Backend Server

**Prerequisites:**
- PHP 8.1+
- Composer installed
- Laravel project set up with database migrated and seeded

**Option 1: Development Mode (Interactive)**
```bash
cd backend
DISPLAY= php artisan serve --host=127.0.0.1 --port=8000
```

**Option 2: Background Mode (Recommended for Testing)**
```bash
cd backend
nohup php artisan serve --host=127.0.0.1 --port=8000 > server.log 2>&1 &
```

**Check if server is running:**
```bash
curl -I http://127.0.0.1:8000/api/sessions
```

**View server logs:**
```bash
tail -f server.log
```

### Troubleshooting

**Common Issues:**

1. **"Missing X server or $DISPLAY" Error**
   - **Solution**: Use `DISPLAY=` prefix when starting the server
   - **Example**: `DISPLAY= php artisan serve --host=127.0.0.1 --port=8000`

2. **"Could not open input file: artisan" Error**
   - **Solution**: Make sure you're in the backend directory
   - **Fix**: `cd backend` before running artisan commands

3. **Port Already in Use**
   - **Solution**: Use a different port or kill existing process
   - **Example**: `php artisan serve --host=127.0.0.1 --port=8001`

## Authentication
Currently, the API doesn't require authentication. All endpoints are publicly accessible.

## Response Format
All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field": ["validation error"]
  }
}
```

## Endpoints

### 1. Get Available Sessions

**GET** `/sessions`

Retrieve all available sessions with optional filtering.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by session type: `padel`, `fitness`, `tennis` |
| `trainer_id` | integer | No | Filter by specific trainer |
| `date_from` | date | No | Filter sessions from this date (YYYY-MM-DD) |
| `date_to` | date | No | Filter sessions until this date (YYYY-MM-DD) |
| `min_price` | decimal | No | Minimum price filter |
| `max_price` | decimal | No | Maximum price filter |

#### Example Request
```
GET /api/sessions?type=padel&date_from=2024-01-15&min_price=50
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "trainer_id": 1,
        "type": "padel",
        "start_time": "2024-01-15T09:00:00.000000Z",
        "end_time": "2024-01-15T10:00:00.000000Z",
        "duration_minutes": 60,
        "price": "60.00",
        "max_participants": 1,
        "current_participants": 0,
        "status": "available",
        "description": "Professional padel training session with Maria Rodriguez",
        "trainer": {
          "id": 1,
          "name": "Maria Rodriguez",
          "email": "maria.rodriguez@matchable.com",
          "specializations": ["padel", "tennis"]
        }
      }
    ],
    "current_page": 1,
    "per_page": 20,
    "total": 1
  },
  "filters": {
    "types": ["padel", "fitness", "tennis"],
    "trainers": [
      {
        "id": 1,
        "name": "Maria Rodriguez",
        "specializations": ["padel", "tennis"]
      }
    ]
  }
}
```

### 2. Get Specific Session

**GET** `/sessions/{id}`

Retrieve a specific session by ID.

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Session ID |

#### Example Request
```
GET /api/sessions/1
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "trainer_id": 1,
    "type": "padel",
    "start_time": "2024-01-15T09:00:00.000000Z",
    "end_time": "2024-01-15T10:00:00.000000Z",
    "duration_minutes": 60,
    "price": "60.00",
    "max_participants": 1,
    "current_participants": 0,
    "status": "available",
    "description": "Professional padel training session with Maria Rodriguez",
    "trainer": {
      "id": 1,
      "name": "Maria Rodriguez",
      "email": "maria.rodriguez@matchable.com",
      "phone": "+1-555-0101",
      "specializations": ["padel", "tennis"],
      "bio": "Professional padel and tennis coach with 8 years of experience. Former national champion.",
      "is_active": true
    }
  }
}
```

### 3. Get Trainers by Session Type

**GET** `/sessions/trainers`

Get trainers filtered by session type.

#### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | Yes | Session type: `padel`, `fitness`, `tennis` |

#### Example Request
```
GET /api/sessions/trainers?type=padel
```

#### Example Response
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Maria Rodriguez",
      "bio": "Professional padel and tennis coach with 8 years of experience. Former national champion.",
      "specializations": ["padel", "tennis"]
    },
    {
      "id": 3,
      "name": "Sarah Johnson",
      "bio": "Multi-sport coach with expertise in padel and functional fitness training.",
      "specializations": ["padel", "fitness"]
    }
  ]
}
```

### 4. Create Booking

**POST** `/bookings`

Create a new booking with selected sessions.

#### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_name` | string | Yes | Customer's full name |
| `customer_email` | string | Yes | Customer's email address |
| `customer_phone` | string | Yes | Customer's phone number |
| `session_ids` | array | Yes | Array of session IDs to book |
| `terms_accepted` | boolean | Yes | Must be `true` to accept terms |
| `notes` | string | No | Optional booking notes |

#### Example Request
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "+1234567890",
  "session_ids": [1, 2, 3],
  "terms_accepted": true,
  "notes": "First time booking, please provide equipment"
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "booking_number": "BK-ABC12345",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+1234567890",
    "selected_sessions": [1, 2, 3],
    "total_amount": "180.00",
    "status": "confirmed",
    "notes": "First time booking, please provide equipment",
    "terms_accepted": true,
    "sessions": [
      {
        "id": 1,
        "type": "padel",
        "start_time": "2024-01-15T09:00:00.000000Z",
        "price": "60.00",
        "trainer": {
          "name": "Maria Rodriguez"
        }
      }
    ]
  }
}
```

### 5. Get Booking Details

**GET** `/bookings/{id}`

Retrieve booking details by booking ID.

#### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Booking ID |

#### Example Request
```
GET /api/bookings/1
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "booking_number": "BK-ABC12345",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+1234567890",
    "selected_sessions": [1, 2, 3],
    "total_amount": "180.00",
    "status": "confirmed",
    "notes": "First time booking, please provide equipment",
    "terms_accepted": true,
    "sessions": [
      {
        "id": 1,
        "type": "padel",
        "start_time": "2024-01-15T09:00:00.000000Z",
        "price": "60.00",
        "trainer": {
          "name": "Maria Rodriguez"
        }
      }
    ]
  }
}
```

### 6. Calculate Booking Total

**POST** `/bookings/calculate-total`

Calculate the total cost for selected sessions without creating a booking.

#### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `session_ids` | array | Yes | Array of session IDs |

#### Example Request
```json
{
  "session_ids": [1, 2, 3]
}
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "total": "180.00",
    "breakdown": [
      {
        "id": 1,
        "type": "padel",
        "trainer": "Maria Rodriguez",
        "start_time": "2024-01-15T09:00:00.000000Z",
        "duration_minutes": 60,
        "price": "60.00"
      },
      {
        "id": 2,
        "type": "tennis",
        "trainer": "John Smith",
        "start_time": "2024-01-15T12:00:00.000000Z",
        "duration_minutes": 60,
        "price": "80.00"
      },
      {
        "id": 3,
        "type": "fitness",
        "trainer": "Emma Wilson",
        "start_time": "2024-01-15T15:00:00.000000Z",
        "duration_minutes": 60,
        "price": "40.00"
      }
    ],
    "session_count": 3
  }
}
```

## Error Codes

| HTTP Status | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created (booking created) |
| 400 | Bad Request (validation errors) |
| 404 | Not Found (session/booking not found) |
| 422 | Unprocessable Entity (validation failed) |
| 500 | Internal Server Error |

## Validation Rules

### Booking Creation
- `customer_name`: Required, max 255 characters
- `customer_email`: Required, valid email format, max 255 characters
- `customer_phone`: Required, max 20 characters
- `session_ids`: Required, array of integers, must exist in sessions table
- `terms_accepted`: Required, must be true
- `notes`: Optional, max 1000 characters

### Session Filtering
- `type`: Must be one of: padel, fitness, tennis
- `trainer_id`: Must be a valid trainer ID
- `date_from`/`date_to`: Must be valid date format (YYYY-MM-DD)
- `min_price`/`max_price`: Must be numeric values

## Rate Limiting
Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## CORS
The API includes CORS headers to allow cross-origin requests from frontend applications. 