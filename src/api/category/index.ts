import request from '@/utils/request'

export interface Category {
  name: string
}

export function listAllCategory() {
  return request({
    url: '/api/category', // 仅为示例，并非真实接口地址。
    method: 'GET',
  })
}
