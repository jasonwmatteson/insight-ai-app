import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IGitHubResponse, IItem } from './http.types'

enum ESortOptions {
  STARS = 'stars',
  FORKS = 'forks',
  HELP_WANTED_ISSUES = 'help-wanted-issues',
  UPDATED = 'updated'
}

enum EOrderOptions {
  ASC = 'asc',
  DESC = 'desc'
}

interface IQuery {
  sort: ESortOptions
  order: EOrderOptions
  per_page?: number
  page?: number
}

interface IParams {
  q: string
  sort?: string
  order?: string
  per_page?: number
  page?: number
}

export enum EUserOrgs {
  USER = 'user',
  ORG = 'org'
}
export interface IUserOrOrgQuery extends IQuery {
  type: EUserOrgs
  name: string
}

export const useHttpStore = defineStore('http', () => {
  const items = ref<IItem[] | null>()
  const isLoading = ref<boolean>(false)
  const GITHUB_API_BASE = 'https://api.github.com'
  const GITHUB_API_SEARCH_ENDPOINT = `${GITHUB_API_BASE}/search`
  const GITHUB_API_REPO_ENDPOINT = `${GITHUB_API_SEARCH_ENDPOINT}/repositories`

  const AXIOS_HEADERS = {
    Accept: 'application/vnd.github.v3+json'
  }

  const fetchRepositoriesByUserOrOrg = async (query: IUserOrOrgQuery): Promise<boolean> => {
    isLoading.value = true
    if (!query.name) {
      return false
    }

    try {
      items.value = null

      const q = `${query.type}:${query.name}`

      const params: IParams = {
        q,
        sort: ESortOptions.STARS,
        order: EOrderOptions.DESC,
        per_page: 10,
        page: 1
      }

      if (query) {
        if (query.sort) {
          params.sort = query.sort
        }
        if (query.order) {
          params.order = query.order
        }
        if (query.per_page) {
          params.per_page = query.per_page
        }
        if (query.page) {
          params.page = query.page
        }
      }

      const resp = await axios.get(GITHUB_API_REPO_ENDPOINT, {
        params,
        headers: AXIOS_HEADERS
      })

      if (resp.status === 200) {
        items.value = resp.data.items
        isLoading.value = false
        console.log(items.value)
        return true
      }
    } catch (error) {
      console.log(error)
    }
    isLoading.value = false
    return false
  }
  return {
    items,
    isLoading,
    fetchRepositoriesByUserOrOrg
  }
})
