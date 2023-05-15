<script setup lang="ts">
import { ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'
import { type IUserOrOrgQuery, EUserOrgs, useHttpStore } from '@/stores/http'

const httpStore = useHttpStore()
const userOrgName = ref()
const userOrgType = ref(EUserOrgs.ORG)
const layout = ref('list')

const searchForRepos = async () => {
  if (!userOrgName.value) {
    return false
  }
  const query = {
    type: userOrgType.value,
    name: userOrgName.value
  } as IUserOrOrgQuery
  await httpStore.fetchRepositoriesByUserOrOrg(query)
}

const formatStarsCount = (count = 0) => {
  const formatter = Intl.NumberFormat('en', { maximumSignificantDigits: 3, notation: 'compact' })
  return formatter.format(count)
}
</script>

<template>
  <div class="tw-flex tw-items-center tw-gap-3">
    <InputText
      v-model="userOrgName"
      placeholder="Enter name to search"
      @keydown.enter="searchForRepos"
    />
    <div class="tw-flex tw-items-center tw-gap-2">
      <RadioButton v-model="userOrgType" :value="EUserOrgs.ORG" inputId="org" />
      <label for="org" class="tw-cursor-pointer">Org</label>
      <RadioButton v-model="userOrgType" :value="EUserOrgs.USER" inputId="user" />
      <label for="user" class="tw-cursor-pointer">User</label>
    </div>
    <Button label="Search" @click="searchForRepos" />
  </div>
  <div v-if="httpStore.items && httpStore.items.length">
    <!-- <ProgressSpinner v-if="!httpStore.items && httpStore.isLoading"/>-->
    <DataView :value="httpStore.items" :layout="layout">
      <!-- <template #header>
        <div class="tw-flex tw-justify-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template> -->
      <template #list="slotProps">
        <div class="col-12 tw-flex tw-items-center tw-gap-3 tw-p-2 hover:tw-bg-indigo-200">
          <div class="">
            <a :href="slotProps.data.html_url" target="_blank">
              <Avatar :image="slotProps.data.owner.avatar_url" size="large" shape="circle" />
            </a>
          </div>
          <div
            class="tw-text-lg tw-min-w-[200px] tw-max-w-[200px]"
            style="overflow-wrap: break-word"
          >
            <a :href="slotProps.data.html_url" target="_blank" class="tw-text-indigo-700">{{
              slotProps.data.name
            }}</a>
            <div class="tw-text-xs">{{ slotProps.data.full_name }}</div>
          </div>
          <div class="tw-grow">
            {{ slotProps.data.description }}
          </div>

          <div class="tw-flex tw-items-center tw-gap-2 tw-min-w-[70px]">
            <i class="pi pi-star" />
            <Badge :value="formatStarsCount(slotProps.data.stargazers_count)" />
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <div class="tw-py-3 tw-text-lg" v-else>No repositories found.</div>
</template>
<style lang="scss">
div {
  //
}
</style>
