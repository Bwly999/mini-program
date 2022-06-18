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
export function apiLogin(user: UserData) {
  return request({
    url: `${prefix}/user/token`,
    method: 'POST',
    data: user,
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
  }) as Promise<boolean>
}
