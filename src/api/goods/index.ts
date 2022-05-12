import request from '@/utils/request'

export interface GoodsRecord {
  id: string
  name: string
  coverImgUrl: string
  price: number
  discount: number
  stock: number
  descImgUrlList: string[]
  originPlace?: string
  level?: string
  weight?: number
  desc: string
}

export interface GoodsParams {
  name?: string
  category?: string
  page?: number
  pageSize?: number
}

export interface GoodsListRes {
  content: GoodsRecord[]
  total: number
}

export function listGoods(param: GoodsParams) {
  return request({
    url: '/api/goods', // 仅为示例，并非真实接口地址。
    method: 'GET',
    data: param,
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
