<template>
  <div class="flex justify-center items-center" :class="containerClass">
    <div class="relative">
      <!-- Modern Spinner -->
      <div 
        class="spinner"
        :class="sizeClass"
      ></div>
      
      <!-- Loading text -->
      <div v-if="showText" class="mt-4 text-center">
        <p class="text-sm font-medium text-gray-600">{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  showText?: boolean
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  text: 'Loading sessions...',
  showText: true,
  containerClass: 'min-h-[300px]'
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-6 border-2'
    case 'lg':
      return 'w-12 h-12 border-4'
    default:
      return 'w-8 h-8 border-3'
  }
})
</script> 