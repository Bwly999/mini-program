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

export function listOrderByUserId(userId: string, params?: OrderParams) {
  return request({
    url: `/orders/${userId}`,
    method: 'GET',
    data: params,
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
