import request from '@/utils/request'
export interface News {
  id: string
  title: string
  content: string
  image: string
  time: string
}
export interface NewsParams {
  page?: number
  pageSize?: number
}

// Todo
export function listNews(param: NewsParams) {
  return request({
    url: '/g',
    method: 'GET',
    data: param,
  })
}
