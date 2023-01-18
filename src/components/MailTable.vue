<script setup lang="ts">
import { type email } from '@/types/emailType'
import { ref, computed } from 'vue'
import axios from 'axios'
import { format } from 'date-fns'

setTimeout(() => {
  axios
    .get('https://my-json-server.typicode.com/anakon73/gmail.vue/emails')
    .then((res) => {
      emails.value = res.data
    })
    .catch((error) => {
      console.log(error)
    })
}, 1000)

const emails = ref<email[]>([])

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

const mailClasses = computed(() => {
  return (email: email) => [
    ['cursor-pointer', 'bg-white', 'h-[2.5rem]'],
    email.read ? 'bg-zinc-100' : '',
  ]
})

const sortedEmails = computed(() => {
  return emails.value.sort((el1, el2) => (el1.sentAt < el2.sentAt ? 1 : -1))
})
const unarchivedEmails = computed(() => {
  return sortedEmails.value.filter((e) => !e.archived)
})
</script>

<template>
  <table class="max-w-[62.5rem] m-auto border-collapse">
    <tbody>
      <tr
        v-for="email in unarchivedEmails"
        :key="email.id"
        :class="mailClasses(email)"
        @click="email.read = true"
      >
        <td class="border-b border-t border-black p-2 text-left">
          <input type="checkbox" :class="checkboxClasses" />
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          {{ email.from }}
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          <p class="max-h-[1.4rem] overflow-y-hidden m-0">
            <span class="font-bold">{{ email.subject }} - </span
            >{{ email.body }}
          </p>
        </td>
        <td class="w-[7.5rem] border-b border-t border-black p-1 text-left">
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          <button
            @click="email.archived = true"
            class="p-2 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
          >
            Archive
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
