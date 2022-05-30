import request from '@/utils/request'

export interface Address {
  id?: string
  consignee?: string
  phone?: string
  province?: string
  city?: string
  district?: string
  detailAddress?: string
}
export function saveAddress(address: Address) {
  return request({
    url: '/address',
    method: 'POST',
    data: address,
  })
}

export function getAddressById(addressId: string) {
  return request({
    url: `address${addressId}`,
    method: 'GET',
  })
}
