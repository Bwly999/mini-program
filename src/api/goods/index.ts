import request from '@/utils/request'

export interface Goods {
  goodsId: number
  goodsName: string
  goodsCoverImg: string
  sellingPrice: number
  discountPrice?: number
  css?: string
}

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
  page: number
  pageSize: number
}

export interface GoodsListRes {
  content: GoodsRecord[]
  total: number
}

export function queryGoods(param: GoodsParams) {
  return request({
    url: '/api/goods', // 仅为示例，并非真实接口地址。
    method: 'GET',
    data: param,
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
