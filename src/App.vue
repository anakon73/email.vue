<script setup lang="ts">
import { type email } from '@/types/emailType'
import { ref, computed } from 'vue'

const emails = ref<email[]>([
  {
    id: 1,
    from: 'team@vuemastery.com',
    subject: "What's up with Vue 3.0? Here's how to find out from Evan You",
    body: "The opening keynote of VueConf US this year was Evan You (the creator of Vue), giving his State of the Vuenion address. He walked us through the journey of getting Vue 3 from a prototype to a reality the past year. He also dove into Vue's overall growth in the community.",
    sentAt: '2020-03-27T18:25:43.511Z',
    archived: false,
    read: true,
  },
  {
    id: 2,
    from: 'jeffrey@vuetraining.net',
    subject: 'Learn by doing - Vue 3 Zero to Intermediate in 8 weeks',
    body: "Building projects is one of the most effective ways to learn - and _the_ most effective way _remember_ what you've learned - but it can be frustrating.\n\nThis 8-week course takes the pain out of 'learning by doing'.\n\nEach week we give you\n\n* a project that will grow your skills without overwhelming you\n* links to hand-picked resources, such as Vue Mastery videos, that share the knowledge you'll need for the project (no more useless rabbit holes)\n* answers to any and all questions you have while working\n* feedback on your completed code (so you're only learning good habits)\n\nOur instructors are standing by to answer your questions.\n\nReady to learn?",
    sentAt: '2020-05-20T18:25:43.511Z',
    archived: false,
    read: false,
  },
  {
    id: 3,
    from: 'damian@dulisz.com',
    subject:
      '#177: Updated Vue.js Roadmap; Vuex v4.0.0-alpha.1 has been released; Kia King Ishii join the core team; Nuxt v2.12 released; Videos from Vue.js Amsterdam 2020 are here!',
    body: 'First of all, lets congratulate Kia King Ishii on joining the Vue.js core team! 🎉 He has been doing an incredible job building vuex-orm and will now focus on working on the next versions of Vuex.\n\nSpeaking of which – Vuex v4.0.0-alpha.1 has just been released! This is the version of Vuex that will work with Vue 3.0 but keep the familiar API you know from the current version.',
    sentAt: '2020-03-18T18:25:43.511Z',
    archived: false,
    read: false,
  },
  {
    id: 4,
    from: 'anthony@vuejsdevelopers.com',
    subject:
      "'Vue 3 Release Roadmap' + 6 more must-read articles from this week",
    body: 'Newsletter Issue #161',
    sentAt: '2020-03-24T18:25:43.511Z',
    archived: true,
    read: false,
  },
])

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
</script>

<template>
  <h1 class="text-[2rem] font-bold mb-3">VMail Inbox</h1>

  <table class="max-w-[62.5rem] m-auto border-collapse">
    <tbody>
      <tr
        v-for="email in emails"
        :key="email.id"
        :class="mailClasses(email)"
        @click="email.read = true"
      >
        <td class="border-b border-t border-black p-1 text-left">
          <input type="checkbox" :class="checkboxClasses" />
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          {{ email.from }}
        </td>
        <td class="border-b border-t border-black p-1 text-left">
          <p class="max-h-[1.2rem] overflow-y-hidden m-0">
            <span class="font-bold"
              >{{ email.subject }} - {{ email.body }}</span
            >
          </p>
        </td>
        <td class="w-[7.5rem] border-b border-t border-black p-1 text-left">
          {{ email.sentAt }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
