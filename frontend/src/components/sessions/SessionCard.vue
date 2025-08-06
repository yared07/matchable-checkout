<template>
  <div 
    class="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white p-6 space-y-6 cursor-pointer group"
    :class="{ 'ring-2 ring-black/80 bg-gray-50': isSelected }"
    @click="$emit('toggle')"
  >
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full" :class="typeColorClass"></span>
        <span class="text-xs font-semibold uppercase text-gray-500 tracking-wide">{{ session.type }}</span>
      </div>
      <div class="text-right">
        <p class="text-2xl font-bold text-gray-900">${{ session.price }}</p>
        <p class="text-xs text-gray-400">per session</p>
      </div>
    </div>

    <!-- Trainer -->
    <div class="flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white font-bold text-lg shadow-md">
        {{ session.trainer.name.charAt(0) }}
      </div>
      <div>
        <p class="text-gray-900 font-semibold text-base">{{ session.trainer.name }}</p>
        <p class="text-xs text-gray-500">{{ session.trainer.specializations.join(', ') }}</p>
      </div>
    </div>

    <!-- Date & Time -->
    <div class="flex gap-6 text-sm text-gray-500">
      <div class="flex items-center gap-1">
        <CalendarIcon class="w-4 h-4" />
        <span>{{ formatDate(session.start_time) }}</span>
      </div>
      <div class="flex items-center gap-1">
        <ClockIcon class="w-4 h-4" />
        <span>{{ session.duration_minutes }} min</span>
      </div>
    </div>

    <!-- Time Range -->
    <div class="rounded-xl bg-gray-50 border border-gray-100 p-4 space-y-2">
      <div class="flex justify-between text-sm text-gray-600">
        <span>Start</span>
        <span class="text-gray-900 font-semibold">{{ formatTime(session.start_time) }}</span>
      </div>
      <div class="flex justify-between text-sm text-gray-600">
        <span>End</span>
        <span class="text-gray-900 font-semibold">{{ formatTime(session.end_time) }}</span>
      </div>
    </div>

    <!-- Status & Selection -->
    <div class="flex justify-between items-center text-sm">
      <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="statusBadgeClass">
        {{ session.status }}
      </span>
      <div v-if="isSelected" class="flex items-center gap-1 text-green-600 font-medium">
        <CheckIcon class="w-5 h-5" />
        <span>Selected</span>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="pt-4 border-t border-gray-100">
      <button
        class="w-full py-2 px-4 rounded-lg text-white font-semibold transition-all duration-300"
        :class="isSelected 
          ? 'bg-green-600 hover:bg-green-700' 
          : 'bg-gray-800 hover:bg-gray-900'"
        @click.stop="$emit('toggle')"
      >
        {{ isSelected ? 'Remove from Cart' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>



<script setup lang="ts">
import { computed } from 'vue'
import { CalendarIcon, ClockIcon, CheckIcon } from '@heroicons/vue/24/outline'
import type { Session } from '@/services/api'

interface Props {
  session: Session
  isSelected: boolean
}

const props = defineProps<Props>()
defineEmits<{
  toggle: []
}>()

// Computed properties
const typeColorClass = computed(() => {
  switch (props.session.type) {
    case 'padel':
      return 'bg-orange-500'
    case 'tennis':
      return 'bg-green-500'
    case 'fitness':
      return 'bg-purple-500'
    default:
      return 'bg-gray-500'
  }
})

const statusBadgeClass = computed(() => {
  switch (props.session.status) {
    case 'available':
      return 'badge-success'
    case 'booked':
      return 'badge-error'
    case 'cancelled':
      return 'badge-warning'
    default:
      return 'badge-neutral'
  }
})

// Utility functions
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
</script> 