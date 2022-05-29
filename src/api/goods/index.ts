import request from '@/utils/request'

export interface GoodsRecord {
  id: string
  name: string
  coverImgUrl: string
  price: number
  discountPrice: number
  stock: number
  scollImages: string[]
  originPlace?: string
  level?: string
  weight?: number
  desc: string
  shopId: string
  shopName: string
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
    url: '/goods', // 仅为示例，并非真实接口地址。
    method: 'GET',
    data: param,
  })
}

export function getGoodsById(id: string) {
  return request({
    url: `/goods/${id}`, // 仅为示例，并非真实接口地址。
    method: 'GET',
  })
}
