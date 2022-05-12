import Mock from 'mockjs'

import setupMock, { successRespWrap } from '@/utils/setup-mock'

export const data = {
  status: 1,
  data: {
    img: 'https://t8.baidu.com/it/u=1522066625,149985461&fm=74&app=80&size=f256,256&n=0&f=JPEG&fmt=auto?sec=1652288400&t=4d1aef196011b60f0311c7237f65a322',
    status: '已签收',
    company: '菜鸟裹裹',
    nu: '560006690892',
    messages: [
      {
        time: '2021-02-28 10:04:59',
        context: '客户签收人: 已签收 感谢使用圆通速递，期待再次为您服务 如有疑问请联系：xxxxxxxxx，投诉电话：020-xxxxxxxx。疫情期间圆通每天对网点多次消毒，快递小哥每天测量体温，佩戴口罩',
      },
      {
        time: '2021-02-28 10:04:59',
        context: '【广东省广州市海珠区工业大道公司】 派件中 派件人: 吴晓贤 电话 xxxxxxxxx 。 圆通快递小哥每天已测体温，请放心收寄快递 如有疑问，请联系：020-xxxxxxxx',
      },
    ],
  },

}
setupMock({
  setup() {
    Mock.mock(/\/api\/fright/, () => {
      return successRespWrap(data)
    })
  },
})
