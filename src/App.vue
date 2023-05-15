<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import TabMenu from 'primevue/tabmenu'
const tabMenuItems = ref([
  {
    label: 'Repositories',
    icon: 'pi pi-fw pi-home',
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
  <div class="tw-flex tw-flex-col tw-gap-4 tw-p-1 tw-w-full">
    <TabMenu :model="tabMenuItems" />
    <div class="tw-p-3">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<style lang="scss"></style>
