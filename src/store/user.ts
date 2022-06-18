import { acceptHMRUpdate, defineStore } from 'pinia'
import { type UserData, apiGetUserInfo, apiLogin } from '@/api/user'
import { type Address } from '@/api/address'

// const emptyUser = {
//   id: '',
//   openId: '',
//   avatarUrl: '',
//   city: '',
//   gender: 0,
//   nickName: '',
//   province: '',
//   isAdmin: true,
//   token: '',
// }
// const emptyAddress: Address = {
//   consignee: '',
//   phone: '',
//   province: '',
//   city: '',
//   district: '',
//   detailAddress: '',
// }

export const TOKEN_KEY = 'mini_token'
export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    openId: '',
    avatarUrl: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.qqkou.com%2Fi%2F1a3626475345x3078425090b26.jpg&refer=http%3A%2F%2Fi.qqkou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658123309&t=567686e70843c355c4a3a085ef171661',
    city: '',
    gender: 0,
    nickName: '未登录',
    province: '',
    selectedAddress: undefined as unknown as Address,
    isAdmin: true,
  }),

  actions: {
    logout() {
      uni.setStorageSync(TOKEN_KEY, '')
      //   this.$patch({
      //     ...emptyUser,
      //   })
      this.$reset()
      // we could do other stuff like redirecting the user
    },

    async login(user: UserData) {
      try {
        const { data: token } = await apiLogin(user) as any
        uni.setStorageSync(TOKEN_KEY, token)
        this.getUserInfo()
      }
      catch (e) {
        console.log(e)
      }
    },

    async getUserInfo() {
      console.log('getting user info')
      const token = uni.getStorageSync(TOKEN_KEY)
      if (token) {
        const data = await apiGetUserInfo() as any
        this.$patch({
          ...data.data,
        })
        console.log(this.$state)
      }
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
