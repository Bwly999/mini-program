import request from '@/utils/request'

const prefix = '/user'
export interface UserData {
  code?: string
  avatarUrl?: string
  city?: string
  gender?: number
  nickName?: string
  province?: string
}
export function apiLogin(user: UserData, hideError = false) {
  return request({
    url: `${prefix}/user/token`,
    method: 'POST',
    data: user,
    hideError,
  })
}

export function apiGetUserInfo() {
  return request({
    url: `${prefix}/user/info`,
    method: 'GET',
  }) as Promise<UserData>
}

export function isUserExist(code: string) {
  return request({
    url: `${prefix}/user/${code}:exist`,
    method: 'GET',
    hideError: true,
  }) as Promise<boolean>
}
