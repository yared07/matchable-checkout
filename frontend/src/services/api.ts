import axios from 'axios'

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api'

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`)
    console.log('Response data:', response.data)
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Types
export interface Trainer {
  id: number
  name: string
  email: string
  phone: string
  specializations: string[]
  bio: string
  is_active: boolean
}

export interface Session {
  id: number
  trainer_id: number
  type: 'padel' | 'fitness' | 'tennis'
  start_time: string
  end_time: string
  duration_minutes: number
  price: string
  max_participants: number
  current_participants: number
  status: 'available' | 'booked' | 'cancelled'
  description: string
  trainer: Trainer
}

export interface BookingRequest {
  customer_name: string
  customer_email: string
  customer_phone: string
  session_ids: number[]
  terms_accepted: boolean
  notes?: string
}

export interface Booking {
  id: number
  booking_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  selected_sessions: number[]
  total_amount: string
  status: 'pending' | 'confirmed' | 'cancelled'
  notes?: string
  terms_accepted: boolean
  sessions: Session[]
  created_at: string
  updated_at: string
}

export interface CalculateTotalRequest {
  session_ids: number[]
}

export interface CalculateTotalResponse {
  total: string
  breakdown: Array<{
    id: number
    type: string
    trainer: string
    start_time: string
    duration_minutes: number
    price: string
  }>
  session_count: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface SessionsResponse {
  data: Session[]
  current_page: number
  per_page: number
  total: number
  first_page_url: string
  last_page_url: string
  links: Array<{
    url: string | null
    label: string
    active: boolean
  }>
}

export interface SessionsApiResponse {
  success: boolean
  data: SessionsResponse
  filters: {
    types: string[]
    trainers: Array<{
      id: number
      name: string
      specializations: string[]
    }>
  }
  message?: string
}

// API Service Class
export class ApiService {
  // Sessions
  static async getSessions(params?: {
    type?: string
    trainer_id?: number
    date_from?: string
    date_to?: string
    min_price?: number
    max_price?: number
    page?: number
  }): Promise<SessionsApiResponse> {
    console.log('🔍 Fetching sessions with params:', params)
    const response = await apiClient.get('/sessions', { params })
    console.log('📦 Raw API response:', response.data)
    return response.data
  }

  static async getSession(id: number): Promise<ApiResponse<Session>> {
    const response = await apiClient.get(`/sessions/${id}`)
    return response.data
  }

  static async getTrainersByType(type: string): Promise<ApiResponse<Trainer[]>> {
    const response = await apiClient.get('/sessions/trainers', {
      params: { type }
    })
    return response.data
  }

  // Bookings
  static async createBooking(booking: BookingRequest): Promise<ApiResponse<Booking>> {
    const response = await apiClient.post('/bookings', booking)
    return response.data
  }

  static async getBooking(id: number): Promise<ApiResponse<Booking>> {
    const response = await apiClient.get(`/bookings/${id}`)
    return response.data
  }

  static async calculateTotal(request: CalculateTotalRequest): Promise<ApiResponse<CalculateTotalResponse>> {
    const response = await apiClient.post('/bookings/calculate-total', request)
    return response.data
  }
}

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any): ApiError => {
  if (error.response) {
    return new ApiError(
      error.response.data?.message || 'An error occurred',
      error.response.status,
      error.response.data
    )
  }
  return new ApiError(error.message || 'Network error')
}

export default ApiService 