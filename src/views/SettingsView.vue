<script lang="ts" setup>
import { useAppStore } from '@/stores/app'
import { EUserOrgs } from '@/stores/http'
import RadioButton from 'primevue/radiobutton'

const appStore = useAppStore()
</script>
<template>
  <div class="tw-flex tw-items-center tw-gap-2">
    <div class="tw-min-w-[138px]">Default search type:</div>
    <div>
      <div class="tw-flex tw-items-center tw-gap-4">
        <RadioButton v-model="appStore.defaultType" :value="EUserOrgs.ORG" inputId="org" />
        <label for="org" class="tw-cursor-pointer">Org</label>
        <RadioButton v-model="appStore.defaultType" :value="EUserOrgs.USER" inputId="user" />
        <label for="user" class="tw-cursor-pointer">User</label>
      </div>
    </div>
  </div>

  <div class="tw-flex tw-items-center tw-gap-4">
    <div class="tw-min-w-[138px]">Default grid style:</div>
    <div>
      <div class="tw-flex tw-items-center tw-gap-2">
        <RadioButton v-model="appStore.defaultLayout" value="list" inputId="list" />
        <label for="list" class="tw-cursor-pointer">List</label>
        <RadioButton v-model="appStore.defaultLayout" value="grid" inputId="grid" />
        <label for="grid" class="tw-cursor-pointer">Grid</label>
      </div>
    </div>
  </div>
</template>
