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

export interface GoodsParams {
  name?: string
  category?: string
  page?: number
  pageSize?: number
}

export function listOrderByUserId(userId: number) {
  return request({
    url: `/orders/${userId}`, // 仅为示例，并非真实接口地址。
    method: 'GET',
  })
}

// export function queryFright() {
//   return axios.get<FrightModel>('/api/fright')
// }
