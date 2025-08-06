<template>
  <div 
    class="rounded-xl border border-gray-200 bg-white p-5 space-y-6 cursor-pointer group transition-all hover:shadow-md"
    :class="{ 'ring-1 ring-black/70 bg-gray-50': isSelected }"
    @click="$emit('toggle')"
  >
    <!-- Header -->
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full" :class="typeColorClass"></span>
        <span class="text-xs font-medium uppercase text-gray-500 tracking-wide">{{ session.type }}</span>
      </div>
      <div class="text-right space-y-0.5">
        <p class="text-xl font-semibold text-gray-900">${{ session.price }}</p>
        <p class="text-xs text-gray-400">per session</p>
      </div>
    </div>

    <!-- Trainer -->
    <div class="flex items-center gap-4">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white text-sm font-semibold shadow-sm">
        {{ session.trainer.name.charAt(0) }}
      </div>
      <div class="space-y-0.5">
        <p class="text-sm font-medium text-gray-800">{{ session.trainer.name }}</p>
        <p class="text-xs text-gray-500 leading-tight">{{ session.trainer.specializations.join(', ') }}</p>
      </div>
    </div>

    <!-- Date & Time -->
    <div class="flex flex-wrap gap-6 text-sm text-gray-500 pt-1">
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
    <div class="rounded-lg bg-gray-50 border border-gray-100 p-3 space-y-2">
      <div class="flex justify-between text-xs text-gray-600">
        <span>Start</span>
        <span class="text-gray-900 font-medium">{{ formatTime(session.start_time) }}</span>
      </div>
      <div class="flex justify-between text-xs text-gray-600">
        <span>End</span>
        <span class="text-gray-900 font-medium">{{ formatTime(session.end_time) }}</span>
      </div>
    </div>

    <!-- Status & Selection -->
    <div class="flex justify-between items-center text-sm pt-1">
      <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="statusBadgeClass">
        {{ session.status }}
      </span>
      <div v-if="isSelected" class="flex items-center gap-1 text-green-600 font-medium">
        <CheckIcon class="w-4 h-4" />
        <span class="text-xs">Selected</span>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="pt-4 border-t border-gray-100">
      <button
        class="w-full py-2 text-sm rounded-md font-medium transition-all"
        :class="isSelected 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-gray-900 hover:bg-gray-800 text-white'"
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
import type { Session } from '@/types'

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