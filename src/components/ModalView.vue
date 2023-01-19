<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside, onKeyDown } from '@vueuse/core'

const modal = ref()

const emits = defineEmits(['closeModal'])

const closeModal = () => {
  emits('closeModal')
}

onClickOutside(modal, () => closeModal())
onKeyDown('Escape', () => closeModal())
</script>

<template>
  <div class="fixed inset-0 z-10 focus:outline-none flex items-center mx-auto">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div
      ref="modal"
      class="relative max-w-[80%] m-auto mt-8 p-5 bg-white min-h-[31.25rem] z-20"
    >
      <slot />
    </div>
  </div>
</template>
