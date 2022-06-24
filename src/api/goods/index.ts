import request from '@/utils/request'

export interface GoodsRecord {
  id: string
  name: string
  coverImgUrl: string
  price: number
  discountPrice: number
  stock: number
  scollImages: string[]
  videoUrl: string
  originPlace?: string
  monthSale: string
  level?: string
  weight?: number
  desc: string
  shopId: string
  shopName: string
}

export interface GoodsParams {
  name?: string
  category?: string
  lowPrice?: number
  highPrice?: number
  page?: number
  pageSize?: number
}

export interface GoodsListRes {
  content: GoodsRecord[]
  total: number
}

export function listGoods(param: GoodsParams) {
  return request({
    url: '/goods/goods', // 仅为示例，并非真实接口地址。
    method: 'GET',
    data: param,
  })
}

export function getGoodsById(id: string) {
  return request({
    url: `/goods/goods/${id}`, // 仅为示例，并非真实接口地址。
    method: 'GET',
  })
}
