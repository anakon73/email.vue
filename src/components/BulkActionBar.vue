<script setup lang="ts">
import { email } from '@/types/emailType'
import { ref, toRefs, computed } from 'vue'

interface Set<T> {
  add(value: T): this
  clear(): void
  delete(value: T): boolean
  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    thisArg?: any
  ): void
  has(value: T): boolean
  readonly size: number
}

type Props = {
  emails: email[]
  emailSelection: Set<email>
}
const props = defineProps<Props>()
const { emails, emailSelection } = toRefs(props)

const checkboxClasses: string[] = [
  'appearance-none',
  'cursor-pointer',
  'w-6',
  'h-6',
  'bg-white',
  'rounded-sm',
  'border',
  'border-neutral-600',
  'relative align-middle',
  'p-2.5',
  'checked:bg-slate-500',
]

const bulkSelect = () => {
  if (allEmailsSelected.value) {
    emailSelection.value.clear()
  } else {
    emails.value.forEach((item: email) => emailSelection.value.add(item))
  }
}

const numberSelected = computed(() => emailSelection.value.size)
const numberEmails = computed(() => emails.value.length)
const allEmailsSelected = computed(
  () => numberSelected.value === numberEmails.value
)
const someEmailsSelected = computed(
  () => numberSelected.value > 0 && numberSelected.value < numberEmails.value
)
</script>

<template>
  <div>
    <div class="text-3xl">{{ emails.length }}</div>
    <div class="text-3xl">{{ emailSelection.size }}</div>
    <div>
      <input
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[checkboxClasses, [someEmailsSelected ? ['bg-slate-300'] : []]]"
        @click="bulkSelect"
      />
    </div>
  </div>
</template>
