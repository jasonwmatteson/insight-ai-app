<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TabMenu from 'primevue/tabmenu'
const tabMenuItems = ref([
  {
    label: 'Repositories',
    icon: 'pi pi-fw pi-github',
    to: '/'
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
    to: '/settings'
  }
])
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-4 tw-w-full">
    <div class="tw-bg-indigo-700 tw-text-indigo-100 tw-text-2xl tw-p-2">
      Insight.ai - Repository Search
    </div>
    <TabMenu :model="tabMenuItems" />
    <div class="tw-p-3">
      <router-view v-slot="{ Component, route }">
        <KeepAlive>
          <component :is="Component" :key="route.path" />
        </KeepAlive>
      </router-view>
    </div>
  </div>
</template>
