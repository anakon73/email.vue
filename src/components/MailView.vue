<script setup lang="ts">
import { type email } from '@/types/emailType'
import { onKeyDown } from '@vueuse/core'
import axios from 'axios'
import { format } from 'date-fns'
import { marked } from 'marked'
import { computed, toRefs } from 'vue'

type Props = {
  email: email
}
const props = defineProps<Props>()
const { email } = toRefs(props)

const emits = defineEmits(['changeEmail'])

const markdownToHTML = computed(() => {
  return marked(email.value.body)
})

const toggleRead = () => emits('changeEmail', { toggleRead: true, save: true })
const toggleArchive = () =>
  emits('changeEmail', { toggleArchive: true, save: true, closeModal: true })
const goNewer = () => emits('changeEmail', { changeIndex: -1 })
const goOlder = () => emits('changeEmail', { changeIndex: 1 })
const goNewerAndArchive = () =>
  emits('changeEmail', { changeIndex: -1, toggleArchive: true, save: true })
const goOlderAndArchive = () =>
  emits('changeEmail', { changeIndex: 1, toggleArchive: true, save: true })

// const toggleRead = () => {
//   email.value.read = !email.value.read
//   axios.put(`http://localhost:3000/emails/${email.value.id}`, email)
// }
// const toggleArchive = () => {
//   email.value.archived = !email.value.archived
//   axios.put(`http://localhost:3000/emails/${email.value.id}`, email)
// }

const buttonClasses = [
  'p-2',
  'rounded',
  'mt-[5px]',
  'mr-2.5',
  'mb-[5px]',
  'border',
  'bg-slate-100',
]

onKeyDown(['R', 'r'], () => {
  toggleRead()
})
onKeyDown(['E', 'e'], () => {
  toggleArchive()
})
onKeyDown(['K', 'k'], () => {
  goNewer()
})
onKeyDown(['J', 'j'], () => {
  goOlder()
})
onKeyDown(['['], () => {
  goNewerAndArchive()
})
onKeyDown([']'], () => {
  goOlderAndArchive()
})
</script>

<template>
  <div class="text-left">
    <div>
      <button @click="toggleArchive" :class="buttonClasses">
        {{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}
      </button>
      <button @click="toggleRead" :class="buttonClasses">
        {{ email.read ? 'Mark unread (r)' : 'Mark Read (r)' }}
      </button>
      <button @click="goNewer" :class="buttonClasses">Newer (k)</button>
      <button @click="goOlder" :class="buttonClasses">Older (j)</button>
    </div>
    <h2 class="mb-0 text-2xl font-extrabold">
      Subject: <span class="font-bold">{{ email.subject }}</span>
    </h2>
    <div>
      <em class="italic"
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em
      >
    </div>
    <div class="prose-xl" v-html="markdownToHTML" />
  </div>
</template>
