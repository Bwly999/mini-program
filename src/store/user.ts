import { acceptHMRUpdate, defineStore } from 'pinia'
import { type UserData, apiGetUserInfo, apiLogin } from '@/api/user'
import { type Address } from '@/api/address'

const emptyUser = {
  id: '',
  openId: '',
  avatarUrl: '',
  city: '',
  gender: 0,
  nickName: '',
  province: '',
  isAdmin: true,
  token: '',
}
const emptyAddress: Address = {
  consignee: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detailAddress: '',
}
export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    openId: '',
    avatarUrl: '',
    city: '',
    gender: 0,
    nickName: '',
    province: '',
    selectedAddress: emptyAddress,
    isAdmin: true,
  }),

  actions: {
    logout() {
      uni.setStorageSync('token', '')
      //   this.$patch({
      //     ...emptyUser,
      //   })
      this.$reset()
      this.selectedAddress = emptyAddress
      // we could do other stuff like redirecting the user
    },

    async login(user: UserData) {
      const token = await apiLogin(user)
      uni.setStorageSync('token', token)
      this.getUserInfo()
    },

    async getUserInfo() {
      const token = uni.getStorageSync('token')
      if (token) {
        const data = await apiGetUserInfo()
        this.$patch({
          ...data,
        })
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
