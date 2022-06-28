import { acceptHMRUpdate, defineStore } from 'pinia'
import { type Address } from '@/api/address'
import { type News } from '@/api/news'
const emptyAddress: Address = {

}
export const useGlobalVarStore = defineStore('globalVar', {
  state: () => ({
    selectedCategory: '',
    selectedAddress: emptyAddress,
    selectedNews: {} as unknown as News,
  }),

  actions: {
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGlobalVarStore, import.meta.hot))
