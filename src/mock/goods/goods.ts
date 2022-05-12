import Mock from 'mockjs'

import setupMock, { successRespWrap } from '@/utils/setup-mock'
import type { GoodsListRes, GoodsRecord } from '@/api/goods'
const good: GoodsRecord = {
  id: '1',
  name: '耳机',
  coverImgUrl: 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg',
  price: 1000,
  discount: 1,
  stock: 1000,
  descImgUrlList: ['https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg', 'https://newbee-mall.oss-cn-beijing.aliyuncs.com/images/MME73_AV4_GEO_CN.jpeg'],
  desc: '牛逼',
}
export const mockData: GoodsListRes = {
  content: Array.from({ length: 10 }, () => good),
  total: 100,
}
setupMock({
  setup() {
    Mock.mock(/\/api\/fright/, () => {
      return successRespWrap(mockData)
    })
  },
})
