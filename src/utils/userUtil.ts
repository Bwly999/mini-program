import { useUserStore } from '@/store/user'

const userStore = useUserStore()
export function isLogin() {
  if (userStore.id)
    return true
  else
    return false
}

function showLoginTip() {
  uni.showToast({
    title: '请先登录',
    icon: 'error',
    duration: 2000,
  })
}
export function checkLogin() {
  if (!isLogin()) {
    showLoginTip()
    return false
  }
  else {
    return true
  }
}
