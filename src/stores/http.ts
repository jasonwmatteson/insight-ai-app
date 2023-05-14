import { defineStore} from'pinia';


export const useHttpStore = defineStore('http', () => {

  const GITHUB_API_BASE = 'https://api.github.com';
  const GITHUB_API_SEARCH = `${GITHUB_API_BASE}/search`;
  return {};
})
