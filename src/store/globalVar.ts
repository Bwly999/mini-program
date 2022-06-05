import { acceptHMRUpdate, defineStore } from 'pinia'
export const useGlobalVarStore = defineStore('globalVar', {
  state: () => ({
    selectedCategory: '',
  }),

  actions: {
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGlobalVarStore, import.meta.hot))
