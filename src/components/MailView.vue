<script setup lang="ts">
import { type email } from '@/types/emailType'
import { format } from 'date-fns'
import { marked } from 'marked'
import { computed, toRefs } from 'vue'

type Props = {
  email: email
}
const props = defineProps<Props>()
const { email } = toRefs(props)

const markdownToHTML = computed(() => {
  return marked(email.value.body)
})
</script>

<template>
  <div class="text-left mt-4">
    <h2 class="mb-0 text-2xl font-extrabold">
      Subject: <span class="font-bold">{{ email.subject }}</span>
    </h2>
    <div>
      <em class="italic"
        >From {{ email.from }} on
        {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em
      >
    </div>
    <div class="prose" v-html="markdownToHTML" />
  </div>
</template>
