<script setup lang="ts">
import { ref } from 'vue'
import { type IUserOrOrgQuery, EUserOrgs, useHttpStore } from '@/stores/http'
import { useAppStore } from '@/stores/app'
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'

const appStore = useAppStore()
const httpStore = useHttpStore()

const userOrgName = ref()
const userOrgType = ref(appStore.defaultType)
const layout = ref(appStore.defaultLayout)

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
  <div v-if="httpStore.items && httpStore.items.length" class="card">
    <DataView :value="httpStore.items" :layout="layout">
      <template #header>
        <div class="tw-flex tw-justify-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="tw-flex tw-items-center tw-gap-3 tw-p-2 hover:tw-bg-indigo-100">
            <div>
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
            <div class="tw-grow tw-text-sm">
              {{ slotProps.data.description }}
            </div>

            <div class="tw-flex tw-items-center tw-gap-2 tw-min-w-[70px]">
              <i class="pi pi-star" />
              <Badge :value="formatStarsCount(slotProps.data.stargazers_count)" />
            </div>
          </div>
        </div>
      </template>
      <template #grid="slotProps">
        <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="tw-p-4 tw-border tw-rounded hover:tw-bg-indigo-100 tw-min-h-[300px]">
            <div class="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-py-5">
              <Avatar :image="slotProps.data.owner.avatar_url" size="large" shape="circle" />
              <a
                :href="slotProps.data.html_url"
                target="_blank"
                class="tw-text-xl tw-text-indigo-700"
                >{{ slotProps.data.name }}</a
              >
              <div class="tw-text-xs">{{ slotProps.data.full_name }}</div>
              <div class="tw-flex tw-items-center tw-gap-2 tw-min-w-[70px]">
                <i class="pi pi-star" />
                <Badge :value="formatStarsCount(slotProps.data.stargazers_count)" />
              </div>
              <div class="tw-text-sm tw-mt-4">{{ slotProps.data.description }}</div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <div v-if="!httpStore.items && httpStore.isLoading">
    <ProgressSpinner />
  </div>
  <div class="tw-py-3 tw-text-lg" v-if="!httpStore.items && !httpStore.isLoading">
    No repositories found.
  </div>
</template>
<style lang="scss">
div {
  //
}
</style>
