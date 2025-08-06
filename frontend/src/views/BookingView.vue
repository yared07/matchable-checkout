<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="section-header">Complete Your Booking</h1>
            <p class="section-subtitle">
              Review your selected sessions and provide your details
            </p>
          </div>
          
          <button
            @click="router.push('/')"
            class="btn-ghost"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Booking Form -->
        <div class="lg:col-span-2">
          <div class="card-elevated">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">Your Information</h2>
            
            <form @submit.prevent="submitBooking" class="space-y-8">
              <!-- Personal Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    v-model="form.customer_name"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    v-model="form.customer_email"
                    type="email"
                    required
                    class="input-field"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-3">
                  Phone Number *
                </label>
                <input
                  v-model="form.customer_phone"
                  type="tel"
                  required
                  class="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-3">
                  Additional Notes
                </label>
                <textarea
                  v-model="form.notes"
                  rows="4"
                  class="input-field"
                  placeholder="Any special requirements or notes..."
                ></textarea>
              </div>
              
              <!-- Terms and Conditions -->
              <div class="flex items-start space-x-4">
                <input
                  v-model="form.terms_accepted"
                  type="checkbox"
                  required
                  class="mt-2 h-5 w-5 text-black border-gray-300 rounded focus:ring-black"
                />
                <div>
                  <label class="text-sm text-gray-700">
                    I agree to the 
                    <a href="#" class="text-black hover:text-gray-800 underline font-medium">Terms and Conditions</a>
                    and 
                    <a href="#" class="text-black hover:text-gray-800 underline font-medium">Privacy Policy</a>
                  </label>
                </div>
              </div>
              
              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading || selectedSessions.length === 0"
                class="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading">Processing...</span>
                <span v-else>Complete Booking - ${{ totalAmount.toFixed(2) }}</span>
              </button>
            </form>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="card-elevated sticky top-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
            
            <!-- Selected Sessions -->
            <div v-if="selectedSessions.length > 0" class="space-y-4 mb-8">
              <div
                v-for="session in selectedSessions"
                :key="session.id"
                class="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span class="text-white font-bold text-sm">
                    {{ session.type.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <div class="flex-1">
                  <h4 class="font-bold text-gray-900">{{ session.type }} Session</h4>
                  <p class="text-sm text-gray-600 font-medium">{{ session.trainer.name }}</p>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(session.start_time) }} at {{ formatTime(session.start_time) }}
                  </p>
                </div>
                <div class="text-right">
                  <span class="font-bold text-gray-900">${{ session.price }}</span>
                </div>
              </div>
            </div>
            
            <!-- Total -->
            <div v-if="selectedSessions.length > 0" class="border-t border-gray-200 pt-6">
              <div class="flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${{ totalAmount.toFixed(2) }}</span>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-if="selectedSessions.length === 0" class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon class="w-8 h-8 text-gray-400" />
              </div>
              <p class="text-gray-600 font-medium">No sessions selected</p>
              <button
                @click="router.push('/')"
                class="btn-secondary mt-4"
              >
                Browse Sessions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { CalendarIcon } from '@heroicons/vue/24/outline'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const bookingStore = useBookingStore()

// Form state
const form = ref({
  customer_name: '',
  customer_email: '',
  customer_phone: '',
  notes: '',
  terms_accepted: false,
})

// Destructure store
const {
  selectedSessions,
  totalAmount,
  loading,
  error,
  createBooking,
} = bookingStore

// Computed
const canSubmit = computed(() => {
  return form.value.customer_name &&
         form.value.customer_email &&
         form.value.customer_phone &&
         form.value.terms_accepted &&
         selectedSessions.length > 0
})

// Methods
const submitBooking = async () => {
  if (!canSubmit.value) return
  
  const booking = await createBooking({
    customer_name: form.value.customer_name,
    customer_email: form.value.customer_email,
    customer_phone: form.value.customer_phone,
    notes: form.value.notes,
    terms_accepted: form.value.terms_accepted,
  })
  
  if (booking) {
    // Redirect to success page or show success message
    alert('Booking created successfully!')
    router.push('/')
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

// Lifecycle
onMounted(() => {
  if (selectedSessions.length === 0) {
    router.push('/')
  }
})
</script> 