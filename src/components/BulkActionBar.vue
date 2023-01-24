<script setup lang="ts">
import updateEmail from '@/composables/updateEmail'
import { email } from '@/types/emailType'
import { clear } from 'console'
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
  'm-[0.313rem]',
  'ml-2',
  'mr-1.5',
]

const bulkSelect = () => {
  if (allEmailsSelected.value) {
    emailSelection.value.clear()
  } else {
    emails.value.forEach((email: email) => emailSelection.value.add(email))
  }
}

const markRead = () => {
  emailSelection.value.forEach((email: email) => {
    email.read = true
    updateEmail(email)
  })
}

const markUnread = () => {
  emailSelection.value.forEach((email: email) => {
    email.read = false
    updateEmail(email)
  })
}

const markArchive = () => {
  emailSelection.value.forEach((email: email) => {
    email.archived = true
    updateEmail(email)
  })
  emailSelection.value.clear()
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
  <div class="w-full max-w-[62.5rem] m-auto text-left pb-2 flex items-center">
    <span>
      <input
        class=""
        type="checkbox"
        :checked="allEmailsSelected"
        :class="[checkboxClasses, [someEmailsSelected ? ['bg-slate-300'] : []]]"
        @click="bulkSelect"
      />
    </span>
    <span>
      <button
        @click="markRead"
        class="p-1 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
        :disabled="[...emailSelection].every((e:email) => e.read)"
      >
        Mark Read
      </button>
      <button
        @click="markUnread"
        class="p-1 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
        :disabled="[...emailSelection].every((e:email) => !e.read)"
      >
        Mark Unread
      </button>
      <button
        @click="markArchive"
        class="p-1 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
        :disabled="numberSelected === 0"
      >
        Mark Archive
      </button>
    </span>
  </div>
</template>
