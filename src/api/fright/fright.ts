import request from '@/utils/request'

export interface FrightModel {
  status: number
  data: {
    img: string
    status: string
    company: string
    nu: string
    messages: Array<{
      time: string
      context: string
    }>
  }
}

export function queryFright(id: number) {
  return request({
    url: `/api/fright/${id}`, // 仅为示例，并非真实接口地址。
    method: 'GET',
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
