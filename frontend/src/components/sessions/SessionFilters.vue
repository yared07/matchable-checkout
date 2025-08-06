<template>
  <div class="rounded-2xl bg-white border border-gray-200 shadow p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">Filter Sessions</h2>
        <p class="text-sm text-gray-500">Find the perfect training session for you</p>
      </div>
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="text-sm px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition"
      >
        Clear All Filters
      </button>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <!-- Session Type -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">Session Type</label>
        <select
          v-model="localFilters.type"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option value="">All Types</option>
          <option
            v-for="type in availableTypes"
            :key="type"
            :value="type"
          >
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </option>
        </select>
      </div>

      <!-- Trainer -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">Trainer</label>
        <select
          v-model="localFilters.trainer_id"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        >
          <option :value="null">All Trainers</option>
          <option
            v-for="trainer in availableTrainers"
            :key="trainer.id"
            :value="trainer.id"
          >
            {{ trainer.name }}
          </option>
        </select>
      </div>

      <!-- Date From -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">From Date</label>
        <input
          type="date"
          v-model="localFilters.date_from"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <!-- Date To -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">To Date</label>
        <input
          type="date"
          v-model="localFilters.date_to"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <!-- Min Price -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">Min Price</label>
        <input
          type="number"
          min="0"
          placeholder="0"
          v-model.number="localFilters.min_price"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <!-- Max Price -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700">Max Price</label>
        <input
          type="number"
          min="0"
          placeholder="1000"
          v-model.number="localFilters.max_price"
          @change="updateFilters"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>
    </div>

    <!-- Active Filters -->
    <div v-if="hasActiveFilters" class="pt-4 border-t border-gray-200">
      <h3 class="text-sm font-semibold text-gray-700 mb-3">Active Filters:</h3>
      <div class="flex flex-wrap gap-2">
        <span v-if="localFilters.type" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          Type: {{ localFilters.type }}
        </span>
        <span v-if="localFilters.trainer_id" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          Trainer: {{ getTrainerName(localFilters.trainer_id) }}
        </span>
        <span v-if="localFilters.date_from" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          From: {{ formatDate(localFilters.date_from) }}
        </span>
        <span v-if="localFilters.date_to" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          To: {{ formatDate(localFilters.date_to) }}
        </span>
        <span v-if="localFilters.min_price !== null" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          Min: ${{ localFilters.min_price }}
        </span>
        <span v-if="localFilters.max_price !== null" class="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
          Max: ${{ localFilters.max_price }}
        </span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Filters } from '@/types'

interface Props {
  filters: Filters
  availableTypes: string[]
  availableTrainers: Array<{
    id: number
    name: string
    specializations: string[]
  }>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update-filters': [filters: Filters]
  'clear-filters': []
}>()

// Local filters state
const localFilters = ref({ ...props.filters })

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// Computed
const hasActiveFilters = computed(() => {
  return localFilters.value.type ||
         localFilters.value.trainer_id !== null ||
         localFilters.value.date_from ||
         localFilters.value.date_to ||
         localFilters.value.min_price !== null ||
         localFilters.value.max_price !== null
})

// Methods
const updateFilters = () => {
  emit('update-filters', { ...localFilters.value })
}

const clearFilters = () => {
  localFilters.value = {
    type: '',
    trainer_id: null,
    date_from: '',
    date_to: '',
    min_price: null,
    max_price: null,
  }
  emit('clear-filters')
}

const getTrainerName = (trainerId: number | null) => {
  if (!trainerId) return ''
  const trainer = props.availableTrainers.find(t => t.id === trainerId)
  return trainer?.name || ''
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script> 