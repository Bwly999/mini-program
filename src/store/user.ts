import { acceptHMRUpdate, defineStore } from 'pinia'
import { type UserData, apiGetUserInfo, apiLogin } from '@/api/user'

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
export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    openId: '',
    avatarUrl: '',
    city: '',
    gender: 0,
    nickName: '',
    province: '',
    isAdmin: true,
  }),

  actions: {
    logout() {
      uni.setStorageSync('token', '')
      //   this.$patch({
      //     ...emptyUser,
      //   })
      this.$reset()
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
