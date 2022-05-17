import request from '@/utils/request'

export interface UserData {
  code?: string
  avatarUrl?: string
  city?: string
  gender?: number
  nickName?: string
  province?: string
}
export function apiLogin(user: UserData) {
  return request({
    url: '/user/', // 仅为示例，并非真实接口地址。
    method: 'POST',
    data: user,
  })
}

export function apiGetUserInfo() {
  return request({
    url: '/user/info', // 仅为示例，并非真实接口地址。
    method: 'GET',
  }) as Promise<UserData>
}
