<script setup lang="ts"></script>

<template>
  <h1 class="text-[2rem] font-bold mb-3">VMail Inbox</h1>

  <Suspense>
    <template #default>
      <MailTable />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>
