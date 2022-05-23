import request from '@/utils/request'

export interface Address {
  consignee: string
  phone: string
  province: string
  city: string
  district: string
  detailAddress: string
}
export function saveAddress(address: Address) {
  return request({
    url: '/address',
    method: 'POST',
    data: address,
  })
}
