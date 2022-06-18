import { acceptHMRUpdate, defineStore } from 'pinia'
import { type Address } from '@/api/address'
const emptyAddress: Address = {

}
export const useGlobalVarStore = defineStore('globalVar', {
  state: () => ({
    selectedCategory: '',
    selectedAddress: emptyAddress,
  }),

  actions: {
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGlobalVarStore, import.meta.hot))
