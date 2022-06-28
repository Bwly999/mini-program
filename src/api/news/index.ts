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
    url: '/news',
    method: 'GET',
    data: param,
  })
}

export function getNewsById(id: string) {
  return request({
    url: `/news/${id}`,
    method: 'GET',
  })
}
