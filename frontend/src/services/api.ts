import axios from 'axios'
import type { 
  Trainer, 
  Session, 
  BookingRequest, 
  Booking, 
  CalculateTotalRequest, 
  CalculateTotalResponse, 
  ApiResponse, 
  SessionsResponse, 
  SessionsApiResponse 
} from '@/types'

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
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
    const response = await apiClient.get('/sessions', { params })
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