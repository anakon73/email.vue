<script setup lang="ts">
import { type email } from '@/types/emailType'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import axios from 'axios'
import updateEmail from '@/composables/updateEmail'

type changeEmail = {
  toggleArchive: boolean
  toggleRead: boolean
  save: boolean
  closeModal: boolean
  changeIndex: number
}

const emails = ref<email[]>([])
const openedEmail = ref<email | null>(null)
const selectedScreen = ref<string>('inbox')

await axios
  .get('http://localhost:3000/emails')
  .then((res) => {
    emails.value = res.data
  })
  .catch((error: Error) => {
    error
  })

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

const selected = ref(new Set())
const emailSelection = {
  emails: selected,
  toggle(email: email) {
    if (selected.value.has(email)) selected.value.delete(email)
    else selected.value.add(email)
  },
}

const mailClasses = computed(() => {
  return (email: email) => [
    ['cursor-pointer', 'bg-white', 'h-[2.5rem]'],
    email.read ? 'bg-zinc-100' : '',
  ]
})

const sortedEmails = computed(() => {
  return emails.value.sort((el1, el2) => (el1.sentAt < el2.sentAt ? 1 : -1))
})
const filteredEmails = computed(() => {
  if (selectedScreen.value === 'inbox') {
    return sortedEmails.value.filter((e) => !e.archived)
  } else {
    return sortedEmails.value.filter((e) => e.archived)
  }
})

const openEmail = (email: email) => {
  openedEmail.value = email

  if (email) {
    email.read = true
    updateEmail(email)
  }
}

const archiveEmail = (email: email) => {
  email.archived = true
  updateEmail(email)
}

const changeEmail = (funcs: changeEmail) => {
  if (openedEmail.value !== null) {
    let email: email = openedEmail.value
    if (funcs.toggleRead) email.read = !email?.read
    if (funcs.toggleArchive) email.archived = !email?.archived
    if (funcs.save) updateEmail(email)
    if (funcs.closeModal) openedEmail.value = null
    if (funcs.changeIndex) {
      let emails = filteredEmails.value
      let currentIndex = emails.indexOf(openedEmail.value!)
      let newEmail = emails[currentIndex + funcs.changeIndex]
      openEmail(newEmail!)
    }
  }
}

const selectScreen = (newScreen: string) => {
  selectedScreen.value = newScreen
  emailSelection.emails.value.clear()
}
</script>

<template>
  <div>
    <button
      class="disabled:opacity-60 p-1 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
      @click="selectScreen('inbox')"
      :disabled="selectedScreen === 'inbox'"
    >
      Inbox
    </button>
    <button
      class="disabled:opacity-60 p-1 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
      @click="selectScreen('archived')"
      :disabled="selectedScreen === 'archived'"
    >
      Archived
    </button>
  </div>
  <BulkActionBar
    :emails="filteredEmails"
    :emailSelection="emailSelection.emails"
  />
  <table class="max-w-[62.5rem] m-auto border-collapse">
    <tbody>
      <tr
        v-for="email in filteredEmails"
        :key="email.id"
        :class="mailClasses(email)"
      >
        <td class="border-b border-t border-black p-2 text-left">
          <input
            type="checkbox"
            :class="checkboxClasses"
            @click="emailSelection.toggle(email)"
            :checked="emailSelection.emails.value.has(email)"
          />
        </td>
        <td
          @click="openEmail(email)"
          class="border-b border-t border-black p-1 text-left"
        >
          {{ email.from }}
        </td>
        <td
          @click="openEmail(email)"
          class="border-b border-t border-black p-1 text-left"
        >
          <p class="max-h-[1.4rem] overflow-y-hidden m-0">
            <span class="font-bold">{{ email.subject }} - </span
            >{{ email.body }}
          </p>
        </td>
        <td
          @click="openEmail(email)"
          class="w-[7.5rem] border-b border-t border-black p-1 text-left"
        >
          {{ format(new Date(email.sentAt), 'MMM do yyyy') }}
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          <button
            @click="archiveEmail(email)"
            class="p-2 rounded mt-[5px] mr-2.5 mb-[5px] border bg-slate-100"
          >
            Archive
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <ModalView @closeModal="openedEmail = null" v-if="openedEmail">
    <MailView :email="openedEmail" @changeEmail="changeEmail" />
  </ModalView>
</template>
