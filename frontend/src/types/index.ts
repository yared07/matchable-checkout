// API Types
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

// Store Types
export interface Filters {
  type: string
  trainer_id: number | null
  date_from: string
  date_to: string
  min_price: number | null
  max_price: number | null
}

export interface Pagination {
  current_page: number
  per_page: number
  total: number
}

// Component Props Types
export interface SessionCardProps {
  session: Session
  isSelected: boolean
}

export interface SessionFiltersProps {
  filters: Filters
  availableTypes: string[]
  availableTrainers: Array<{
    id: number
    name: string
    specializations: string[]
  }>
} 