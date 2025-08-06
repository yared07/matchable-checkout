<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 class="section-header">Training Sessions</h1>
            <p class="section-subtitle">
              Book your personal training sessions for padel, fitness, or tennis
            </p>
          </div>
          
          <!-- Cart Summary -->
          <div class="mt-6 lg:mt-0">
            <div class="bg-black text-white rounded-xl p-6 shadow-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-300">
                    {{ bookingStore.selectedSessions.length }} session{{ bookingStore.selectedSessions.length !== 1 ? 's' : '' }} selected
                  </p>
                  <p class="text-2xl font-bold text-white">
                    Total: ${{ bookingStore.totalAmount.toFixed(2) }}
                  </p>
                </div>
                <button
                  v-if="bookingStore.selectedSessions.length > 0"
                  @click="proceedToBooking"
                  class="btn-secondary"
                >
                  Proceed to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="w-full px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <SessionFilters
        :filters="bookingStore.filters"
        :available-types="bookingStore.availableTypes"
        :available-trainers="bookingStore.availableTrainers"
        @update-filters="bookingStore.updateFilters"
        @clear-filters="bookingStore.clearFilters"
      />

      <!-- Error Alert -->
      <div v-if="bookingStore.error" class="mb-8 slide-up">
        <div class="bg-red-50 border border-red-200 rounded-xl p-6">
          <div class="flex">
            <ExclamationTriangleIcon class="w-6 h-6 text-red-500" />
            <div class="ml-4">
              <h3 class="text-lg font-bold text-red-800">Error</h3>
              <p class="text-red-700 mt-1">{{ bookingStore.error }}</p>
            </div>
            <div class="ml-auto pl-4">
              <button
                @click="bookingStore.clearError"
                class="text-red-400 hover:text-red-600 transition-colors"
              >
                <XMarkIcon class="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <LoadingSpinner v-if="bookingStore.loading" />

      <!-- Sessions Grid -->
      <div v-else-if="bookingStore.sessions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        <SessionCard
          v-for="session in bookingStore.sessions"
          :key="session.id"
          :session="session"
          :is-selected="bookingStore.isSessionSelected(session.id)"
          @toggle="bookingStore.toggleSessionSelection(session)"
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 slide-up">
        <div class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <CalendarIcon class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-4">No sessions found</h3>
        <p class="text-gray-600 mb-8 text-lg">
          Try adjusting your filters or check back later for new sessions.
        </p>
        <button
          @click="bookingStore.clearFilters"
          class="btn-secondary"
        >
          Clear Filters
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="bookingStore.sessions.length > 0 && bookingStore.pagination.total > bookingStore.pagination.per_page" class="mt-12">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-600 font-medium">
            Showing {{ (bookingStore.pagination.current_page - 1) * bookingStore.pagination.per_page + 1 }} to 
            {{ Math.min(bookingStore.pagination.current_page * bookingStore.pagination.per_page, bookingStore.pagination.total) }} of 
            {{ bookingStore.pagination.total }} results
          </div>
          
          <div class="flex space-x-3">
            <button
              @click="changePage(bookingStore.pagination.current_page - 1)"
              :disabled="bookingStore.pagination.current_page === 1"
              class="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              @click="changePage(bookingStore.pagination.current_page + 1)"
              :disabled="bookingStore.pagination.current_page * bookingStore.pagination.per_page >= bookingStore.pagination.total"
              class="btn-ghost disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  CalendarIcon, 
  ExclamationTriangleIcon, 
  XMarkIcon 
} from '@heroicons/vue/24/outline'
import { useBookingStore } from '@/stores/booking'
import SessionFilters from '@/components/sessions/SessionFilters.vue'
import SessionCard from '@/components/sessions/SessionCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const router = useRouter()
const bookingStore = useBookingStore()

// Methods
const changePage = (page: number) => {
  if (page >= 1 && page <= Math.ceil(bookingStore.pagination.total / bookingStore.pagination.per_page)) {
    bookingStore.fetchSessions(page)
  }
}

const proceedToBooking = () => {
  router.push('/booking')
}

// Lifecycle
onMounted(() => {
  bookingStore.fetchSessions()
})
</script> 