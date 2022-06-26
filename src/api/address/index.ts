import request from '@/utils/request'

const prefix = '/user'
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
    url: `${prefix}/user/address`,
    method: 'POST',
    data: address,
  })
}

export function changeAddress(addressId: string, address: Address) {
  return request({
    url: `${prefix}/user/address/${addressId}`,
    method: 'PUT',
    data: address,
  })
}

// export function getAddressById(addressId: string) {
//   return request({
//     url: `${prefix}/user/address/${addressId}`,
//     method: 'GET',
//   })
// }

export function getAllAddress() {
  return request({
    url: `${prefix}/user/address`,
    method: 'GET',
  })
}
