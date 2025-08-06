import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Session, BookingRequest, Booking, CalculateTotalResponse } from '@/services/api'
import ApiService, { handleApiError } from '@/services/api'

export const useBookingStore = defineStore('booking', () => {
  // State
  const sessions = ref<Session[]>([])
  const selectedSessions = ref<Session[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref({
    type: '',
    trainer_id: null as number | null,
    date_from: '',
    date_to: '',
    min_price: null as number | null,
    max_price: null as number | null,
  })
  const pagination = ref({
    current_page: 1,
    per_page: 20,
    total: 0,
  })
  const availableTypes = ref<string[]>([])
  const availableTrainers = ref<Array<{
    id: number
    name: string
    specializations: string[]
  }>>([])

  // Computed
  const totalAmount = computed(() => {
    return selectedSessions.value.reduce((total, session) => {
      return total + parseFloat(session.price)
    }, 0)
  })

  const selectedSessionIds = computed(() => {
    return selectedSessions.value.map(session => session.id)
  })

  const isSessionSelected = (sessionId: number) => {
    return selectedSessions.value.some(session => session.id === sessionId)
  }

  // Actions
  const fetchSessions = async (page = 1) => {
    loading.value = true
    error.value = null
    
    try {
      console.log('🔄 Store: Fetching sessions with params:', { page, filters: filters.value })
      
      const params: any = {
        page,
      }
      
      // Only add non-null and non-empty values
      if (filters.value.type) params.type = filters.value.type
      if (filters.value.trainer_id !== null) params.trainer_id = filters.value.trainer_id
      if (filters.value.date_from) params.date_from = filters.value.date_from
      if (filters.value.date_to) params.date_to = filters.value.date_to
      if (filters.value.min_price !== null) params.min_price = filters.value.min_price
      if (filters.value.max_price !== null) params.max_price = filters.value.max_price
      
      const response = await ApiService.getSessions(params)
      
      console.log('📦 Store: API Response received:', response)
      
      if (response.success) {
        // Extract sessions from the nested data structure
        const sessionsData = response.data?.data || []
        sessions.value = sessionsData
        
        // Update pagination
        pagination.value = {
          current_page: response.data?.current_page || 1,
          per_page: response.data?.per_page || 20,
          total: response.data?.total || 0,
        }
        
        // Update filters
        availableTypes.value = response.filters?.types || []
        availableTrainers.value = response.filters?.trainers || []
        
        console.log('✅ Store: Sessions loaded successfully')
        console.log('📊 Sessions count:', sessions.value.length)
        console.log('📊 Available types:', availableTypes.value)
        console.log('📊 Available trainers:', availableTrainers.value)
        console.log('📊 First session:', sessions.value[0])
      } else {
        error.value = response.message || 'Failed to fetch sessions'
        console.error('❌ Store: API returned error:', response.message)
      }
    } catch (err) {
      const apiError = handleApiError(err)
      error.value = apiError.message
      console.error('❌ Store: Failed to fetch sessions:', apiError)
    } finally {
      loading.value = false
    }
  }

  const toggleSessionSelection = (session: Session) => {
    const index = selectedSessions.value.findIndex(s => s.id === session.id)
    
    if (index > -1) {
      // Remove session
      selectedSessions.value.splice(index, 1)
    } else {
      // Add session
      selectedSessions.value.push(session)
    }
  }

  const clearSelection = () => {
    selectedSessions.value = []
  }

  const updateFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters }
    // Reset to first page when filters change
    pagination.value.current_page = 1
    // Fetch sessions with new filters
    fetchSessions(1)
  }

  const clearFilters = () => {
    filters.value = {
      type: '',
      trainer_id: null,
      date_from: '',
      date_to: '',
      min_price: null,
      max_price: null,
    }
    pagination.value.current_page = 1
    // Fetch sessions with cleared filters
    fetchSessions(1)
  }

  const calculateTotal = async (): Promise<CalculateTotalResponse | null> => {
    if (selectedSessions.value.length === 0) {
      return null
    }

    try {
      const response = await ApiService.calculateTotal({
        session_ids: selectedSessionIds.value
      })
      
      if (response.success) {
        return response.data
      }
    } catch (err) {
      const apiError = handleApiError(err)
      error.value = apiError.message
      console.error('Failed to calculate total:', apiError)
    }
    
    return null
  }

  const createBooking = async (bookingData: Omit<BookingRequest, 'session_ids'>): Promise<Booking | null> => {
    if (selectedSessions.value.length === 0) {
      error.value = 'No sessions selected'
      return null
    }

    loading.value = true
    error.value = null

    try {
      const bookingRequest: BookingRequest = {
        ...bookingData,
        session_ids: selectedSessionIds.value,
      }

      const response = await ApiService.createBooking(bookingRequest)
      
      if (response.success) {
        // Clear selection after successful booking
        clearSelection()
        return response.data
      }
    } catch (err) {
      const apiError = handleApiError(err)
      error.value = apiError.message
      console.error('Failed to create booking:', apiError)
    } finally {
      loading.value = false
    }

    return null
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    sessions,
    selectedSessions,
    loading,
    error,
    filters,
    pagination,
    availableTypes,
    availableTrainers,
    
    // Computed
    totalAmount,
    selectedSessionIds,
    isSessionSelected,
    
    // Actions
    fetchSessions,
    toggleSessionSelection,
    clearSelection,
    updateFilters,
    clearFilters,
    calculateTotal,
    createBooking,
    clearError,
  }
}) 