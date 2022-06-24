import { type Address } from '../address'
import request from '@/utils/request'

export interface Order {
  id: string
  logisticsNumber: string
  isSelf: number
  address: string
  payNumber: number
  payAmount: number
  userId: string
  goodsId: string
  shopId: string
  state: number
  comment: Comment
  goodsName: string
  goodsCoverImgUrl: string
}

export interface OrderRet {
  id: string
  logisticsNumber: string
  isSelf: number
  address: string
  payNumber: number
  payAmount: number
  userId: string
  goods: {
    id: string
    name: string
    coverImgUrl: string
  }
  shopId: string
  state: number
  comment: Comment
}
/**
 * state:
 * 订单状态
 * 0 未支付，生成订单
 * 1 已支付，待收货
 * 2 已确认收货
 * 3 发起退款，待商家确认
 * 4 已退款
 */

export interface Comment {
  userId: string
  avatarUrl: string
  nickName: string
  rate: number
  createTime: Date
  content: string
}

export interface OrderParams {
  state?: number
  page?: number
  pageSize?: number
}

export function listUserOrder(params?: OrderParams) {
  return request({
    url: '/goods/orders/user',
    method: 'GET',
    data: params,
  })
}

export interface OrderUseForPay {
  userId: string
  goodsId: string
  payNumber: number
  payWay: number
  address: Address
}

export function createOrder(order: OrderUseForPay) {
  return request({
    url: '/goods/orders',
    method: 'POST',
    data: order,
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
