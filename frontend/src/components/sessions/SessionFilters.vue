<template>
  <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <!-- Filter Title -->
      <div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">Filter Sessions</h3>
        <p class="text-gray-600">Find the perfect training session for you</p>
      </div>

      <!-- Clear Filters Button -->
      <button
        v-if="hasActiveFilters"
        @click="clearFilters"
        class="btn-ghost text-sm bg-white border border-gray-200 hover:bg-gray-50"
      >
        Clear All Filters
      </button>
    </div>

    <!-- Filter Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <!-- Session Type Filter -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          Session Type
        </label>
        <select
          v-model="localFilters.type"
          @change="updateFilters"
          class="input-field bg-white"
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

      <!-- Trainer Filter -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          Trainer
        </label>
        <select
          v-model="localFilters.trainer_id"
          @change="updateFilters"
          class="input-field bg-white"
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

      <!-- Date Range -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          From Date
        </label>
        <input
          v-model="localFilters.date_from"
          type="date"
          @change="updateFilters"
          class="input-field bg-white"
        />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          To Date
        </label>
        <input
          v-model="localFilters.date_to"
          type="date"
          @change="updateFilters"
          class="input-field bg-white"
        />
      </div>
    </div>

    <!-- Price Range -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          Min Price
        </label>
        <input
          v-model.number="localFilters.min_price"
          type="number"
          placeholder="0"
          min="0"
          @change="updateFilters"
          class="input-field bg-white"
        />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 mb-3">
          Max Price
        </label>
        <input
          v-model.number="localFilters.max_price"
          type="number"
          placeholder="1000"
          min="0"
          @change="updateFilters"
          class="input-field bg-white"
        />
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-8 pt-6 border-t border-gray-200">
      <h4 class="text-sm font-bold text-gray-700 mb-4">Active Filters:</h4>
      <div class="flex flex-wrap gap-3">
        <span
          v-if="localFilters.type"
          class="badge badge-neutral"
        >
          Type: {{ localFilters.type }}
        </span>
        
        <span
          v-if="localFilters.trainer_id"
          class="badge badge-neutral"
        >
          Trainer: {{ getTrainerName(localFilters.trainer_id) }}
        </span>
        
        <span
          v-if="localFilters.date_from"
          class="badge badge-neutral"
        >
          From: {{ formatDate(localFilters.date_from) }}
        </span>
        
        <span
          v-if="localFilters.date_to"
          class="badge badge-neutral"
        >
          To: {{ formatDate(localFilters.date_to) }}
        </span>
        
        <span
          v-if="localFilters.min_price"
          class="badge badge-neutral"
        >
          Min: ${{ localFilters.min_price }}
        </span>
        
        <span
          v-if="localFilters.max_price"
          class="badge badge-neutral"
        >
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