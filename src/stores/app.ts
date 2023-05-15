import { watch, ref } from 'vue'
import { defineStore } from 'pinia'
import { EUserOrgs } from './http'

export const useAppStore = defineStore('app', () => {
  const defaultType = ref(localStorage.getItem('defaultType') || EUserOrgs.ORG)
  const defaultLayout = ref(localStorage.getItem('defaultLayout') || 'list')

  watch(
    () => defaultType.value,
    (defaultType: string) => {
      localStorage.setItem('defaultType', defaultType)
    }
  )
  watch(
    () => defaultLayout.value,
    (defaultLayout: string) => {
      localStorage.setItem('defaultLayout', defaultLayout)
    }
  )

  return { defaultType, defaultLayout }
})
